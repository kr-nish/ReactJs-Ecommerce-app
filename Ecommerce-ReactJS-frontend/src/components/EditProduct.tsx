import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../style/EditProduct.css";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface EditProductProps {
  productId: number;
  onClose: () => void;
  onProductUpdated: (updatedProduct: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, onClose, onProductUpdated }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch product data when component mounts
    axios.get(`http://localhost:5000/products/${productId}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        setName(productData.name);
        setPrice(productData.price);
        setImageUrl(productData.imageUrl);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleSave = () => {
    if (product) {
      const updatedProduct = { ...product, name, price, imageUrl };
      axios.put(`http://localhost:5000/products/${productId}`, updatedProduct)
        .then(response => {
          onProductUpdated(response.data);
          onClose();
        })
        .catch(error => console.error('Error updating product:', error));
    }
  };

  return (
    <div className="edit-product">
      <h3>Edit Product</h3>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </label>
      <button className="save-button" onClick={handleSave}>Save</button>
      <button className="cancel-button" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditProduct;
