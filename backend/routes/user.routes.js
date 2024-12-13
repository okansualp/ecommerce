const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { adminMiddleware } = require('../middleware/auth.middleware');

// Get all users (Admin only)
router.get('/', adminMiddleware, async (req, res) => {
  try {
    const { search, role, status, sort, page = 1, limit = 10 } = req.query;
    const query = {};

    // Search
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filters
    if (role) query.role = role;
    if (status) query.status = status;

    // Pagination
    const skip = (page - 1) * limit;

    // Sort options
    const sortOptions = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    }

    const users = await User.find(query)
      .select('-password')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create user (Admin only)
router.post('/', adminMiddleware, async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User(req.body);
    await user.save();

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update user (Admin only)
router.put('/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user (Admin only)
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle user status (Admin only)
router.patch('/:id/toggle-status', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = user.status === 'active' ? 'suspended' : 'active';
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate user report (Admin only)
router.get('/report', adminMiddleware, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -__v')
      .lean();

    // Generate CSV
    const fields = ['name', 'email', 'role', 'status', 'lastLogin', 'createdAt'];
    const csv = [
      fields.join(','),
      ...users.map(user => 
        fields.map(field => 
          typeof user[field] === 'string' 
            ? `"${user[field]}"` 
            : user[field] instanceof Date 
              ? user[field].toISOString() 
              : user[field]
        ).join(',')
      )
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users-report.csv');
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
