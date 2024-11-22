import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import UserList from "./components/UserList";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditUser from "./components/Edituser";
import AddProduct from "./components/AddProduct";
import ProductManagement from "./components/ProductManagement";
import EditProduct from "./components/EditProduct";
import { useParams } from "react-router-dom";
import Cart from "./components/Cart";
import { ProtectedRoute } from "./components/Login";
import Login from "./components/Login";
function App() {
  // const [userId, setUserId] = useState(1);

  // const handleUserChange = (id: number) => {
  //   setUserId(id);
  // };
  const EditProductWrapper = () => {
    const { id } = useParams();

    // Convert `id` to a number as EditProduct expects a number for `productId`
    const productId = id ? parseInt(id) : null;

    return productId !== null ? (
      <EditProduct
        productId={productId}
        onClose={() => {
          /* handle close action here, e.g., navigate away */
        }}
        onProductUpdated={(updatedProduct) => {
          /* handle product update here */
        }}
      />
    ) : (
      <div>Product not found</div>
    );
  };

  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" Component={ProductList} />
          <Route path="/userlist" Component={UserList} />
          <Route path="/edituser/:id" element={<EditUser />} />
          <Route path="/signup" Component={Signup} />
          <Route
            path="/productmanagement"
            element={
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/editProduct:/id" element={<EditProductWrapper />} />
          <Route path="/cart" Component={Cart} />
          <Route path="login" Component={Login} />
        </Routes>
      </Router>

      {/* // <button onClick={() => handleUserChange(1)}>User 1</button>
    // <button onClick={() => handleUserChange(2)}>User 2</button>
    // <button onClick={() => handleUserChange(4)}>User 3</button> */}
      {/* <div>
        <button onClick={increment}>Increment </button>
        <button onClick={decrement}>Decrement</button>
      </div> */}
      {/* <Counter count={count}></Counter> */}
      {/* <TaxCalculator></TaxCalculator>
      <UserList></UserList> */}
      {/* <ProductList></ProductList> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
