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
        <h1 className="logo-main">E-Commerce <span>Store</span></h1>
      </Link>

      <nav className="nav-right">
        {isLoggedIn ? (
          <>
            <div className="account-badge">
              <span className="account-icon">👤</span>
              <span>Hello, {currentUser?.name || "User"}</span>
             </div> 
            <button className="cart-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="cart-btn" type="button">Sign In</button>
          </Link>
        )}
        <Link to="/cart" className="cart-link">
          <button className="cart-btn" type="button">Cart</button>
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
