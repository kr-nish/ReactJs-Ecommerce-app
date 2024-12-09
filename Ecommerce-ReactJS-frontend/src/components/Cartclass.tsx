
import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../store";
import { removeFromCartAsync } from "../store/cartActions";
import { AppDispatch } from "../store";
import "../style/Cart.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartProps {
  cart: Product[];
  status: string;
  error: string | null;
  dispatch: AppDispatch;
}

class Cart extends Component<CartProps> {
  handleRemove = async (productId: number) => {
    const { dispatch } = this.props;
    try {
      await dispatch(removeFromCartAsync(productId)).unwrap();
      console.log("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove product from cart:", error);
    }
  };

  render() {
    const { cart, status, error } = this.props;
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
                    onClick={() => this.handleRemove(product.id)}
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
  }
}

const mapStateToProps = (state: RootState) => ({
  cart: state.cart.cart,
  status: state.cart.status,
  error: state.cart.error,
});

export default connect(mapStateToProps)(Cart);
