const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

// User Registration
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);  // Check what is being received
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate token
    res.json({ token }); // Return the token
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

module.exports = { registerUser, loginUser };

