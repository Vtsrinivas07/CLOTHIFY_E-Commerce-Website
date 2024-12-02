import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductCard.css";
function ProductCard({ product, onDelete }) {
  let { addToCart } = useCartActions();
  function handleAddToCart() {
    addToCart(product);
    toast.success("Added to Cart");
  }
  function handleDelete() {
    onDelete(product.id);
    toast.error("Product deleted");
  }
  return (
    <div className="product-card_wrapper">
      <Link to={`/product/${product.id}`}>
        <div className="product-card_img">
          <img src={product?.image} alt={product.title} />
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{product.title}</h3>
        <span className="product-card_bottom">
          <button className="add-cart_btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="delete-product_btn" onClick={handleDelete}>
            Delete
          </button>
          <b className="product-card_price">₹{product?.price}</b>
        </span>
      </div>
    </div>
  );
}
export default ProductCard;
