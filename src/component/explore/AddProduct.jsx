import { useState } from "react";
import './AddProduct.css';
function AddProduct({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [selectSize, setSelectSize] = useState([]);
  const [sizeChart, setSizeChart] = useState("");
  const getAvailableSizes = () => {
    if (type === "shoes") {
      return ["6", "7", "8", "9", "10"];
    } else if (type === "accessories" || type === "wallet" || type === "belt") {
      return ["One Size"];
    } else {
      return ["XS", "S", "M", "L", "XL"];
    }
  };
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectSize((prevSizes) => [...prevSizes, value]);
    } else {
      setSelectSize((prevSizes) => prevSizes.filter((size) => size !== value));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedSizes = selectSize.length > 0 ? selectSize : ["One Size"];
    const newProduct = {
      title,
      category,
      type,
      price: parseFloat(price),
      image,
      description,
      selectSize: selectedSizes,
      sizeChart,
    };
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const data = await response.json();
      onAddProduct(data);
      setTitle("");
      setCategory("");
      setType("");
      setPrice("");
      setImage("");
      setDescription("");
      setSelectSize([]);
      setSizeChart("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  return (
    <form className="add-product-form" onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select Category</option>
        <option value="men's clothing">Men's Clothing</option>
        <option value="women's clothing">Women's Clothing</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      >
        <option value="">Select Type</option>
        <option value="shirt">Shirt</option>
        <option value="t-shirt">T-Shirt</option>
        <option value="shoes">Shoes</option>
        <option value="belt">Belt</option>
        <option value="wallet">Wallet</option>
        <option value="accessories">Accessories</option>
      </select>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <fieldset>
        <legend>Select Sizes</legend>
        {getAvailableSizes().map((size) => (
          <label key={size}>
            <input
              type="checkbox"
              value={size}
              checked={selectSize.includes(size)}
              onChange={handleSizeChange}
              disabled={size === "One Size"}
            />
            {size}
          </label>
        ))}
      </fieldset>
      <textarea
        placeholder="Size Chart"
        value={sizeChart}
        onChange={(e) => setSizeChart(e.target.value)}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
export default AddProduct;
