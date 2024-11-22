import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddProduct.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');

  const handleAddProduct = async () => {
    try {
      const newProduct = { name: productName, image: imageUrl, price: parseFloat(price) };
      await axios.post('http://localhost:5000/products', newProduct);
      alert('Product added successfully');
      setProductName('');
      setImageUrl('');
      setPrice('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form className="add-product-form" onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL:
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </label>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
