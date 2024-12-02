import { useEffect, useState } from "react";
import ProductCard from "../component/explore/ProductCard";
import PriceFilter from "../component/explore/PriceFilter";
import "./ExploreProducts.css";
import { useParams } from "react-router-dom";
import AddProduct from "../component/explore/AddProduct";
import toast from "react-hot-toast";

function ExploreProducts() {
  
  const [products, setProducts] = useState([]); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("default");
  const [checkBoxState, setCheckBoxState] = useState({
    men: false,
    women: false,
  });
  let { category } = useParams();

  // Fetch products on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Update checkbox state based on URL category
  useEffect(() => {
    let resetCheckBoxState = { men: false, women: false };
    if (category === "all") {
      setCheckBoxState(resetCheckBoxState);
      return;
    }
    setCheckBoxState({ ...resetCheckBoxState, [category]: true });
  }, [category]);

  // Filter products based on category
  useEffect(() => {
    function getFilteredData() {
      if (!checkBoxState.men && !checkBoxState.women) {
        return products.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );
      }

      return products.filter((product) => {
        if (checkBoxState.men && product.category === "men's clothing") {
          return product;
        } else if (
          checkBoxState.women &&
          product.category === "women's clothing"
        ) {
          return product;
        }
        return false;
      });
    }

    const filteredData = getFilteredData();
    setFilteredProducts(filteredData);
    setPriceFilter("default");
  }, [checkBoxState, products]);

  // Handle search
  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const searchFilteredData = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
    setFilteredProducts(searchFilteredData);
  }

  // Handle adding a new product
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setFilteredProducts((prevProducts) => [...prevProducts, newProduct]);
    toast.success("Product added successfully!");
  };

  // Handle deleting a product
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setFilteredProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      toast.error("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  return (
    <main className="product-main">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <PriceFilter
        priceFilter={priceFilter}
        handlePriceFilter={(e) => {
          const filter = e.target.value;
          let sortedData = [...filteredProducts];
          if (filter === "low-to-high") {
            sortedData.sort((a, b) => a.price - b.price);
          }
          if (filter === "high-to-low") {
            sortedData.sort((a, b) => b.price - a.price);
          }
          setFilteredProducts(sortedData);
          setPriceFilter(filter);
        }}
      />
      <AddProduct onAddProduct={handleAddProduct} />
      <div className="products-container">
          <AllProducts
            products={filteredProducts}
            onDelete={handleDeleteProduct}
          />
      </div>
    </main>
  );
}

function AllProducts({ products, onDelete }) {
  return products.length ? (
    products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onDelete={onDelete}
      />
    ))
  ) : (
    <p>No products found.</p>
  );
}



export default ExploreProducts;
