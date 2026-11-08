import Image, { type StaticImageData } from "next/image";

type Props = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  /** Travel distance as a percentage of the frame height. */
  strength?: number;
};

/**
 * Image that drifts inside its frame while scrolling, revealed with a mask wipe.
 * The drift is a CSS scroll-driven animation (see .parallax-* in globals.css), so no JavaScript ships.
 */
export default function ParallaxImage({ src, alt, sizes, className = "", strength = 12 }: Props) {
  return (
    <div data-reveal="mask" className={`parallax-frame relative overflow-hidden ${className}`}>
      <div className="parallax-layer absolute inset-x-0 -inset-y-[15%]" style={{ "--strength": strength } as React.CSSProperties}>
        {/* Eager: the reveal mask fully clips this image, and browsers never start a clipped lazy image. */}
        <Image src={src} alt={alt} fill sizes={sizes} placeholder="blur" loading="eager" className="object-cover" />
      </div>
    </div>
  );
}
