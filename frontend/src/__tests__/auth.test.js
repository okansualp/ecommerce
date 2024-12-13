import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import axios from 'axios';

jest.mock('axios');

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('LoginPage', () => {
    const renderLoginPage = () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <LoginPage />
          </AuthProvider>
        </BrowserRouter>
      );
    };

    test('renders login form', () => {
      renderLoginPage();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('handles successful login', async () => {
      const mockResponse = {
        data: {
          token: 'fake-token',
          user: {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            role: 'user'
          }
        }
      };
      axios.post.mockResolvedValueOnce(mockResponse);

      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:5000/api/auth/login',
          {
            email: 'test@example.com',
            password: 'password123'
          }
        );
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    test('handles login error', async () => {
      const errorMessage = 'Invalid credentials';
      axios.post.mockRejectedValueOnce({
        response: { data: { message: errorMessage } }
      });

      renderLoginPage();

      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'test@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText(/password/i), {
        target: { value: 'wrongpassword' }
      });
      fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
    });
  });

  describe('RegisterPage', () => {
    const renderRegisterPage = () => {
      render(
        <BrowserRouter>
          <AuthProvider>
            <RegisterPage />
          </AuthProvider>
        </BrowserRouter>
      );
    };

    test('renders registration form', () => {
      renderRegisterPage();
      expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/^password$/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/confirm password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    test('handles successful registration', async () => {
      const mockRegisterResponse = {
        data: {
          message: 'Registration successful'
        }
      };
      const mockLoginResponse = {
        data: {
          token: 'fake-token',
          user: {
            id: '1',
            name: 'New User',
            email: 'new@example.com',
            role: 'user'
          }
        }
      };

      axios.post
        .mockResolvedValueOnce(mockRegisterResponse)
        .mockResolvedValueOnce(mockLoginResponse);

      renderRegisterPage();

      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'New User' }
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'new@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: 'password123' }
      });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:5000/api/auth/register',
          {
            name: 'New User',
            email: 'new@example.com',
            password: 'password123'
          }
        );
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    test('handles password mismatch', async () => {
      renderRegisterPage();

      fireEvent.change(screen.getByPlaceholderText(/full name/i), {
        target: { value: 'New User' }
      });
      fireEvent.change(screen.getByPlaceholderText(/email/i), {
        target: { value: 'new@example.com' }
      });
      fireEvent.change(screen.getByPlaceholderText(/^password$/i), {
        target: { value: 'password123' }
      });
      fireEvent.change(screen.getByPlaceholderText(/confirm password/i), {
        target: { value: 'differentpassword' }
      });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });
  });
});
