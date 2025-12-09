const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  matchId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Match', 
    required: true 
  },
  senderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  content: { type: String, required: true },
  
  isRead: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Vital Index: Sort messages by time for a specific match
messageSchema.index({ matchId: 1, createdAt: 1 });

module.exports = mongoose.model('Message', messageSchema);