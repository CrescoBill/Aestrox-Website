import type { ReactNode } from "react";
import { Check } from "lucide-react";
import images from "@/data/product-images.json";
import { Shot, type ShotName } from "./product-shot";

/** Tall captures (a receipt, the customiser) are drawn narrower than wide ones. */
const shapeOf = (name: ShotName) => {
  const { width, height } = images[name];
  return height > width * 0.9 ? "tall" : "wide";
};

/**
 * Compositions of real product captures. Each piece is a fixed slice of the
 * actual interface, layered on a quiet stage; nothing here is redrawn UI.
 */

/** The counter at a glance: the menu, the order it builds and the kitchen ticket. */
export function CounterStage({ priority = false }: { priority?: boolean }) {
  return (
    <div className="stage stage-counter">
      <div className="stage-piece piece-menu">
        <Shot name="menu" priority={priority} sizes="(min-width: 1100px) 430px, 70vw" />
      </div>
      <div className="stage-piece piece-cart">
        <Shot name="cart" priority={priority} sizes="(min-width: 1100px) 280px, 50vw" />
      </div>
      <div className="stage-piece piece-ticket">
        <Shot name="ticket-2" priority={priority} sizes="(min-width: 1100px) 220px, 40vw" />
      </div>
    </div>
  );
}

/** Ordering in depth: the menu, a customised item and the running order. */
export function OrderingStage({ priority = false }: { priority?: boolean }) {
  return (
    <div className="stage stage-ordering">
      <div className="stage-piece piece-menu">
        <Shot name="menu" priority={priority} sizes="(min-width: 1100px) 560px, 80vw" />
      </div>
      <div className="stage-piece piece-customiser">
        <Shot name="customiser" priority={priority} sizes="(min-width: 1100px) 380px, 60vw" />
      </div>
      <div className="stage-piece piece-cart">
        <Shot name="cart" priority={priority} sizes="(min-width: 1100px) 300px, 50vw" />
      </div>
    </div>
  );
}

/** One capture on a stage, optionally with a smaller one overlapping it. */
export function ShotStage({
  name,
  secondary,
  tone = "mint",
}: {
  name: ShotName;
  secondary?: ShotName;
  tone?: "mint" | "paper";
}) {
  return (
    <div className={`stage stage-single stage-${tone}${secondary ? " has-secondary" : ""}`}>
      <div className={`stage-piece piece-main shape-${shapeOf(name)}`}>
        <Shot name={name} sizes="(min-width: 1100px) 640px, 88vw" />
      </div>
      {secondary && (
        <div className={`stage-piece piece-secondary shape-${shapeOf(secondary)}`}>
          <Shot name={secondary} sizes="(min-width: 1100px) 240px, 45vw" />
        </div>
      )}
    </div>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Copy beside a visual; alternate `reverse` down the page. */
export function FeatureRow({
  label,
  title,
  children,
  visual,
  reverse = false,
}: {
  label: string;
  title: string;
  children: ReactNode;
  visual: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`feature-row${reverse ? " reverse" : ""}`}>
      <div className="feature-copy">
        <p className="kicker">{label}</p>
        <h3>{title}</h3>
        {children}
      </div>
      <div className="feature-visual">{visual}</div>
    </div>
  );
}
