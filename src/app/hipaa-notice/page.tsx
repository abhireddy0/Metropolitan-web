import { LegalView } from "@/components/shared/legal-page";
import { legalPage } from "@/lib/collections";
import { pageMetadata } from "@/lib/seo";

const page = legalPage("hipaa-notice");

export const metadata = pageMetadata({ path: "/hipaa-notice", title: page.title, description: page.description });

export default function Page() {
  return <LegalView page={page} />;
}
