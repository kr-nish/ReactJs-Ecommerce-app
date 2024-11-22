import React, { Component } from "react";
import axios from "axios";
import "../style/ProductList.css";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListProps {}

interface ProductListState {
  products: Product[];
}

class ProductList extends Component<ProductListProps, ProductListState> {
  constructor(props: ProductListProps) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  render() {
    return (
      <div className="product-list">
        {this.state.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
}

export default ProductList;
