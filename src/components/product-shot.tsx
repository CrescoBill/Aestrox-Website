import images from "@/data/product-images.json";

/**
 * Real Aestrox POS captures (fictional Demo Bistro data), produced by the
 * product's capture script. Each image ships at 1x and 2x as WebP; its CSS size
 * and alt text come from the generated manifest so layouts never shift.
 */
export type ShotName = keyof typeof images;

type ShotProps = {
  name: ShotName;
  /** How wide the image is drawn, so the browser picks 1x or 2x well. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Use an empty alt when nearby text already describes the image. */
  decorative?: boolean;
};

export function Shot({
  name,
  sizes = "(min-width: 1100px) 560px, 92vw",
  priority = false,
  className,
  decorative = false,
}: ShotProps) {
  const image = images[name];
  return (
    <img
      className={className ? `shot ${className}` : "shot"}
      src={`/product/${name}.webp`}
      srcSet={`/product/${name}-1x.webp ${image.width}w, /product/${name}.webp ${image.width * 2}w`}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={decorative ? "" : image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding={priority ? "sync" : "async"}
      draggable={false}
      onContextMenu={(event) => event.preventDefault()}
    />
  );
}

/** A phone-sized capture inside a plain Android-style handset. */
export function PhoneShot({
  name,
  priority = false,
  className,
}: {
  name: ShotName;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={className ? `handset ${className}` : "handset"}>
      <div className="handset-screen">
        <div className="handset-status" aria-hidden="true">
          <span>9:41</span>
          <i className="handset-camera" />
          <span className="handset-icons">
            <i />
            <i />
            <i />
          </span>
        </div>
        <Shot name={name} sizes="(min-width: 760px) 300px, 62vw" priority={priority} />
      </div>
    </div>
  );
}
