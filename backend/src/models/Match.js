const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  requestId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'HelpRequest', 
    required: true 
  },
  
  // We duplicate these IDs here for faster queries (no need to populate Request)
  helperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active' 
  },

  // Stores a preview of the last message for the "Inbox" list
  lastMessage: {
    content: String,
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: Date
  }
}, { 
  timestamps: true 
});

// Indexes for "My Matches" queries
matchSchema.index({ helperId: 1, status: 1 });
matchSchema.index({ receiverId: 1, status: 1 });

module.exports = mongoose.model('Match', matchSchema);