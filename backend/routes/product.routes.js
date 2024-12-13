const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const { adminMiddleware } = require('../middleware/auth.middleware');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search
    if (search) {
      query.$text = { $search: search };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Sort options
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }

    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name');

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      createdBy: req.user._id
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate product report (Admin only)
router.get('/report', adminMiddleware, async (req, res) => {
  try {
    const products = await Product.find()
      .populate('createdBy', 'name')
      .select('-__v');

    // Generate CSV
    const fields = ['name', 'description', 'price', 'category', 'stock', 'createdAt'];
    const csv = [
      fields.join(','),
      ...products.map(product => 
        fields.map(field => 
          typeof product[field] === 'string' 
            ? `"${product[field]}"` 
            : product[field]
        ).join(',')
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=products-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
