const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true 
  },
  passwordHash: { 
    type: String, 
    required: true,
    select: false // Ensures password isn't sent to frontend by default
  },
  role: { 
    type: String, 
    enum: ['receiver', 'helper', 'admin'], 
    default: 'receiver' 
  },
  
  // Common Profile Info
  bio: { type: String, maxlength: 500 },
  city: { type: String, required: true },
  profileImage: { type: String }, // URL from Cloudinary/S3

  // Helper Specific Data (Only used if role is 'helper')
  helperProfile: {
    skills: [{ type: String }],    // e.g. ["Coding", "Math"]
    resources: [{ type: String }], // e.g. ["Books", "Money"]
    isAvailable: { type: Boolean, default: true }
  },

  // Receiver Specific Data (Only used if role is 'receiver')
  receiverProfile: {
    needs: [{ type: String }] // e.g. ["Education", "Food"]
  },

  isVerified: { type: Boolean, default: false },
}, { 
  timestamps: true 
});

module.exports = mongoose.model('User', userSchema);