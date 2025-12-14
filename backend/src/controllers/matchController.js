const Match = require('../models/Match');

// @desc    Get match by ID
// @route   GET /api/matches/:id
// @access  Private
exports.getMatchById = async (req, res) => {
    try {
        const matchId = req.params.id;
        const userId = req.user.id;

        const match = await Match.findById(matchId)
            .populate('helperId', 'name profileImage city email')
            .populate('receiverId', 'name profileImage city email');

        if (!match) {
            return res.status(404).json({ message: 'Match not found' });
        }

        // Security check: Ensure the user is part of this match
        if (match.helperId._id.toString() !== userId && match.receiverId._id.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to view this match' });
        }

        res.json(match);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
