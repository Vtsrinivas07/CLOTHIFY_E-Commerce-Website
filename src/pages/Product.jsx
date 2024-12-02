import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductView from "../component/product/ProductView";
import "./Product.css";

function Product() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:5000/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const product = await response.json();
        setProductData(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!productData) {
    return <div className="error">Product not found</div>;
  }

  return (
    <main className="product-view_main container">
      <ProductView productData={productData} />
    </main>
  );
}

export default Product;
