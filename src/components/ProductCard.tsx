import "./ProductCard.css";
import { useEffect, useRef, useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
  inventoryQuantity: number;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  onAdd,
  onRemove,
  quantity = 0,
  inventoryQuantity,
}: ProductCardProps) {
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current as unknown as number);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const handleAdd = () => {
    if (quantity >= inventoryQuantity) {
      setError("Inventory limit reached");
      clearTimer();
      timerRef.current = setTimeout(() => setError(null), 2000);
      return;
    }
    clearTimer();
    setError(null);
    onAdd && onAdd();
  };

  const handleRemove = () => {
    clearTimer();
    setError(null);
    onRemove && onRemove();
  };

  const productIdLabel = `product-${id}`;

  return (
    <article className="product-card" aria-labelledby={productIdLabel}>
      <div className="image-wrap">
        <img src={imageUrl} alt={name} />
      </div>

      <div className="card-body">
        <h3 id={productIdLabel} className="product-title">
          {name}
        </h3>

        <div className="price-row">
          <div className="price">{price}</div>
          <div className="available-box">{Math.max(inventoryQuantity - quantity, 0)} available</div>
        </div>

        <div className="card-actions">
          {(() => {
            const atLimit = quantity >= inventoryQuantity;
            return (
              <button
                className={`add-button ${atLimit ? "limit" : ""}`}
                onClick={handleAdd}
                aria-label={`Add ${name} to cart`}
              >
                <span className="sr-only">Add</span>
                <span aria-hidden>+</span>
              </button>
            );
          })()}

          <span className="quantity" aria-live="polite" aria-atomic="true">{quantity}</span>

          <button
            className="remove-button"
            onClick={handleRemove}
            aria-label={`Remove ${name} from cart`}
            disabled={quantity <= 0}
          >
            <span className="sr-only">Remove</span>
            <span aria-hidden>-</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="inventory-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
    </article>
  );
}
