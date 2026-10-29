import { createCn } from "cn/config";

// The site's type scale (globals.css --text-*) registered as font sizes, so merging
// `text-small` with `text-white` keeps both instead of treating one as a colour.
export const cn = createCn({
  extend: { classGroups: { "font-size": [{ text: ["display", "stat", "h2", "h3", "title", "lead", "small"] }] } },
});
