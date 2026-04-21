import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const image = product?.images_url?.[0] || "https://placehold.co/300x180";
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
      return;
    }
    addToCart(product);
    setAdded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setAdded(false);
    }, 1000);
  };

  return (
    <article className="product-card">
      <img src={image} alt={product.title} className="product-image" />
      <div className="product-card-body">
        <h3>{product.title}</h3>
        <p className="price">Rs. {product.price}</p>
      </div>
      <button
        className={`amazon-btn add-to-cart-btn ${added ? "added" : ""}`}
        type="button"
        onClick={handleAddToCart}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </article>
  );
}

export default ProductCard;
