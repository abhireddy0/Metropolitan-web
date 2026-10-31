"use client";

import { useState } from "react";
import type { Icon } from "@phosphor-icons/react";
import {
  CheckCircleIcon,
  ClipboardTextIcon,
  ClockIcon,
  EnvelopeSimpleIcon,
  LockKeyIcon,
  PaperPlaneTiltIcon,
  PhoneIcon,
  StethoscopeIcon,
  UserIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { careOptions, contactPage, site } from "@/lib/content";
import { useSearchParam } from "@/lib/use-search-param";
import { cn } from "@/lib/utils";

export type FormKind = "request";

type Values = Record<string, string>;
type Status = { kind: "idle" | "sending" | "success" | "error" };

const control =
  "w-full min-h-12 rounded-lg border border-input bg-background px-3.5 py-2.5 text-base text-foreground transition outline-none placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/12 aria-invalid:border-destructive aria-invalid:ring-destructive/10 dark:bg-muted";

const digits = (v: string) => v.replace(/\D/g, "");
const validators: Record<string, (v: string) => string | null> = {
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Please enter a valid email address."),
  phone: (v) => {
    const d = digits(v);
    return d.length === 10 || (d.length === 11 && d[0] === "1") ? null : "Please enter a 10-digit phone number.";
  },
};

type FieldSpec = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  full?: boolean;
  icon?: Icon;
};

const specs: Record<FormKind, FieldSpec[]> = {
  request: [
    { name: "name", label: "Full name", autoComplete: "name", placeholder: "John Doe", icon: UserIcon },
    { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", placeholder: "(847) 555-0123", icon: PhoneIcon },
    { name: "email", label: "Email address", type: "email", autoComplete: "email", placeholder: "you@email.com", icon: EnvelopeSimpleIcon },
    { name: "service", label: "Service of interest", type: "select", options: careOptions, placeholder: "Select a service", required: false, icon: StethoscopeIcon },
    { name: "message", label: "Tell us about your needs", type: "textarea", required: false, full: true, placeholder: "Briefly describe the care needed, the current condition, or any questions you have..." },
  ],
};

const submitLabel: Record<FormKind, string> = { request: "Send Request" };

// Maps the form onto the parameters of the existing EmailJS template.
function templateParams(v: Values) {
  return {
    from_name: v.name,
    from_email: v.email,
    from_phone: v.phone,
    service: v.service || "Not specified",
    message: v.message || "(no message)",
    time: new Date().toLocaleString(),
    page: window.location.pathname,
  };
}

type LeadFormProps = {
  kind?: FormKind;
  /** Preselected option for the "service" field. */
  preset?: string;
  title?: string;
  intro?: string;
  /** Drop the card around the form, for layouts where it sits straight on the page. */
  bare?: boolean;
  className?: string;
};

const selectArrow =
  "appearance-none bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%235f6561' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")] bg-[right_14px_center] bg-no-repeat pr-10";

export function LeadForm({ kind = "request", preset, title, intro, bare = false, className }: LeadFormProps) {
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
        body: JSON.stringify({ service_id: site.emailjs.service, template_id: site.emailjs.template, user_id: site.emailjs.publicKey, template_params: templateParams(data) }),
      });
      if (!res.ok) throw new Error(`EmailJS ${res.status}`);
      setValues({ service: "" });
      setStatus({ kind: "success" });
      (window as { gtag?: (...a: unknown[]) => void }).gtag?.("event", "generate_lead", { form: kind });
    } catch {
      setStatus({ kind: "error" });
    }
  }

  const card = cn(!bare && "rounded-2xl bg-card p-6 shadow-[0_30px_60px_-40px_rgb(18_48_29/0.4)] ring-1 ring-foreground/8 sm:p-9", className);

  // After a successful send the form gives way to a thank-you panel.
  if (status.kind === "success") {
    return (
      <div role="status" aria-live="polite" data-status="success" className={cn(card, "flex flex-col items-center gap-4 py-14 text-center sm:py-20")}>
        <span className="grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircleIcon weight="fill" className="size-9" />
        </span>
        <h2 className="text-2xl font-bold">Thank you!</h2>
        <p className="max-w-[420px] text-muted-foreground">We&apos;ll contact you within 24 hours to discuss your healthcare needs. Need us sooner? Call {site.phone}.</p>
        <Button variant="outline" onClick={() => setStatus({ kind: "idle" })} className="mt-2">Send another request</Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} data-form={kind} className={card}>
      {(title || intro) && (
        <div className="mb-7 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <ClipboardTextIcon weight="duotone" className="size-6" />
            </span>
            <div>
              {title && <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>}
              {intro && <p className="mt-1 text-[0.9375rem] text-muted-foreground">{intro}</p>}
            </div>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <ClockIcon weight="bold" className="size-3.5" /> {contactPage.other.items[2][0]}: {contactPage.other.items[2][1].toLowerCase()}
          </span>
        </div>
      )}

      <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
        {fields.map((f) => {
          const id = `${kind}-${f.name}`;
          const err = errors[f.name];
          const optional = f.required === false;
          const described = err ? `${id}-error` : undefined;
          const label = (
            <span className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold">
              {f.label}
              {optional && <span className="text-xs font-normal text-muted-foreground">Optional</span>}
            </span>
          );

          const common = {
            id,
            name: f.name,
            value: value(f.name),
            required: !optional,
            "aria-invalid": err ? true : undefined,
            "aria-describedby": described,
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(f.name, e.target.value),
          };
          const Glyph = f.icon;
          return (
            <div key={f.name} className={cn(f.full && "sm:col-span-2")}>
              <label htmlFor={id}>{label}</label>
              <div className="relative">
                {Glyph && <Glyph weight="duotone" aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-muted-foreground" />}
                {f.type === "textarea" ? (
                  <textarea {...common} rows={4} placeholder={f.placeholder} className={cn(control, "min-h-32 resize-y")} />
                ) : f.type === "select" ? (
                  <select {...common} className={cn(control, selectArrow, Glyph && "pl-11")}>
                    <option value="">{f.placeholder}</option>
                    {f.options?.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input {...common} type={f.type ?? "text"} placeholder={f.placeholder} autoComplete={f.autoComplete} inputMode={f.type === "tel" ? "tel" : undefined} className={cn(control, Glyph && "pl-11")} />
                )}
              </div>
              {err && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-destructive">{err}</p>}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg bg-muted/60 p-3.5 text-sm text-muted-foreground dark:bg-muted">
            <input
              type="checkbox"
              name="consent"
              checked={values.consent === "yes"}
              onChange={(e) => set("consent", e.target.checked ? "yes" : "")}
              aria-invalid={errors.consent ? true : undefined}
              className="mt-0.5 size-4.5 shrink-0 accent-primary"
            />
            <span>
              I agree to the <a href="/privacy-policy" className="font-medium text-primary underline underline-offset-3">privacy policy</a> and consent to being contacted about healthcare services.
            </span>
          </label>
          {errors.consent && <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.consent}</p>}
        </div>

        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor={`${kind}-website`}>Website</label>
          <input id={`${kind}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid gap-3 sm:col-span-2">
          <Button type="submit" aria-busy={status.kind === "sending" || undefined} className="h-12 w-full text-base">
            {status.kind === "sending" ? "Sending…" : (<>{submitLabel[kind]} <PaperPlaneTiltIcon weight="fill" className="size-4.5" /></>)}
          </Button>
          <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <LockKeyIcon weight="duotone" className="size-4 text-primary" /> Your information stays private. We&apos;re HIPAA compliant.
          </p>
        </div>
      </div>

      <div role="status" aria-live="polite">
        {status.kind === "error" && (
          <div data-status="error" className="mt-4 flex gap-2.5 rounded-lg border border-destructive/30 bg-destructive/8 px-4 py-3.5 text-destructive">
            <WarningCircleIcon weight="fill" className="mt-0.5 size-5 shrink-0" />
            <p><strong className="block">Oops! Something went wrong.</strong>Please try again or call us directly at {site.phone}.</p>
          </div>
        )}
      </div>
    </form>
  );
}
