import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderId, setOrderId] = useState("");
  const [confirmedSummary, setConfirmedSummary] = useState({ items: 0, total: 0 });
  const [error, setError] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: ""
  });
  const [paymentData, setPaymentData] = useState({
    upiId: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });

  const progress = useMemo(
    () => [
      { id: 1, label: "Address" },
      { id: 2, label: "Payment" },
      { id: 3, label: "Order Confirmed" }
    ],
    []
  );

  const onAddressChange = (e) => setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const onPaymentChange = (e) =>
    setPaymentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const validateAddress = () => {
    const required = ["fullName", "phoneNumber", "addressLine1", "city", "state", "pincode"];
    return required.every((field) => address[field]?.trim());
  };

  const generateOrderId = () => `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`;

  const handleContinuePayment = () => {
    if (!validateAddress()) {
      setError("Please fill all required address fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError("Cart is empty.");
      return;
    }

    if (paymentMethod === "upi" && !paymentData.upiId.trim()) {
      setError("Please enter a UPI ID.");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !paymentData.cardNumber.trim() ||
        !paymentData.cardName.trim() ||
        !paymentData.expiry.trim() ||
        !paymentData.cvv.trim()
      ) {
        setError("Please fill all card details.");
        return;
      }
    }

    setError("");
    const newOrderId = generateOrderId();

    try {
      await createOrder({
        items: cartItems,
        address,
        paymentMethod,
        totalAmount: totalPrice,
        orderId: newOrderId
      });
      setConfirmedSummary({ items: totalItems, total: totalPrice });
      setOrderId(newOrderId);
      clearCart();
      setStep(3);
    } catch (e) {
      setError("Failed to place order. Please try again.");
    }
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <main className="page-wrap">
        <div className="empty-box">
          <h2>Your cart is empty</h2>
          <button className="amazon-btn" type="button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <div className="steps">
        {progress.map((item) => (
          <div key={item.id} className={`step ${step >= item.id ? "active" : ""}`}>
            {item.id}. {item.label}
          </div>
        ))}
      </div>

      {error && <p className="status error">{error}</p>}

      {step === 1 && (
        <section className="checkout-layout">
          <div className="checkout-card">
            <h2>Delivery Address</h2>
            <div className="form-grid">
              <input name="fullName" placeholder="Full Name" value={address.fullName} onChange={onAddressChange} />
              <input
                name="phoneNumber"
                placeholder="Phone Number"
                value={address.phoneNumber}
                onChange={onAddressChange}
              />
              <input
                name="addressLine1"
                placeholder="Address Line 1"
                value={address.addressLine1}
                onChange={onAddressChange}
              />
              <input
                name="addressLine2"
                placeholder="Address Line 2 (optional)"
                value={address.addressLine2}
                onChange={onAddressChange}
              />
              <input name="city" placeholder="City" value={address.city} onChange={onAddressChange} />
              <input name="state" placeholder="State" value={address.state} onChange={onAddressChange} />
              <input name="pincode" placeholder="Pincode" value={address.pincode} onChange={onAddressChange} />
            </div>
            <button type="button" className="amazon-btn" onClick={handleContinuePayment}>
              Continue to Payment
            </button>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="checkout-layout">
          <div className="checkout-card">
            <h2>Payment</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>
              {paymentMethod === "upi" && (
                <input
                  name="upiId"
                  placeholder="UPI ID"
                  value={paymentData.upiId}
                  onChange={onPaymentChange}
                />
              )}

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit / Debit Card
              </label>
              {paymentMethod === "card" && (
                <div className="form-grid">
                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentData.cardNumber}
                    onChange={onPaymentChange}
                  />
                  <input
                    name="cardName"
                    placeholder="Name on Card"
                    value={paymentData.cardName}
                    onChange={onPaymentChange}
                  />
                  <input
                    name="expiry"
                    placeholder="Expiry (MM/YY)"
                    value={paymentData.expiry}
                    onChange={onPaymentChange}
                  />
                  <input name="cvv" placeholder="CVV" value={paymentData.cvv} onChange={onPaymentChange} />
                </div>
              )}

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>

            <button type="button" className="amazon-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>

          <aside className="order-summary">
            <h3>Order Summary</h3>
            <p>Total items: {totalItems}</p>
            <p>Total price: Rs. {totalPrice.toFixed(2)}</p>
          </aside>
        </section>
      )}

      {step === 3 && (
        <section className="confirm-card">
          <div className="checkmark">✓</div>
          <h2>Order Placed Successfully!</h2>
          <p>Order ID: {orderId}</p>
          <p>Items ordered: {confirmedSummary.items}</p>
          <p>
            Delivery to: {address.fullName}, {address.addressLine1}, {address.city}, {address.state} -{" "}
            {address.pincode}
          </p>
          <p>Total paid: Rs. {confirmedSummary.total.toFixed(2)}</p>
          <button className="amazon-btn" type="button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </section>
      )}
    </main>
  );
}

export default CheckoutPage;
