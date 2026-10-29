"use client";

import { useState } from "react";
import { CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { careOptions, insurancePage, site } from "@/lib/content";
import { useSearchParam } from "@/lib/use-search-param";
import { cn } from "@/lib/utils";

export type FormKind = "request" | "coverage";

type Values = Record<string, string>;
type Status = { kind: "idle" | "sending" | "success" | "error" };

const control =
  "w-full min-h-12 rounded-md border border-line-strong bg-white px-3.5 py-2.5 text-base text-foreground transition outline-none placeholder:text-muted-foreground/80 focus:border-leaf focus:ring-3 focus:ring-leaf/15 aria-invalid:border-destructive";

const digits = (v: string) => v.replace(/\D/g, "");
const validators: Record<string, (v: string) => string | null> = {
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Please enter a valid email address."),
  phone: (v) => {
    const d = digits(v);
    return d.length === 10 || (d.length === 11 && d[0] === "1") ? null : "Please enter a 10-digit phone number.";
  },
};

type FieldSpec = { name: string; label: string; type?: "text" | "email" | "tel" | "textarea" | "select"; options?: string[]; placeholder?: string; required?: boolean; autoComplete?: string; full?: boolean };

// Labels, placeholders and messages are the previous site's wording.
const specs: Record<FormKind, FieldSpec[]> = {
  request: [
    { name: "name", label: "Full Name *", autoComplete: "name", placeholder: "John Doe" },
    { name: "email", label: "Email Address *", type: "email", autoComplete: "email", placeholder: "your@email.com" },
    { name: "phone", label: "Phone Number *", type: "tel", autoComplete: "tel", placeholder: "Enter phone number" },
    { name: "service", label: "Service of Interest", type: "select", options: careOptions, placeholder: "Select a service...", required: false },
    { name: "message", label: "Tell Us About Your Needs", type: "textarea", required: false, full: true, placeholder: "Please describe your healthcare needs, current condition, or any questions you have..." },
  ],
  coverage: [
    { name: "name", label: "Full Name *", autoComplete: "name", placeholder: "John Doe" },
    { name: "phone", label: "Phone Number *", type: "tel", autoComplete: "tel", placeholder: "Enter phone number" },
    { name: "email", label: "Email Address *", type: "email", autoComplete: "email", placeholder: "your@email.com" },
    { name: "insurer", label: "Insurance Provider *", type: "select", options: insurancePage.providers.map((p) => p.name), placeholder: "Select insurance" },
    { name: "service", label: "Type of Service Needed *", type: "select", options: careOptions, placeholder: "Select a service...", full: true },
  ],
};

const submitLabel: Record<FormKind, string> = { request: "Send Request", coverage: "Verify Now" };

// Maps the form onto the parameters of the existing EmailJS template.
function templateParams(kind: FormKind, v: Values) {
  const coverage = kind === "coverage";
  return {
    from_name: v.name,
    from_email: v.email,
    from_phone: v.phone,
    service: coverage ? `Insurance verification: ${v.insurer} (${v.service})` : v.service || "Not specified",
    message: coverage ? "Insurance verification call-back requested." : v.message || "(no message)",
    time: new Date().toLocaleString(),
    page: window.location.pathname,
  };
}

type LeadFormProps = {
  kind?: FormKind;
  /** Preselected option for the "service" select. */
  preset?: string;
  title?: string;
  intro?: string;
  className?: string;
};

export function LeadForm({ kind = "request", preset, title, intro, className }: LeadFormProps) {
  const fields = specs[kind];
  const fromUrl = useSearchParam("service");
  const initial = [fromUrl, preset].find((p) => p && careOptions.includes(p)) ?? "";

  const [values, setValues] = useState<Values>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const value = (name: string) => values[name] ?? (name === "service" ? initial : "");

  const set = (name: string, v: string) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => Object.fromEntries(Object.entries(e).filter(([k]) => k !== name)));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Values = Object.fromEntries(fields.map((f) => [f.name, value(f.name).trim()]));
    const found: Record<string, string> = {};
    for (const f of fields) {
      if (f.required !== false && !data[f.name]) found[f.name] = f.type === "select" ? "Please choose an option." : "Please fill in this field.";
      else if (data[f.name] && validators[f.name]) {
        const err = validators[f.name](data[f.name]);
        if (err) found[f.name] = err;
      }
    }
    if (values.consent !== "yes") found.consent = "Please confirm to continue.";
    setErrors(found);
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }
    if ((form.elements.namedItem("website") as HTMLInputElement | null)?.value) return; // honeypot

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_id: site.emailjs.service, template_id: site.emailjs.template, user_id: site.emailjs.publicKey, template_params: templateParams(kind, data) }),
      });
      if (!res.ok) throw new Error(`EmailJS ${res.status}`);
      setValues({ service: "" });
      setStatus({ kind: "success" });
      (window as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "generate_lead", { form: kind });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} data-form={kind} className={cn("rounded-2xl border bg-card p-6 shadow-[0_1px_2px_rgb(29_42_34/0.06)] sm:p-10", className)}>
      {title && <h2 className="mb-1.5 text-h3">{title}</h2>}
      {intro && <p className="text-muted-foreground">{intro}</p>}
      <div className={cn("grid gap-x-4 gap-y-5 sm:grid-cols-2", (title || intro) && "mt-6")}>
        {fields.map((f) => {
          const id = `${kind}-${f.name}`;
          const err = errors[f.name];
          const common = {
            id,
            name: f.name,
            value: value(f.name),
            required: f.required !== false,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": err ? `${id}-error` : undefined,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(f.name, e.target.value),
          };
          return (
            <div key={f.name} className={cn(f.full && "sm:col-span-2")}>
              <label htmlFor={id} className="mb-1.5 block text-small font-semibold">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea {...common} rows={4} placeholder={f.placeholder} className={cn(control, "min-h-30 resize-y")} />
              ) : f.type === "select" ? (
                <select {...common} className={cn(control, "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%233f4a43' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[right_14px_center] bg-no-repeat pr-10")}>
                  <option value="">{f.placeholder}</option>
                  {f.options?.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input {...common} type={f.type ?? "text"} placeholder={f.placeholder} autoComplete={f.autoComplete} inputMode={f.type === "tel" ? "tel" : undefined} className={control} />
              )}
              {err && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">{err}</p>}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label className="flex items-start gap-2.5 text-small text-ink-2">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent === "yes"}
              onChange={(e) => set("consent", e.target.checked ? "yes" : "")}
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 size-5 shrink-0 accent-forest"
            />
            <span>
              I agree to the <a href="/privacy-policy" className="text-leaf underline underline-offset-3">privacy policy</a> and consent to being contacted about healthcare services. *
            </span>
          </label>
          {errors.consent && <p role="alert" className="mt-1.5 ml-7.5 text-sm text-destructive">{errors.consent}</p>}
        </div>

        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor={`${kind}-website`}>Website</label>
          <input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Button type="submit" variant={kind === "coverage" ? "green" : "default"} aria-busy={status.kind === "sending" || undefined} className="w-full sm:col-span-2">
          {status.kind === "sending" ? "Sending…" : submitLabel[kind]}
        </Button>
      </div>

      <div role="status" aria-live="polite">
        {status.kind === "success" && (
          <div data-status="success" className="mt-4 flex gap-2.5 rounded-md border border-sage-2 bg-sage px-4 py-3.5 text-forest-dark">
            <CheckCircleIcon weight="fill" className="mt-0.5 size-5 shrink-0" />
            <p><strong className="block">Thank You!</strong>We&apos;ll contact you within 24 hours to discuss your healthcare needs.</p>
          </div>
        )}
        {status.kind === "error" && (
          <div data-status="error" className="mt-4 flex gap-2.5 rounded-md border border-[#f1cdbd] bg-[#fbebe3] px-4 py-3.5 text-[#7a2e12]">
            <WarningCircleIcon weight="fill" className="mt-0.5 size-5 shrink-0" />
            <p><strong className="block">Oops! Something went wrong.</strong>Please try again or call us directly at {site.phone}.</p>
          </div>
        )}
      </div>
    </form>
  );
}
