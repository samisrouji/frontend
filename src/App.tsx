import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./components/Header";
import CartDrawer from "./components/CartDrawer.tsx";
import { ProductCard } from "./components/ProductCard";
import "./App.css";

// Define Product type to match backend
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inventoryQuantity: number;
  isAvailable: boolean;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch products from backend
  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8080/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortOrder]);

  // Filter products based on search and availability
  const filteredProducts = products
    .filter((p) => p.isAvailable)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Apply sorting
  let displayedProducts = filteredProducts.slice(); // clone array
  if (sortOrder === "asc") {
    displayedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    displayedProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = displayedProducts.slice(startIndex, startIndex + itemsPerPage);

  const addToCart = (productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      next[productId] = (next[productId] || 0) + 1;
      return next;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      const next = { ...prev };
      const cur = next[productId] || 0;
      if (cur <= 1) {
        delete next[productId];
      } else {
        next[productId] = cur - 1;
      }
      return next;
    });
  };

  const cartCount = Object.values(cart).reduce((s, q) => s + q, 0);

  const toggleCart = () => setIsCartOpen((v) => !v);
  const clearCart = () => setCart({});

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const pid = Number(id);
    const prod = products.find((p) => p.id === pid);
    return {
      id: pid,
      name: prod?.name || "Unknown",
      price: prod ? `$${prod.price}` : "$0",
      quantity: qty,
    };
  });

  return (
    <div>
      <Header
        onSearch={(query) => setSearchQuery(query)}
        cartCount={cartCount}
        onCartClick={toggleCart}
        onSortChange={(order) => setSortOrder(order)}
      />

      {isCartOpen && (
        <CartDrawer
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onAdd={(id: number) => addToCart(id)}
          onRemove={(id: number) => removeFromCart(id)}
          onClear={() => clearCart()}
        />
      )}

      <div className="product-grid">
        {paginatedProducts.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={`$${p.price}`}
            imageUrl="https://via.placeholder.com/150"
            onAdd={() => addToCart(p.id)}
            onRemove={() => removeFromCart(p.id)}
            quantity={cart[p.id] || 0}
            inventoryQuantity={p.inventoryQuantity}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default App;