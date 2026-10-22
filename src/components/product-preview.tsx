import { useState } from "react";
import {
  BarChart3,
  Check,
  Coffee,
  Croissant,
  LayoutGrid,
  Minus,
  Plus,
  ReceiptText,
  RotateCcw,
  Settings2,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import logo from "@/assets/aestrox-logo-clean.png";

const items = [
  { name: "Cappuccino", category: "Coffee", amount: 18000, icon: Coffee, tone: "coffee" },
  { name: "Iced latte", category: "Coffee", amount: 22000, icon: Coffee, tone: "latte" },
  { name: "Butter croissant", category: "Kitchen", amount: 16000, icon: Croissant, tone: "pastry" },
  {
    name: "Grilled sandwich",
    category: "Kitchen",
    amount: 24000,
    icon: Utensils,
    tone: "sandwich",
  },
];
const money = (minor: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(minor / 100);

export function ProductPreview({ compact = false }: { compact?: boolean }) {
  const [counts, setCounts] = useState([1, 0, 1, 0]);
  const [category, setCategory] = useState("All items");
  const [paid, setPaid] = useState(false);
  const total = items.reduce((sum, item, index) => sum + item.amount * (counts[index] ?? 0), 0);
  const count = counts.reduce((sum, value) => sum + value, 0);
  function change(index: number, delta: number) {
    setCounts((previous) =>
      previous.map((value, i) => (i === index ? Math.max(0, Math.min(20, value + delta)) : value)),
    );
    setPaid(false);
  }
  return (
    <div className={`product-preview ${compact ? "preview-compact" : ""}`}>
      <div className="preview-chrome">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>Aestrox POS</span>
        <span>Sample workspace</span>
      </div>
      <div className="preview-body">
        <aside className="preview-sidebar" aria-hidden="true">
          <img src={logo} alt="" width={1566} height={518} />
          <LayoutGrid />
          <span>
            <ShoppingBag />
          </span>
          <ReceiptText />
          <BarChart3 />
          <Settings2 />
        </aside>
        <div className="preview-menu">
          <div className="preview-page-heading">
            <div>
              <small>THE DAILY CAFÉ</small>
              <h3>New order</h3>
            </div>
            <span className="preview-open">Counter</span>
          </div>
          <div className="preview-categories" aria-label="Sample menu category">
            {["All items", "Coffee", "Kitchen"].map((value) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                aria-pressed={category === value}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="preview-items">
            {items.map(
              (item, index) =>
                (category === "All items" || item.category === category) && (
                  <button
                    key={item.name}
                    className="preview-item"
                    aria-label={`Add ${item.name}`}
                    onClick={() => change(index, 1)}
                    disabled={(counts[index] ?? 0) >= 20}
                  >
                    <span className={`item-art ${item.tone}`}>
                      <item.icon size={38} strokeWidth={1.3} />
                      {!!counts[index] && <span className="item-count">{counts[index]}</span>}
                    </span>
                    <span className="item-copy">
                      <strong>{item.name}</strong>
                      <span>
                        {money(item.amount)}
                        <Plus size={14} />
                      </span>
                    </span>
                  </button>
                ),
            )}
          </div>
          <p className="preview-hint">Select an item to try the order flow.</p>
        </div>
        <div className="preview-order">
          <div className="preview-order-title">
            <strong>Current order</strong>
            <small>
              {count} {count === 1 ? "item" : "items"}
            </small>
          </div>
          <div className="order-service">
            <ShoppingBag size={13} /> Takeaway
          </div>
          <div className="preview-order-lines">
            {items.map(
              (item, index) =>
                !!counts[index] && (
                  <div className="preview-order-line" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{money(item.amount * counts[index]!)}</span>
                    </div>
                    <div className="quantity-controls">
                      <button
                        aria-label={`Remove one ${item.name}`}
                        onClick={() => change(index, -1)}
                      >
                        <Minus size={11} />
                      </button>
                      <span>{counts[index]}</span>
                      <button
                        aria-label={`Add one ${item.name}`}
                        onClick={() => change(index, 1)}
                        disabled={counts[index]! >= 20}
                      >
                        <Plus size={11} />
                      </button>
                    </div>
                  </div>
                ),
            )}
            {count === 0 && (
              <p className="preview-empty">Choose an item to start your sample order.</p>
            )}
          </div>
          <div className="preview-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </div>
          <button className="preview-checkout" disabled={!count} onClick={() => setPaid(true)}>
            {paid ? (
              <>
                <Check size={15} /> Sample complete
              </>
            ) : (
              <>Complete sample</>
            )}
          </button>
          <div className="preview-disclaimer" aria-live="polite">
            {paid ? "No payment collected." : "Demo only · No payment collected"}
          </div>
          {paid && (
            <button
              className="preview-reset"
              onClick={() => {
                setCounts([1, 0, 1, 0]);
                setPaid(false);
              }}
            >
              <RotateCcw size={12} /> Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReceiptPreview() {
  return (
    <div className="receipt-paper">
      <strong className="receipt-business">The Daily Café</strong>
      <span>Mangalore, India</span>
      <div className="receipt-divider" />
      <div className="receipt-line">
        <span>1 × Cappuccino</span>
        <span>₹180</span>
      </div>
      <div className="receipt-line">
        <span>1 × Butter croissant</span>
        <span>₹160</span>
      </div>
      <div className="receipt-divider" />
      <div className="receipt-line receipt-total">
        <strong>Total</strong>
        <strong>₹340</strong>
      </div>
      <div className="receipt-line">
        <span>Paid · Cash</span>
        <span>₹340</span>
      </div>
      <div className="receipt-divider" />
      <p>Good coffee. See you again.</p>
      <small>Sample receipt</small>
    </div>
  );
}

export function ReportingPreview() {
  const days = [
    { day: "Mon", value: 48 },
    { day: "Tue", value: 64 },
    { day: "Wed", value: 42 },
    { day: "Thu", value: 78 },
    { day: "Fri", value: 92 },
    { day: "Sat", value: 68 },
    { day: "Sun", value: 84 },
  ];
  return (
    <div className="report-preview">
      <div className="report-top">
        <span>Business overview</span>
        <small>Illustrative data</small>
      </div>
      <h3>A view of your day.</h3>
      <div className="report-stats">
        <div>
          <span>Recorded sales</span>
          <strong>₹12,480</strong>
        </div>
        <div>
          <span>Completed orders</span>
          <strong>48</strong>
        </div>
      </div>
      <div className="report-chart" role="img" aria-label="Illustrative weekly sales chart">
        <div className="chart-baseline" />
        {days.map((day) => (
          <div key={day.day}>
            <i style={{ height: `${day.value}%` }} />
            <span>{day.day}</span>
          </div>
        ))}
      </div>
      <div className="report-bottom">
        <span>Orders, transactions and your daily overview.</span>
        <BarChart3 size={17} />
      </div>
    </div>
  );
}
