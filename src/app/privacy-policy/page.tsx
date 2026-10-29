import { LegalView } from "@/components/shared/legal-page";
import { legalPage } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

const page = legalPage("privacy-policy");

export const metadata = pageMetadata({ path: "/privacy-policy", title: page.title, description: page.description });

export default function Page() {
  return <LegalView page={page} />;
}
