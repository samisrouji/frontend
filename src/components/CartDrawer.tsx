import "./CartDrawer.css";

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartDrawerProps {
  items: CartItem[];
  onClose: () => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

export default function CartDrawer({ items, onClose, onAdd, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((s, it) => {
    const price = Number(String(it.price).replace(/[^0-9.]/g, "")) || 0;
    return s + price * it.quantity;
  }, 0);

  return (
    <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
      <div className="cart-header">
        <h3>Cart</h3>
        <button className="close-button" onClick={onClose} aria-label="Close cart">✕</button>
      </div>

      <div className="cart-body">
        {items.length === 0 ? (
          <div className="empty">Your cart is empty</div>
        ) : (
          items.map((it) => (
            <div className="cart-item" key={it.id}>
              <div className="item-info">
                <div className="item-name">{it.name}</div>
                <div className="item-price">{it.price}</div>
              </div>
              <div className="item-actions">
                <button className="small" onClick={() => onRemove(it.id)} disabled={it.quantity <= 0}>-</button>
                <span className="qty">{it.quantity}</span>
                <button className="small" onClick={() => onAdd(it.id)}>+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="subtotal">Subtotal: ${subtotal.toFixed(2)}</div>
        <button className="checkout" disabled={items.length === 0}>Checkout</button>
      </div>
    </aside>
  );
}
