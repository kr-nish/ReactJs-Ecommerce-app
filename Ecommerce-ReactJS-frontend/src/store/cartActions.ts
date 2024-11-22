import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product } from './cartTypes';

// Action Types (if needed for external usage)
export const CART_ADD = 'addToCartAsync';
export const CART_REMOVE = 'removeFromCartAsync';
export const LOAD_DATA ='loadDataAsync'

// Async Actions
export const addToCartAsync = createAsyncThunk(
  CART_ADD,
  async (product: Product) => {
    try {
      const response = await axios.post('http://localhost:5000/cart', product);
      return response.data;
    } catch (error) {
      throw new Error('Failed to add item to cart');
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  CART_REMOVE,
  async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${productId}`);
      return productId;
    } catch (error) {
      throw new Error('Failed to remove item from cart');
    }
  }
);