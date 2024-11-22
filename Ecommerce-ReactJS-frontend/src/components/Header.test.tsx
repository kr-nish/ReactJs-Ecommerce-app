import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from './Header';
import { AuthService } from './Login';

// Mock dependencies
jest.mock('axios');
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));
jest.mock('./Login', () => ({
  AuthService: {
    isAuthenticated: jest.fn(),
    logout: jest.fn()
  }
}));

describe('Header Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Setup mock navigate
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  const renderHeader = (isAuthenticated = false) => {
    // Mock authentication status
    (AuthService.isAuthenticated as jest.Mock).mockReturnValue(isAuthenticated);

    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  };

  test('renders header logo', () => {
    renderHeader();
    const logo = screen.getByText('NBay');
    expect(logo).toBeInTheDocument();
  });

  test('renders search input and button', () => {
    renderHeader();
    const searchInput = screen.getByPlaceholderText('Search Items');
    const searchButton = screen.getByText('Search');
    
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  describe('Unauthenticated State', () => {
    test('shows login and signup buttons when not authenticated', () => {
      renderHeader(false);

      const loginButton = screen.getByText('Login');
      const signupButton = screen.getByText('Sign Up');
      const cartButton = screen.getByText('Cart');

      expect(loginButton).toBeInTheDocument();
      expect(signupButton).toBeInTheDocument();
      expect(cartButton).toBeInTheDocument();
    });

    test('navigates to login page when login button clicked', () => {
      renderHeader(false);

      const loginButton = screen.getByText('Login');
      fireEvent.click(loginButton);

      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('navigates to signup page when signup button clicked', () => {
      renderHeader(false);

      const signupButton = screen.getByText('Sign Up');
      fireEvent.click(signupButton);

      expect(mockNavigate).toHaveBeenCalledWith('/signup');
    });
  });

  describe('Authenticated State', () => {
    test('shows product management and logout buttons when authenticated', () => {
      renderHeader(true);

      const productManagementButton = screen.getByText('Product Management');
      const logoutButton = screen.getByText('Logout');
      const cartButton = screen.getByText('Cart');

      expect(productManagementButton).toBeInTheDocument();
      expect(logoutButton).toBeInTheDocument();
      expect(cartButton).toBeInTheDocument();
    });

    test('navigates to product management when button clicked', () => {
      renderHeader(true);

      const productManagementButton = screen.getByText('Product Management');
      fireEvent.click(productManagementButton);

      expect(mockNavigate).toHaveBeenCalledWith('/productmanagement');
    });

    test('handles logout successfully', async () => {
      // Mock axios post
      (axios.post as jest.Mock).mockResolvedValue({});

      renderHeader(true);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      // Wait for async operations
      await screen.findByText('NBay');

      // Verify logout actions
      expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/auth/logout');
      expect(AuthService.logout).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: 'success',
          title: 'Logged Out'
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('handles logout failure gracefully', async () => {
      // Mock axios post to throw an error
      (axios.post as jest.Mock).mockRejectedValue(new Error('Logout failed'));

      renderHeader(true);

      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);

      // Wait for async operations
      await screen.findByText('NBay');

      // Verify fallback logout actions
      expect(AuthService.logout).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('navigates to cart when cart button clicked', () => {
      renderHeader(true);

      const cartButton = screen.getByText('Cart');
      fireEvent.click(cartButton);

      expect(mockNavigate).toHaveBeenCalledWith('/cart');
    });
  });

  test('checks authentication status on mount', () => {
    // Verify that isAuthenticated is checked on component mount
    const isAuthenticatedSpy = jest.spyOn(AuthService, 'isAuthenticated');
    
    renderHeader();

    expect(isAuthenticatedSpy).toHaveBeenCalled();
  });
});