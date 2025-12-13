const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please add a name'], 
    trim: true 
  },
  email: { 
    type: String, 
    required: [true, 'Please add an email'], 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['receiver', 'helper', 'admin'], 
    default: 'receiver' 
  },
  
  // --- Profile Info ---
  city: { 
    type: String, 
    required: true 
  },
  headline: { 
    type: String, 
    maxlength: 60, 
    default: '' 
  },
  bio: { 
    type: String, 
    maxlength: 500, 
    default: '' 
  },
  profileImage: { 
    type: String, 
    default: '' 
  }, 
  isVerified: { 
    type: Boolean, 
    default: false 
  },

  // --- SOCIALS (This was missing!) ---
  socials: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  },

  // --- Role Specific Data ---
  helperProfile: {
    skills: [{ type: String }],    
    resources: [{ type: String }], 
    isAvailable: { type: Boolean, default: true }
  },

  receiverProfile: {
    needs: [{ type: String }] 
  }

}, { 
  timestamps: true 
});

// Match Password Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);