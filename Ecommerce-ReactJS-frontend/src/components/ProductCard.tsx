import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCartAsync } from '../store/cartActions';
import { Product } from '../store/cartTypes';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.cart);
  const isLoading = status === 'loading';

  const handleAddToCart = async (product: Product) => {
    try {
      await dispatch(addToCartAsync(product)).unwrap();
      console.log("Added product to cart:", product.id);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
    }
  };

  const cardStyles = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '12px',
      margin: '10px',
      width: '250px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    imageContainer: {
      width: '200px',
      height: '200px',
      position: 'relative' as const,
      overflow: 'hidden',
      borderRadius: '4px'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      objectPosition: 'center'
    },
    title: {
      margin: '12px 0 8px 0',
      fontSize: '16px',
      fontWeight: '500',
      color: '#333'
    },
    price: {
      margin: '8px 0',
      color: '#2c5282',
      fontSize: '18px',
      fontWeight: 'bold'
    },
    productId: {
      color: '#666',
      fontSize: '14px',
      margin: '4px 0'
    },
    button: {
      
      backgroundColor: isLoading ? '#cbd5e0' : '#4299e1',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '8px',
      width: '100%',
      ':hover': {
        backgroundColor: isLoading ? '#cbd5e0' : '#3182ce'
      }
    }
  };

  return (
    <div style={cardStyles.card}>
      <div style={cardStyles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={cardStyles.image}
        />
      </div>
      <h4 style={cardStyles.title}>{product.name}</h4>
      <p style={cardStyles.price}>${product.price}</p>
    
      <button 
        onClick={() => handleAddToCart(product)}
        disabled={isLoading}
        style={cardStyles.button}
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;