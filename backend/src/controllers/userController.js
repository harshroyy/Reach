const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate a Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, city } = req.body;

    if (!name || !email || !password || !city) {
      return res.status(400).json({ message: 'Please add all fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      passwordHash: hashedPassword,
      role: role || 'receiver',
      city
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        city: user.city,
        role: user.role,
        // Send empty defaults so frontend doesn't break
        bio: user.bio,
        headline: user.headline,
        profileImage: user.profileImage,
        socials: user.socials,
        helperProfile: user.helperProfile,
        receiverProfile: user.receiverProfile,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Login a user
// @route   POST /api/users/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check for email
    const user = await User.findOne({ email }).select('+passwordHash');

    // 2. Check if user exists AND password matches
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      
      // --- THE FIX IS HERE ---
      // We must send back ALL profile data, otherwise the frontend 
      // thinks it's empty when you log in.
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        city: user.city, // Include City
        role: user.role,
        bio: user.bio, // Include Bio
        headline: user.headline, // Include Headline
        profileImage: user.profileImage, // Include Image
        socials: user.socials, // Include Socials
        helperProfile: user.helperProfile, // Include Skills
        receiverProfile: user.receiverProfile, // Include Needs
        token: generateToken(user._id)
      });
      // -----------------------

    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all helpers
// @route   GET /api/users/helpers
exports.getHelpers = async (req, res) => {
  try {
    const helpers = await User.find({ role: 'helper' }).select('-passwordHash');
    res.json(helpers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update User Profile
// @route   PUT /api/users/profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // 1. Update Common Fields
      user.name = req.body.name || user.name;
      user.city = req.body.city || user.city;
      user.bio = req.body.bio || user.bio;
      user.headline = req.body.headline || user.headline;
      user.profileImage = req.body.profileImage || user.profileImage;

      // 2. Update Socials
      if (req.body.socials) {
        if (!user.socials) user.socials = {};
        user.socials.github = req.body.socials.github;
        user.socials.linkedin = req.body.socials.linkedin;
        user.socials.twitter = req.body.socials.twitter;
        user.markModified('socials');
      }

      // 3. Update Password
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(req.body.password, salt);
      }

      // 4. Update Role-Specific Data
      if (user.role === 'helper') {
        if (!user.helperProfile) user.helperProfile = {};
        if (req.body.skills) user.helperProfile.skills = req.body.skills;
        if (req.body.isAvailable !== undefined) user.helperProfile.isAvailable = req.body.isAvailable;
        user.markModified('helperProfile');
      }
      else if (user.role === 'receiver') {
        if (!user.receiverProfile) user.receiverProfile = {};
        if (req.body.needs) user.receiverProfile.needs = req.body.needs;
        user.markModified('receiverProfile');
      }

      // 5. Save
      const updatedUser = await user.save();

      // 6. Respond
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        city: updatedUser.city,
        role: updatedUser.role,
        bio: updatedUser.bio,
        headline: updatedUser.headline,
        profileImage: updatedUser.profileImage,
        socials: updatedUser.socials,
        helperProfile: updatedUser.helperProfile,
        receiverProfile: updatedUser.receiverProfile,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};