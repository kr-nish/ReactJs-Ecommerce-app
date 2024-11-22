import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock all imported components
jest.mock('./components/Header', () => {
  return function MockHeader() {
    return <div data-testid="mock-header">Header</div>;
  };
});

jest.mock('./components/Footer', () => {
  return function MockFooter() {
    return <div data-testid="mock-footer">Footer</div>;
  };
});

jest.mock('./components/ProductList', () => {
  return function MockProductList() {
    return <div data-testid="mock-product-list">Product List</div>;
  };
});

jest.mock('./components/UserList', () => {
  return function MockUserList() {
    return <div data-testid="mock-user-list">User List</div>;
  };
});

jest.mock('./components/Signup', () => {
  return function MockSignup() {
    return <div data-testid="mock-signup">Signup</div>;
  };
});

jest.mock('./components/Edituser', () => {
  return function MockEditUser() {
    return <div data-testid="mock-edit-user">Edit User</div>;
  };
});

jest.mock('./components/AddProduct', () => {
  return function MockAddProduct() {
    return <div data-testid="mock-add-product">Add Product</div>;
  };
});

jest.mock('./components/ProductManagement', () => {
  return function MockProductManagement() {
    return <div data-testid="mock-product-management">Product Management</div>;
  };
});

jest.mock('./components/EditProduct', () => {
  return function MockEditProduct() {
    return <div data-testid="mock-edit-product">Edit Product</div>;
  };
});

jest.mock('./components/Cart', () => {
  return function MockCart() {
    return <div data-testid="mock-cart">Cart</div>;
  };
});

jest.mock('./components/Login', () => {
  return {
    ProtectedRoute: function MockProtectedRoute({ children }: { children: React.ReactNode }) {
      return <div data-testid="mock-protected-route">{children}</div>;
    },
    default: function MockLogin() {
      return <div data-testid="mock-login">Login</div>;
    }
  };
});

// Mock useParams hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '123' }),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('App Component', () => {
  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };

  test('renders main App structure', () => {
    renderApp();

    // Check core components are rendered
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });

  test('renders ProductList on root route', () => {
    renderApp('/');
    expect(screen.getByTestId('mock-product-list')).toBeInTheDocument();
  });

  test('renders UserList on /userlist route', () => {
    renderApp('/userlist');
    expect(screen.getByTestId('mock-user-list')).toBeInTheDocument();
  });

  test('renders Signup on /signup route', () => {
    renderApp('/signup');
    expect(screen.getByTestId('mock-signup')).toBeInTheDocument();
  });

  test('renders EditUser on /edituser/:id route', () => {
    renderApp('/edituser/1');
    expect(screen.getByTestId('mock-edit-user')).toBeInTheDocument();
  });

  test('renders ProductManagement with ProtectedRoute', () => {
    renderApp('/productmanagement');
    expect(screen.getByTestId('mock-protected-route')).toBeInTheDocument();
    expect(screen.getByTestId('mock-product-management')).toBeInTheDocument();
  });

  test('renders AddProduct with ProtectedRoute', () => {
    renderApp('/addProduct');
    expect(screen.getByTestId('mock-protected-route')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-product')).toBeInTheDocument();
  });

  test('renders Cart on /cart route', () => {
    renderApp('/cart');
    expect(screen.getByTestId('mock-cart')).toBeInTheDocument();
  });

  test('renders Login on /login route', () => {
    renderApp('/login');
    expect(screen.getByTestId('mock-login')).toBeInTheDocument();
  });

  test('EditProductWrapper renders EditProduct with correct props', () => {
    renderApp('/editProduct:/id');
    expect(screen.getByTestId('mock-edit-product')).toBeInTheDocument();
  });

  test('renders App with correct className', () => {
    renderApp();
    // eslint-disable-next-line testing-library/no-node-access
    const appContainer = screen.getByTestId('mock-header').closest('.App');
    expect(appContainer).toBeInTheDocument();
  });
});

// Additional test for EditProductWrapper specific logic
describe('EditProductWrapper', () => {
  const renderEditProductWrapper = () => {
    return render(
      <MemoryRouter initialEntries={['/editProduct:/id']}>
        <App />
      </MemoryRouter>
    );
  };

  test('handles product ID rendering', () => {
    renderEditProductWrapper();
    const editProductElement = screen.getByTestId('mock-edit-product');
    expect(editProductElement).toBeInTheDocument();
  });
});