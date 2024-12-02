import React, { useState } from "react";
import toast from "react-hot-toast";
import "./UserInfo.css";
function PaymentForm({ onSubmit }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  function handlePayment(e) {
    e.preventDefault();
    if (!/^\d{16}$/.test(cardNumber)) {
      toast.error("Invalid 16-digit card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.error("Invalid expiry date (MM/YY).");
      return;
    }
    if (!/^\d{3}$/.test(cvv)) {
      toast.error("Invalid 3-digit CVV.");
      return;
    }
    toast.success("Payment Successful!");
    onSubmit();
  }
  return (
    <div className="payment-form_container">
      <h3>Enter Payment Details</h3>
      <form onSubmit={handlePayment}>
        <div className="form-group">
          <label>Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
          />
        </div>
        <div className="form-group">
          <label>Expiry Date (MM/YY)</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>CVV</label>
          <input
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
          />
        </div>
        <button type="submit" className="pay-btn">
          Pay Now
        </button>
      </form>
    </div>
  );
}
export default PaymentForm;
