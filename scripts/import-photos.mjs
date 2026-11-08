/**
 * Imports the real work photos from ./proiecte into src/assets/projects.
 *
 *   node scripts/import-photos.mjs
 *
 * - Unzips every archive in ./proiecte (each archive = one project) next to the loose photos.
 * - For each project in PROJECTS below: auto-rotates, resizes (long edge 2400px),
 *   re-encodes as JPEG and strips all metadata (EXIF/GPS).
 * - Generates src/content/project-images.ts with static imports.
 *
 * To add or reorder photos, edit PROJECTS (first photo = cover) and re-run.
 * Left out on purpose (out of focus): 14.04.58 (3), 14.02.58 (1), 14.02.59 (2), 14.13.59 (3), 14.13.59 (1).
 * Photos are referenced by the timestamp in their WhatsApp filename,
 * e.g. "14.04.58 (1)" → "WhatsApp Image 2026-10-14 at 14.04.58 (1).jpeg".
 */
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const SRC = join(ROOT, "proiecte");
const OUT = join(ROOT, "src/assets/projects");
const GENERATED = join(ROOT, "src/content/project-images.ts");
const PREFIX = "WhatsApp Image 2026-10-14 at ";

/** slug → photo keys, cover first. */
const PROJECTS = {
  "bucatarie-insula-led": ["14.04.58", "14.04.58 (1)", "14.04.58 (2)"],
  "apartament-bucatarie-verde-birou-hol": ["14.00.10 (1)", "14.00.10 (2)", "14.00.10 (3)", "14.00.10 (4)", "14.00.10"],
  "bucatarie-insula-stejar": ["13.58.07", "13.58.07 (1)", "13.58.08 (1)", "13.58.08"],
  "bucatarie-greige-coloane-negre": ["14.04.14", "14.04.13 (1)", "14.04.13 (2)", "14.04.13", "14.04.14 (1)"],
  "selectie-bucatarii": ["14.14.46", "14.19.49", "14.03.18", "14.07.11", "14.11.34"],
  "dressing-organizare-interioara": ["14.02.59", "14.02.59 (1)"],
  "dormitor-dulapuri-pat-tapitat": ["14.09.22 (1)", "14.09.21", "14.09.22 (2)", "14.09.22"],
  "casa-dressing-walk-in-bucatarie": ["14.13.59 (4)", "14.13.59 (2)", "14.13.59 (5)", "14.13.59"],
  "dulap-mansarda": ["14.17.01", "14.17.02"],
  "lambriuri-separatoare": ["14.06.11", "14.00.35", "14.17.20", "14.08.11"],
  "amenajare-placari-lemn-led": ["13.55.15 (2)", "13.55.15 (1)", "13.55.15 (3)", "13.55.15", "13.55.16 (1)", "13.55.16"],
  "vitrine-iluminate": ["13.55.47 (2)", "13.55.46", "13.55.47 (3)", "13.55.47 (1)"],
  "amenajare-magazin": ["14.10.51 (1)"],
};

/** Section crops: name → photo key + region (in original pixels). Exported as `crops.<name>`. */
const CROPS = {
  // LED island kitchen without the cluttered right side (fridge, boxes).
  hero: { key: "14.04.58", file: "mobila-la-comanda-suceava", region: { left: 0, top: 0, width: 1450, height: 1542 } },
};

// 1. Gather every photo (loose + unzipped) into one folder.
const work = mkdtempSync(join(tmpdir(), "mobiflor-"));
const unzip = (zip) =>
  process.platform === "win32"
    ? // Windows' bundled bsdtar reads zip files (a GNU tar earlier on PATH would not).
      execFileSync(join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe"), ["-xf", zip, "-C", work])
    : execFileSync("unzip", ["-q", "-o", zip, "-d", work]);
for (const f of readdirSync(SRC)) {
  if (f.toLowerCase().endsWith(".zip")) unzip(join(SRC, f));
}
const findPhoto = (key) => {
  const name = `${PREFIX}${key}.jpeg`;
  for (const dir of [work, SRC]) if (existsSync(join(dir, name))) return join(dir, name);
  throw new Error(`Photo not found: ${name}`);
};

// 2. Process.
rmSync(OUT, { recursive: true, force: true });
const seen = new Map();
const imports = [];
const entries = [];
let n = 0;

for (const [slug, keys] of Object.entries(PROJECTS)) {
  mkdirSync(join(OUT, slug), { recursive: true });
  const vars = [];
  for (const [i, key] of keys.entries()) {
    const file = findPhoto(key);
    const hash = createHash("md5").update(readFileSync(file)).digest("hex");
    if (seen.has(hash)) throw new Error(`Duplicate photo "${key}" (same as "${seen.get(hash)}")`);
    seen.set(hash, key);

    // Descriptive file names help image search, e.g. "bucatarie-insula-led-01.jpg".
    const name = `${slug}-${String(i + 1).padStart(2, "0")}.jpg`;
    // sharp drops all metadata unless .withMetadata() is called.
    await sharp(file)
      .rotate()
      .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(OUT, slug, name));

    const v = `img${n++}`;
    imports.push(`import ${v} from "@/assets/projects/${slug}/${name}";`);
    vars.push(v);
  }
  entries.push(`  "${slug}": [${vars.join(", ")}],`);
}
const cropVars = [];
mkdirSync(join(OUT, "_crops"), { recursive: true });
for (const [name, { key, file, region }] of Object.entries(CROPS)) {
  await sharp(findPhoto(key))
    .rotate()
    .extract(region)
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(join(OUT, "_crops", `${file}.jpg`));
  imports.push(`import crop_${name} from "@/assets/projects/_crops/${file}.jpg";`);
  cropVars.push(`  ${name}: crop_${name},`);
}
rmSync(work, { recursive: true, force: true });

// Slug list without image imports, for lightweight code such as Proxy.
writeFileSync(
  join(ROOT, "src/content/project-slugs.ts"),
  `// GENERATED by scripts/import-photos.mjs. Do not edit by hand.
export const projectSlugs: readonly string[] = ${JSON.stringify(Object.keys(PROJECTS), null, 2)};
`,
);

writeFileSync(
  GENERATED,
  `// GENERATED by scripts/import-photos.mjs. Do not edit by hand.
import type { StaticImageData } from "next/image";
${imports.join("\n")}

export const projectImages = {
${entries.join("\n")}
} satisfies Record<string, StaticImageData[]>;

export type ProjectSlug = keyof typeof projectImages;

export const crops = {
${cropVars.join("\n")}
} satisfies Record<string, StaticImageData>;
`,
);

console.log(`Imported ${n} photos into ${Object.keys(PROJECTS).length} projects.`);
