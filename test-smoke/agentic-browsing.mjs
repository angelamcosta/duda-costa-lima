import { join } from "node:path";
import { cwd, exit } from "node:process";
import { readFileSync, existsSync } from "node:fs";

const root = cwd();
const checks = [
  {
    name: "public/llms.txt exists",
    pass: () => existsSync(join(root, "public", "llms.txt")),
  },
  {
    name: "contact form exposes a WebMCP tool name",
    pass: () =>
      readFileSync(
        join(root, "slices", "Contact", "ContactForm.tsx"),
        "utf8",
      ).includes('toolname="request_style_consultation"'),
  },
  {
    name: "contact form exposes a WebMCP tool description",
    pass: () =>
      readFileSync(
        join(root, "slices", "Contact", "ContactForm.tsx"),
        "utf8",
      ).includes("tooldescription="),
  },
  {
    name: "contact fields include agent parameter descriptions",
    pass: () => {
      const source = readFileSync(
        join(root, "slices", "Contact", "ContactForm.tsx"),
        "utf8",
      );
      return (
        source.match(/toolparamdescription=/g)?.length === 3 &&
        source.includes('register("name")') &&
        source.includes('register("email")') &&
        source.includes('register("message"')
      );
    },
  },
  {
    name: "service expand buttons have contextual labels",
    pass: () =>
      readFileSync(
        join(root, "slices", "Services", "index.tsx"),
        "utf8",
      ).includes("aria-label={`${expandLabel} ${nameA} ${nameB}`.trim()}"),
  },
];

const failures = checks.filter((check) => !check.pass());

if (failures.length > 0) {
  console.error(failures.map((failure) => `FAIL ${failure.name}`).join("\n"));
  exit(1);
}

console.log(checks.map((check) => `PASS ${check.name}`).join("\n"));
