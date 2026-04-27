import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Footer() {
    const { cartItems } = useCart();
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-brand">
          <h2 className="footer-logo">
            E-COMMERCE <span>STORE</span>
          </h2>
          <p>Your one-stop shop for everything you love.</p>
        </div>

        <div className="footer-links">

          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/" className="footer-link">Products</Link></li>
              <li><Link to="/" className="footer-link">Categories</Link></li>
              <li><Link to="/" className="footer-link">Offers</Link></li>
            </ul>
          </div>

          <div>
            <h4>Customer Area</h4>
            <ul>
              <li><Link to="/account" className="footer-link">My Account</Link></li>
              <li>Orders</li>
              <li><Link to="/cart" className="footer-link">Cart ({cartItems.length})</Link></li>
            </ul>
          </div>

          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Center</li>
              <li><Link to="/contact" className="footer-link"/>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} E-Commerce Store. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;