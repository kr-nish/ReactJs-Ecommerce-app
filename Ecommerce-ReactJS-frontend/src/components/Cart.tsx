import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { removeFromCartAsync } from "../store/cartActions";
import "../style/Cart.css";
import { AppDispatch } from "../store";

const Cart: React.FC = () => {
  const { cart, status, error } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = async (productId: number) => {
    try {
      await dispatch(removeFromCartAsync(productId)).unwrap();
      console.log("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  const isLoading = status === "loading";

  if (isLoading && cart.length === 0) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((product) => (
            <li key={product.id} className="cart-item">
              <img
                src={product.image}
                alt={product.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <p className="cart-item-name">{product.name}</p>
                <p className="cart-item-price">${product.price.toFixed(2)}</p>
                <button
                  onClick={() => handleRemove(product.id)}
                  className="cart-item-remove"
                  disabled={isLoading}
                >
                  {isLoading ? "Removing..." : "Remove"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
