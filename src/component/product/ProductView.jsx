import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductView.css";
function ProductView() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const { productId } = useParams();
  const { addToCart } = useCartActions();
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProductData(data);
        setSelectedSize(data.selectSize?.[0] || null);
      } catch (error) {
        console.error(error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);
  function handleAddToCart() {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
    addToCart({ ...productData, selectedSize });
    toast.success("Added to Cart");
  }
  if (loading) return <p>Loading product...</p>;
  if (!productData) return <p>Product not found!</p>;
  return (
    <div className="product-container">
      <div className="product-img_wrapper">
        <img
          src={productData.image || "https://via.placeholder.com/150"}
          alt={productData.title || "Product Image"}
        />
      </div>
      <div className="product-info">
        <h2 className="product-name">{productData.title || "No Title"}</h2>
        <p className="product-category">
          Category: {productData.category || "Uncategorized"}
        </p>
        <p className="product-price">₹{productData.price || "0"}</p>
        <p className="product-description">
          {productData.description || "No description available."}
        </p>
        {productData.selectSize && productData.selectSize.length > 0 ? (
          <div className="product-size">
            <label htmlFor="size-select">Select Size:</label>
            <select
              id="size-select"
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {productData.selectSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p className="no-size-info">No sizes available for this product.</p>
        )}
        <button className="product-cart_btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <div className="product-extra-info">
          <p>100% Original Products</p>
          <p>Pay on delivery might be available</p>
          <p>Easy 7 days returns and exchanges</p>
        </div>
      </div>
    </div>
  );
}
export default ProductView;
