import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/ProductManagement.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // Include image property
}

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from API
    axios
      .get("http://localhost:5000/products/")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/editProduct/${id}`);
    console.log("Edit product with id:", id);
  };

  const handleAddProduct = () => {
    navigate("/addProduct");
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      // Call delete API
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() =>
          setProducts(products.filter((product) => product.id !== id))
        )
        .catch((error) => console.error(error));
    }
  };
  const cardStyles = {
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      objectPosition: "center",
    },
  };

  return (
    <div className="product-management">
      <h2>Product List</h2>
      <button className="add-product-button" onClick={handleAddProduct}>
        Add Product
      </button>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <img
              style={cardStyles.image}
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h3>
                {product.name} - ${product.price.toFixed(2)}
              </h3>
              <button
                className="edit-button"
                onClick={() => handleEdit(product.id)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(product.id, product.name)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
