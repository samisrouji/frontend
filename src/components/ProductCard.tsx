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

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>{price}</p>
      <div className="card-actions">
        {(() => {
          const atLimit = quantity >= inventoryQuantity;
          return (
            <button
              className={`add-button ${atLimit ? "limit" : ""}`}
              onClick={handleAdd}
              aria-label={`Add ${name} to cart`}
            >
              +
            </button>
          );
        })()}
        <span className="quantity">{quantity}</span>
        <button
          className="remove-button"
          onClick={handleRemove}
          aria-label={`Remove ${name} from cart`}
          disabled={quantity <= 0}
        >
          -
        </button>
      </div>

      <div className="available-box">{Math.max(inventoryQuantity - quantity, 0)} available</div>

      {error && (
        <div className="inventory-error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
    </div>
  );
}
