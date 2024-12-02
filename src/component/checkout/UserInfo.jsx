import React, { useState } from "react";
import { useCartActions } from "../../store/Store";
import { useCart } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";
import toast from "react-hot-toast";
import "./UserInfo.css";
const pincodeToCityMap = {
  "110001": "New Delhi",
  "400001": "Mumbai",
  "560001": "Bangalore",
  "600001": "Chennai",
  "700001": "Kolkata",
  "522502": "Guntur",
};
function UserInfo() {
  return (
    <div className="user-info_container">
      <ContactInformation />
      <ShippingAddress />
    </div>
  );
}
function ContactInformation() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  function validateContactInfo() {
    if (!email) {
      toast.error("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!phone) {
      toast.error("Phone number is required.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  }
  return (
    <div className="contact-info_container">
      <h3>Contact Information</h3>
      <div className="contact-info_form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button className="validate-btn" onClick={validateContactInfo}>
          Validate Contact Info
        </button>
      </div>
    </div>
  );
}
function ShippingAddress() {
  const { emptyCart } = useCartActions();
  const cart = useCart();
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  function handlePincodeChange(e) {
    const enteredPincode = e.target.value;
    setPincode(enteredPincode);
    setCity(pincodeToCityMap[enteredPincode] || "");
  }
  function validateShippingAddress() {
    if (!firstName || !lastName || !address || !pincode || !city) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Please enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  }
  function checkoutHandler() {
    if (!validateShippingAddress() || cart.length === 0) return;
    setShowPaymentForm(true);
  }
  function handlePaymentSuccess() {
    emptyCart();
    toast.success("Checked out successfully!");
    navigate("/");
  }
  return (
    <div className="shipping-address_container">
      {!showPaymentForm ? (
        <>
          <h3>Shipping Address</h3>
          <div className="form-group">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              placeholder="Pincode"
              value={pincode}
              onChange={handlePincodeChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" placeholder="City" value={city} readOnly />
          </div>
          <button className="checkout-btn" onClick={checkoutHandler}>
            Payment to Proceed
          </button>
        </>
      ) : (
        <PaymentForm onSubmit={handlePaymentSuccess} />
      )}
    </div>
  );
}
export default UserInfo;
