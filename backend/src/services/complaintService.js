const Complaint = require('../models/Complaint');
const generateComplaintId = require('../utils/generateComplaintId');
const categoryMap = { cleaning: 'Cleaning', 'ac-fan': 'AC / Fan', 'it-network': 'IT & Network', civil: 'Civil Maintenance', electrical: 'Electrical', plumbing: 'Plumbing', furniture: 'Furniture', laboratory: 'Laboratory', hostel: 'Hostel', transport: 'Transport', other: 'Other' };
const priorityMap = { low: 'Low', medium: 'Medium', high: 'High', urgent: 'Urgent', emergency: 'Urgent' };
async function createComplaint(userId, input, files = []) {
  const categoryKey = String(input.category).toLowerCase(); const priorityKey = String(input.priority).toLowerCase();
  return Complaint.create({ complaintId: generateComplaintId(), user: userId, category: categoryMap[categoryKey] || input.category, subject: input.subject, description: input.description, location: input.location, priority: priorityMap[priorityKey] || input.priority, contactPreference: input.contactPreference || 'email', attachments: files.map((f) => ({ filename: f.originalname, path: `/uploads/complaints/${f.filename}`, mimetype: f.mimetype, size: f.size })) });
}
async function getMyComplaints(userId, query) {
  const page = Math.max(1, parseInt(query.page, 10) || 1); const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 50));
  const filter = { user: userId };
  if (query.status) filter.status = new RegExp(`^${String(query.status).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  if (query.search) { const term = String(query.search).slice(0, 80).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); filter.$or = [{ subject: new RegExp(term, 'i') }, { complaintId: new RegExp(term.slice(0, 40), 'i') }]; }
  const [items, total] = await Promise.all([Complaint.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit), Complaint.countDocuments(filter)]);
  return { items, total, page, pages: Math.ceil(total / limit) };
}
async function getOwnedComplaint(id, userId) { const item = await Complaint.findOne({ user: userId, $or: [{ _id: id.length === 24 ? id : null }, { complaintId: id.toUpperCase() }] }); if (!item) { const e = new Error('Complaint not found'); e.statusCode = 404; throw e; } return item; }
async function addFeedback(id, userId, feedback) {
  const item = await getOwnedComplaint(id, userId);
  if (item.status !== 'Resolved') { const e = new Error('Feedback is available after resolution'); e.statusCode = 400; throw e; }
  if (item.feedback) { const e = new Error('Feedback has already been submitted'); e.statusCode = 409; throw e; }
  item.feedback = { ...feedback, submittedAt: new Date() }; await item.save(); return item;
}
module.exports = { createComplaint, getMyComplaints, getOwnedComplaint, addFeedback };
