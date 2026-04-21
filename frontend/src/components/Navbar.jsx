import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { currentUser, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        E-Commerce Store
      </Link>

      <nav className="nav-right">
        {isLoggedIn ? (
          <>
            <span>Hello, {currentUser?.name || "User"}</span>
            <button className="cart-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <span className="cart-btn">Sign In</span>
          </Link>
        )}
        <Link to="/cart" className="cart-link">
          <span className="cart-btn">Cart</span>
          {totalItems > 0 && (
            <span key={totalItems} className="cart-badge">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
