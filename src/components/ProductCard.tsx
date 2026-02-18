import "./ProductCard.css";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  onAdd?: () => void;
  onRemove?: () => void;
  quantity?: number;
}

export function ProductCard({ name, price, imageUrl, onAdd, onRemove, quantity = 0 }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name}/>
      <h3>{name}</h3>
      <p>{price}</p>
      <div className="card-actions">
        <button className="add-button" onClick={onAdd} aria-label={`Add ${name} to cart`}>+</button>
        <span className="quantity">{quantity}</span>
        <button className="remove-button" onClick={onRemove} aria-label={`Remove ${name} from cart`} disabled={quantity <= 0}>-</button>
      </div>
    </div>
  );
};
