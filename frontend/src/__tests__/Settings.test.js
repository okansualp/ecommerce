import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Settings from '../pages/Settings';
import axios from 'axios';

jest.mock('axios');

describe('Settings', () => {
  const mockSettings = {
    siteName: 'Test Site',
    description: 'Test Description',
    currency: 'USD',
    language: 'en',
    theme: 'light',
    notifications: {
      email: true,
      push: false
    },
    shipping: {
      freeShippingThreshold: 100,
      standardShippingRate: 10
    }
  };

  const mockThemes = [
    { id: 'light', name: 'Light Theme' },
    { id: 'dark', name: 'Dark Theme' }
  ];

  const mockLanguages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' }
  ];

  const mockCurrencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockImplementation((url) => {
      if (url.includes('/settings/themes')) {
        return Promise.resolve({ data: mockThemes });
      }
      if (url.includes('/settings/languages')) {
        return Promise.resolve({ data: mockLanguages });
      }
      if (url.includes('/settings/currencies')) {
        return Promise.resolve({ data: mockCurrencies });
      }
      return Promise.resolve({ data: mockSettings });
    });
  });

  test('renders settings page', async () => {
    render(<Settings />);
    
    await waitFor(() => {
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('General Settings')).toBeInTheDocument();
      expect(screen.getByText('Appearance')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Shipping')).toBeInTheDocument();
    });
  });

  test('loads and displays settings', async () => {
    render(<Settings />);

    await waitFor(() => {
      expect(screen.getByDisplayValue('Test Site')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
      expect(screen.getByDisplayValue('100')).toBeInTheDocument();
      expect(screen.getByDisplayValue('10')).toBeInTheDocument();
    });
  });

  test('handles saving settings', async () => {
    render(<Settings />);

    await waitFor(() => {
      // Change some settings
      fireEvent.change(screen.getByLabelText(/site name/i), {
        target: { value: 'Updated Site Name' }
      });
    });

    axios.put.mockResolvedValueOnce({ data: { ...mockSettings, siteName: 'Updated Site Name' } });

    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/api/settings',
        expect.objectContaining({
          siteName: 'Updated Site Name'
        })
      );
      expect(screen.getByText('Settings saved successfully!')).toBeInTheDocument();
    });
  });

  test('handles resetting settings', async () => {
    window.confirm = jest.fn(() => true);
    
    render(<Settings />);

    await waitFor(() => {
      fireEvent.click(screen.getByText('Reset to Default'));
    });

    expect(window.confirm).toHaveBeenCalled();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/settings/reset'
      );
      expect(screen.getByText('Settings reset to default!')).toBeInTheDocument();
    });
  });

  test('handles error when loading settings', async () => {
    const errorMessage = 'Failed to load settings';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    render(<Settings />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('handles error when saving settings', async () => {
    render(<Settings />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/site name/i), {
        target: { value: 'Updated Site Name' }
      });
    });

    const errorMessage = 'Failed to save settings';
    axios.put.mockRejectedValueOnce(new Error(errorMessage));

    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  test('updates notification settings', async () => {
    render(<Settings />);

    await waitFor(() => {
      const emailCheckbox = screen.getByRole('checkbox', { name: /email notifications/i });
      const pushCheckbox = screen.getByRole('checkbox', { name: /push notifications/i });

      fireEvent.click(emailCheckbox);
      fireEvent.click(pushCheckbox);

      expect(emailCheckbox).not.toBeChecked();
      expect(pushCheckbox).toBeChecked();
    });
  });

  test('updates shipping settings', async () => {
    render(<Settings />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/free shipping threshold/i), {
        target: { value: '200' }
      });
      fireEvent.change(screen.getByLabelText(/standard shipping rate/i), {
        target: { value: '15' }
      });
    });

    axios.put.mockResolvedValueOnce({ 
      data: { 
        ...mockSettings,
        shipping: {
          freeShippingThreshold: 200,
          standardShippingRate: 15
        }
      } 
    });

    fireEvent.click(screen.getByRole('button', { name: /save settings/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:5000/api/settings',
        expect.objectContaining({
          shipping: {
            freeShippingThreshold: 200,
            standardShippingRate: 15
          }
        })
      );
    });
  });
});
