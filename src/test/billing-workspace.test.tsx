import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ProductPreview } from "@/components/product-preview";
afterEach(cleanup);
describe("Sample POS workspace", () => {
  it("adds and removes items with integer minor-unit totals", () => {
    const { container } = render(<ProductPreview />);
    expect(container.querySelector(".preview-total strong")?.textContent).toBe("₹340");
    fireEvent.click(screen.getByRole("button", { name: "Add Cappuccino" }));
    expect(container.querySelector(".preview-total strong")?.textContent).toBe("₹520");
    fireEvent.click(screen.getByRole("button", { name: "Remove one Cappuccino" }));
    expect(container.querySelector(".preview-total strong")?.textContent).toBe("₹340");
  });
  it("blocks empty checkout and labels sample completion honestly", () => {
    render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Remove one Cappuccino" }));
    fireEvent.click(screen.getByRole("button", { name: "Remove one Butter croissant" }));
    expect(screen.getByRole("button", { name: "Complete sample" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Add Iced latte" }));
    fireEvent.click(screen.getByRole("button", { name: "Complete sample" }));
    expect(screen.getByText("No payment collected.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(screen.getByRole("button", { name: "Complete sample" })).toBeEnabled();
  });
  it("filters without losing the order", () => {
    const { container } = render(<ProductPreview />);
    fireEvent.click(screen.getByRole("button", { name: "Kitchen" }));
    expect(screen.queryByRole("button", { name: "Add Cappuccino" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add Grilled sandwich" })).toBeInTheDocument();
    expect(container.querySelector(".preview-total strong")?.textContent).toBe("₹340");
  });
});
