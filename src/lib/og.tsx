import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/config/site";

export const ogSize = { width: 1200, height: 630 };

/**
 * Renders a 1200×630 share image: a darkened project photo with eyebrow, title and brand.
 * `photo` is a path relative to src/assets/projects, e.g. "bucatarie-insula-led/bucatarie-insula-led-01.jpg".
 */
export async function renderOgImage({ photo, eyebrow, title }: { photo: string; eyebrow: string; title: string }) {
  const cover = await sharp(join(process.cwd(), "src/assets/projects", photo))
    .resize(ogSize.width, ogSize.height, { fit: "cover" })
    .modulate({ brightness: 0.6 })
    .jpeg({ quality: 78 })
    .toBuffer();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0d0b09" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${cover.toString("base64")}`}
          alt=""
          width={ogSize.width}
          height={ogSize.height}
          style={{ position: "absolute", top: 0, left: 0, width: ogSize.width, height: ogSize.height, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ogSize.width,
            height: ogSize.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "64px 72px",
            background: "linear-gradient(180deg, rgba(13,11,9,0.1) 0%, rgba(13,11,9,0.88) 100%)",
          }}
        >
          <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#e0c597" }}>{eyebrow}</div>
          <div style={{ marginTop: 18, fontSize: 60, lineHeight: 1.05, color: "#ede5d8", maxWidth: 1000 }}>{title}</div>
          <div style={{ marginTop: 28, fontSize: 26, color: "#c9a46a" }}>{`${site.name} · ${site.phone}`}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
