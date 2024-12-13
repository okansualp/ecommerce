import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductManagement from '../pages/ProductManagement';
import axios from 'axios';

jest.mock('axios');

describe('ProductManagement', () => {
  const mockProducts = [
    {
      _id: '1',
      name: 'Test Product',
      description: 'Test Description',
      price: 99.99,
      category: 'Test Category',
      stock: 10,
      imageUrl: 'http://example.com/image.jpg'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockResolvedValue({ data: { products: mockProducts } });
  });

  test('renders product management page', async () => {
    render(<ProductManagement />);
    
    await waitFor(() => {
      expect(screen.getByText('Product Management')).toBeInTheDocument();
      expect(screen.getByText('Add New Product')).toBeInTheDocument();
    });
  });

  test('loads and displays products', async () => {
    render(<ProductManagement />);

    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('Test Category')).toBeInTheDocument();
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
  });

  test('handles adding new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'New Description',
      price: '149.99',
      category: 'New Category',
      stock: '20',
      imageUrl: 'http://example.com/new-image.jpg'
    };

    axios.post.mockResolvedValueOnce({ data: { ...newProduct, _id: '2' } });
    
    render(<ProductManagement />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: newProduct.name }
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: newProduct.description }
    });
    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: newProduct.price }
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: newProduct.category }
    });
    fireEvent.change(screen.getByLabelText(/stock/i), {
      target: { value: newProduct.stock }
    });
    fireEvent.change(screen.getByLabelText(/image url/i), {
      target: { value: newProduct.imageUrl }
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /add product/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/products',
        newProduct
      );
    });
  });

  test('handles editing product', async () => {
    render(<ProductManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Edit'));
    });

    const updatedProduct = {
      ...mockProducts[0],
      name: 'Updated Product Name'
    };

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: updatedProduct.name }
    });

    axios.put.mockResolvedValueOnce({ data: updatedProduct });

    fireEvent.click(screen.getByRole('button', { name: /update product/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        `http://localhost:5000/api/products/${mockProducts[0]._id}`,
        expect.objectContaining({
          name: updatedProduct.name
        })
      );
    });
  });

  test('handles deleting product', async () => {
    window.confirm = jest.fn(() => true);
    
    render(<ProductManagement />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Delete'));
    });

    expect(window.confirm).toHaveBeenCalled();

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:5000/api/products/${mockProducts[0]._id}`
      );
    });
  });

  test('handles error when loading products', async () => {
    const errorMessage = 'Failed to load products';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<ProductManagement />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
