const Complaint = require('../models/Complaint');
exports.summary = async (req, res, next) => {
  try {
    const [total, pending, inProgress, resolved, recent] = await Promise.all([
      Complaint.countDocuments({ user: req.user._id }),
      Complaint.countDocuments({ user: req.user._id, status: { $in: ['Submitted', 'Under Review'] } }),
      Complaint.countDocuments({ user: req.user._id, status: 'In Progress' }),
      Complaint.countDocuments({ user: req.user._id, status: 'Resolved' }),
      Complaint.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(3)
    ]);
    res.json({ success: true, data: { total, pending, inProgress, resolved, resolutionRate: total ? Math.round((resolved / total) * 100) : 0, recent } });
  } catch (error) { next(error); }
};
