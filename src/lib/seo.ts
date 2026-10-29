import type { Metadata } from "next";
import { counties, services, site, type Pair } from "./content";

export const abs = (path: string) => site.url + (path === "/" ? "" : path);

type PageMeta = {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  type?: "website" | "article";
};

// Appends the brand to the title when there is room, keeping titles under ~62 characters.
const brandTitle = (title: string) =>
  title.includes("Metropolitan")
    ? title
    : [`${title} | ${site.name}`, `${title} | Metropolitan`].find((t) => t.length <= 62) ?? title;

export function pageMetadata({ path, title, description, ogImage = "/og-image.jpg", type = "website" }: PageMeta): Metadata {
  const full = brandTitle(title);
  return {
    title: { absolute: full },
    description,
    alternates: { canonical: abs(path) },
    openGraph: {
      type,
      siteName: site.name,
      title: full,
      description,
      url: abs(path),
      images: [{ url: abs(ogImage), width: 1200, height: ogImage === "/og-image.jpg" ? 630 : 675 }],
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: full, description, images: [abs(ogImage)] },
  };
}

export const orgLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": abs("/#organization"),
  name: site.name,
  legalName: site.legalName,
  url: abs("/"),
  logo: abs("/images/logos/logo.png"),
  image: abs("/og-image.jpg"),
  description: site.description,
  telephone: "+1-847-568-1033",
  faxNumber: "+1-847-568-1034",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: "60090",
    addressCountry: site.address.country,
  },
  areaServed: counties.map((c) => ({ "@type": "AdministrativeArea", name: `${c.name}, Illinois` })),
  medicalSpecialty: ["Nursing", "PhysicalTherapy", "SpeechPathology", "Geriatric"],
  award: ["HomeCare Elite Top 100 Home Health Agency (2019)", "HomeCare Elite (2006, 2007, 2008, 2009)"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home health services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s.name, url: abs(`/services/${s.slug}`) },
    })),
  },
};

export const faqLd = (faqs: Pair[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
});

export const crumbsLd = (items: [name: string, path: string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
});
