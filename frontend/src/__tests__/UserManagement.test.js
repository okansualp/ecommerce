import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserManagement from '../pages/UserManagement';
import axios from 'axios';

jest.mock('axios');

describe('UserManagement', () => {
  const mockUsers = [
    {
      _id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      status: 'active',
      lastLogin: new Date().toISOString()
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: { users: mockUsers } });
  });

  test('renders user management page', async () => {
    render(<UserManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('User Management')).toBeInTheDocument();
      expect(screen.getByText('Add New User')).toBeInTheDocument();
    });
  });

  test('loads and displays users', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('user')).toBeInTheDocument();
      expect(screen.getByText('active')).toBeInTheDocument();
    });
  });

  test('handles adding new user', async () => {
    const newUser = {
      name: 'New User',
      email: 'new@example.com',
      role: 'user',
      status: 'active'
    };

    axios.post.mockResolvedValueOnce({ data: { ...newUser, _id: '2' } });
    
    render(<UserManagement />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: newUser.name }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: newUser.email }
    });
    fireEvent.change(screen.getByLabelText(/role/i), {
      target: { value: newUser.role }
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: newUser.status }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/users',
        newUser
      );
    });
  });

  test('handles editing user', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    const updatedUser = {
      ...mockUsers[0],
      name: 'Updated User Name'
    };

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: updatedUser.name }
    });

    axios.put.mockResolvedValueOnce({ data: updatedUser });

    fireEvent.click(screen.getByRole('button', { name: /update user/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:5000/api/users/${mockUsers[0]._id}`,
        expect.objectContaining({
          name: updatedUser.name
        })
      );
    });
  });

  test('handles toggling user status', async () => {
    render(<UserManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Suspend'));
    });

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalledWith(
        `http://localhost:5000/api/users/${mockUsers[0]._id}/toggle-status`
      );
    });
  });

  test('handles error when loading users', async () => {
    const errorMessage = 'Failed to load users';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<UserManagement />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('validates required fields', async () => {
    render(<UserManagement />);

    // Try to submit without filling required fields
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    // Check for HTML5 validation
    expect(screen.getByLabelText(/name/i)).toBeInvalid();
    expect(screen.getByLabelText(/email/i)).toBeInvalid();
  });

  test('handles network error when adding user', async () => {
    const errorMessage = 'Network Error';
    axios.post.mockRejectedValueOnce(new Error(errorMessage));

    render(<UserManagement />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add user/i }));

    await waitFor(() => {
      expect(screen.getByText(/an error occurred/i)).toBeInTheDocument();
    });
  });
});
