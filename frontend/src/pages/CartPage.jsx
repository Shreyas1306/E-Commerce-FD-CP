import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, totalItems, totalPrice, getProductId } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <main className="page-wrap">
        <div className="empty-box">
          <h2>Your cart is empty</h2>
          <Link className="amazon-btn" to="/">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap cart-layout">
      <section className="cart-list">
        {cartItems.map(({ product, quantity }) => {
          const itemId = getProductId(product);
          const image = product?.images_url?.[0] || "https://placehold.co/120";
          const subtotal = Number(product.price || 0) * quantity;
          return (
            <article key={itemId} className="cart-item">
              <img src={image} alt={product.title} className="cart-item-image" />
              <div className="cart-item-body">
                <h3>{product.title}</h3>
                <p>Rs. {product.price}</p>
                <p>Subtotal: Rs. {subtotal.toFixed(2)}</p>
                <div className="qty-row">
                  <button
                    type="button"
                    className="cart-btn"
                    onClick={() => updateQuantity(itemId, quantity - 1)}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    className="cart-btn"
                    onClick={() => updateQuantity(itemId, quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFromCart(itemId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <aside className="order-summary">
        <h3>Order Summary</h3>
        <p>Total items: {totalItems}</p>
        <p>Total price: Rs. {totalPrice.toFixed(2)}</p>
        <button className="amazon-btn" type="button" onClick={() => navigate("/checkout")}>
          Proceed to Checkout
        </button>
      </aside>
    </main>
  );
}

export default CartPage;
