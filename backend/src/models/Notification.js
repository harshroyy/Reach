const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['request_received', 'request_accepted', 'new_message'],
    required: true
  },
  message: { type: String, required: true },
  
  // Generic data payload to help frontend redirect (e.g. { matchId: "123" })
  metadata: { type: Map, of: String },
  
  isRead: { type: Boolean, default: false }
}, { 
  timestamps: true 
});

// Auto-delete notifications after 30 days
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('Notification', notificationSchema);