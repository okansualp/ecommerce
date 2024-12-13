const express = require('express');
const router = express.Router();
const Settings = require('../models/setting.model');
const { adminMiddleware } = require('../middleware/auth.middleware');

// Get settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    // If no settings exist, create default settings
    if (!settings) {
      settings = await Settings.create({
        siteName: 'Admin Panel',
        description: 'A powerful admin panel for your business',
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
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update settings (Admin only)
router.put('/', adminMiddleware, async (req, res) => {
  try {
    let settings = await Settings.findOne();

    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }

    await settings.save();
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Reset settings to default (Admin only)
router.post('/reset', adminMiddleware, async (req, res) => {
  try {
    await Settings.deleteOne();
    
    const defaultSettings = new Settings({
      siteName: 'Admin Panel',
      description: 'A powerful admin panel for your business',
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
    });

    await defaultSettings.save();
    res.json(defaultSettings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available themes
router.get('/themes', async (req, res) => {
  try {
    const themes = [
      {
        id: 'light',
        name: 'Light Theme',
        description: 'Clean and bright theme for better readability'
      },
      {
        id: 'dark',
        name: 'Dark Theme',
        description: 'Easy on the eyes, perfect for night time'
      },
      {
        id: 'vintage',
        name: 'Vintage Theme',
        description: 'Classic retro look with modern functionality'
      }
    ];

    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available languages
router.get('/languages', async (req, res) => {
  try {
    const languages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' }
    ];

    res.json(languages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get available currencies
router.get('/currencies', async (req, res) => {
  try {
    const currencies = [
      { code: 'USD', symbol: '$', name: 'US Dollar' },
      { code: 'EUR', symbol: '€', name: 'Euro' },
      { code: 'GBP', symbol: '£', name: 'British Pound' },
      { code: 'JPY', symbol: '¥', name: 'Japanese Yen' }
    ];

    res.json(currencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
