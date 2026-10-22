import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Expand, X } from "lucide-react";

const screens = [
  {
    title: "The ordering workspace",
    src: "/product/ordering.png",
    alt: "Aestrox POS with a category sidebar, menu items and current order in a sample café.",
  },
  {
    title: "Make it their order",
    src: "/product/customisation.png",
    alt: "Aestrox POS item customisation with variant and modifier options in a sample order.",
  },
];

/** Actual app captures from the local product documentation, not invented UI. */
export function ProductGallery() {
  const [selected, setSelected] = useState(0);
  const screen = screens[selected]!;
  return (
    <section className="section product-gallery">
      <div className="container">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">A closer look</p>
            <h2>
              Your workspace,
              <br />
              in focus.
            </h2>
          </div>
          <div className="gallery-selector" role="group" aria-label="Product screenshots">
            {screens.map((item, index) => (
              <button
                key={item.src}
                aria-pressed={index === selected}
                onClick={() => setSelected(index)}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        <Dialog.Root>
          <Dialog.Trigger className="gallery-image-button" aria-label={`Expand ${screen.title}`}>
            <img
              src={screen.src}
              alt={screen.alt}
              width={1440}
              height={900}
              loading="lazy"
              decoding="async"
            />
            <span>
              <Expand size={16} /> View full screen
            </span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="dialog-overlay" />
            <Dialog.Content className="gallery-dialog">
              <Dialog.Title className="sr-only">{screen.title}</Dialog.Title>
              <Dialog.Description className="sr-only">
                An actual product screenshot with sample café data.
              </Dialog.Description>
              <img src={screen.src} alt={screen.alt} width={1440} height={900} />
              <Dialog.Close className="icon-button gallery-close" aria-label="Close screenshot">
                <X />
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        <p className="gallery-caption">Aestrox POS · Example café workspace</p>
      </div>
    </section>
  );
}
