import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import images from "@/data/product-images.json";

const publicProduct = join(process.cwd(), "public", "product");

describe("Product captures", () => {
  it.each(Object.entries(images))(
    "%s ships at 1x and 2x with a size and description",
    (name, image) => {
      expect(existsSync(join(publicProduct, `${name}.webp`))).toBe(true);
      expect(existsSync(join(publicProduct, `${name}-1x.webp`))).toBe(true);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
      expect(image.alt.length).toBeGreaterThan(20);
    },
  );
});
