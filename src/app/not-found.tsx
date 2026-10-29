import { NotFoundView } from "@/components/errors/not-found-view";

export const metadata = {
  title: { absolute: "Page not found | Metropolitan Home Health Care" },
  description: "The page you are looking for could not be found.",
  // Overrides the site-wide "index, follow" from layout.tsx; Next adds its own noindex tag as well.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
