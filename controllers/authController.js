const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
  const { fullName, company, region, email, password, confirmPassword } = req.body;

  // Validate inputs
  if (!fullName || !region || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please fill in all required fields." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      fullName,
      company,
      region,
      email,
      password: hashedPassword,
    });

    // Respond with the new user's information (excluding password)
    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      company: user.company,
      region: user.region,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, fullName: user.fullName }, process.env.SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};


exports.getAuthenticatedUser = async (req, res) => {
    try {
      const user = await User.findByPk(req.user.id); // Get the user ID from the decoded token
      if (!user) return res.status(404).json({ message: 'User not found.' });
  
      // Respond with user information excluding the password
      res.status(200).json({
        id: user.id,
        fullName: user.fullName,
        company: user.company,
        region: user.region,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

