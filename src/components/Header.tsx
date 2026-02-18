import React from "react";
import "./Header.css";
import logo from "../assets/emarket-logo.png";

interface HeaderProps {
  onSearch?: (query: string) => void;
  cartCount?: number;
  onCartClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, cartCount = 0, onCartClick }) => {
  const [query, setQuery] = React.useState("");

  const handleSearch = () => {
    onSearch?.(query); // call parent callback with current query
  };

  return (
    <header className="header">
      <img src={logo} alt="eMarket" className="logo" />

      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>
          🔍
        </button>
      </div>
      <div className="cart-container">
        <button className="cart-button" aria-label="Cart" onClick={onCartClick}>🛒
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  );
};
