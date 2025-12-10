const mongoose = require('mongoose');
const HelpRequest = require('../models/HelpRequest');
const Match = require('../models/Match');
const User = require('../models/User');

// @desc    Create a new help request
// @route   POST /api/requests
// @access  Private (Receiver only)
exports.createRequest = async (req, res) => {
  try {
    const { helperId, category, reason, details } = req.body;
    
    // req.user.id comes from the 'protect' middleware
    const receiverId = req.user.id; 

    // 1. Basic validation
    if (helperId === receiverId) {
      return res.status(400).json({ msg: 'You cannot request help from yourself' });
    }

    // 2. Check if a pending request already exists to this specific helper
    const existingRequest = await HelpRequest.findOne({
      receiverId,
      helperId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ msg: 'You already have a pending request with this helper' });
    }

    // 3. Create Request
    const newRequest = await HelpRequest.create({
      receiverId,
      helperId,
      category,
      reason,
      details
    });

    res.status(201).json(newRequest);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Accept a request (Creates a Match)
// @route   PUT /api/requests/:id/accept
// @access  Private (Helper only)
exports.acceptRequest = async (req, res) => {
  // We use a Session to make sure both actions (Update Request + Create Match) happen together or not at all.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const requestId = req.params.id;
    const helperId = req.user.id; // The logged-in user

    // 1. Find the request
    const request = await HelpRequest.findOne({ _id: requestId, helperId }).session(session);

    if (!request) {
      await session.abortTransaction();
      return res.status(404).json({ msg: 'Request not found or you are not the helper' });
    }

    if (request.status !== 'pending') {
      await session.abortTransaction();
      return res.status(400).json({ msg: 'Request is already processed' });
    }

    // 2. Create the Match
    const newMatch = await Match.create([{
      requestId: request._id,
      helperId: request.helperId,
      receiverId: request.receiverId,
      status: 'active'
    }], { session });

    // 3. Update Request status to 'accepted'
    request.status = 'accepted';
    request.matchId = newMatch[0]._id;
    await request.save({ session });

    // 4. Commit (Save) everything
    await session.commitTransaction();
    session.endSession();

    // Notify the user (We will add Socket.io here later!)
    res.json({ msg: 'Request accepted', match: newMatch[0] });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// @desc    Get requests for current user
// @route   GET /api/requests/my-requests
exports.getMyRequests = async (req, res) => {
  try {
    const role = req.user.role;
    let requests;

    if (role === 'helper') {
      // If I am a helper, show me people asking ME for help
      requests = await HelpRequest.find({ helperId: req.user.id })
        .populate('receiverId', 'name city email') // Get sender details
        .sort({ createdAt: -1 });
    } else {
      // If I am a receiver, show me requests I SENT
      requests = await HelpRequest.find({ receiverId: req.user.id })
        .populate('helperId', 'name city')
        .sort({ createdAt: -1 });
    }

    res.json(requests);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};