const Message = require('../models/Message');
const Match = require('../models/Match');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { matchId, content } = req.body;
    const senderId = req.user.id; // From Auth Middleware

    // 1. Verify Match exists
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    // 2. Security Check: Is the sender actually part of this match?
    // We convert IDs to strings to compare them safely
    if (match.helperId.toString() !== senderId && match.receiverId.toString() !== senderId) {
      return res.status(403).json({ msg: 'Not authorized to chat in this match' });
    }

    // Determine who the receiver is
    const receiverId = match.helperId.toString() === senderId 
      ? match.receiverId 
      : match.helperId;

    // 3. Save Message to DB
    const newMessage = await Message.create({
      matchId,
      senderId,
      receiverId,
      content,
      isRead: false
    });

    // 4. Update Match "lastMessage" (for the Inbox preview)
    match.lastMessage = {
      content,
      senderId,
      timestamp: new Date()
    };
    await match.save();

    // 5. REAL-TIME MAGIC: Emit to the specific room
    // The frontend listening on this matchId will receive this instantly
    if (req.io) {
        req.io.to(matchId).emit('receive_message', newMessage);
    }

    res.status(201).json(newMessage);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Get chat history
// @route   GET /api/messages/:matchId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const { matchId } = req.params;
    
    // Check if user belongs to match (Optional security improvement)
    const match = await Match.findById(matchId);
    if (!match) {
        return res.status(404).json({ msg: 'Match not found' });
    }
    
    // Get all messages for this match, sorted by time (oldest first)
    const messages = await Message.find({ matchId }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};