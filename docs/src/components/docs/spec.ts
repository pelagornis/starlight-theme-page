import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

export interface ComponentSpecData {
  component: string;
  export?: string;
  anatomy?: Record<string, string>;
  variants?: Record<string, string[]>;
  states?: {
    pseudo?: string[];
    availability?: string[];
    component?: Record<string, string[]>;
  };
  keyboard?: Record<string, string | { action: string; native?: boolean }>;
}

const require = createRequire(import.meta.url);
const specRoot = join(dirname(require.resolve("@refineui/react/package.json")), "spec", "components");

export function loadSpec(id: string): ComponentSpecData | null {
  const file = join(specRoot, `${id}.json`);
  return existsSync(file) ? JSON.parse(readFileSync(file, "utf8")) : null;
}
