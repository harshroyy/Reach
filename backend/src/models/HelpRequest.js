const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  receiverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  helperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  
  category: { type: String, required: true }, // e.g. "Education"
  reason: { type: String, required: true, maxlength: 150 }, // Short title
  details: { type: String, maxlength: 2000 }, // Full story
  
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'closed'], 
    default: 'pending' 
  },
  
  // Link to the Match if this request was accepted
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' } 
}, { 
  timestamps: true 
});

// Index to quickly find pending requests between two specific people
helpRequestSchema.index({ receiverId: 1, helperId: 1, status: 1 });

module.exports = mongoose.model('HelpRequest', helpRequestSchema);