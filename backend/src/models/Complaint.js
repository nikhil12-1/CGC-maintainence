const mongoose = require('mongoose');

const attachmentSchema = new mongoose.Schema(
  {
    filename: String,
    path: String,
    mimetype: String,
    size: Number
  },
  { _id: false }
);

const feedbackSchema = new mongoose.Schema(
  {
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String, trim: true, maxlength: 1000 },
    submittedAt: Date
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    complaintId: { type: String, required: true, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['Furniture', 'Electrical', 'Plumbing', 'Cleaning', 'AC / Fan', 'IT & Network', 'Civil Maintenance', 'Laboratory', 'Hostel', 'Transport', 'Other']
    },
    subject: { type: String, required: true, trim: true, minlength: 3, maxlength: 150 },
    description: { type: String, required: true, trim: true, minlength: 10, maxlength: 5000 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    priority: { type: String, required: true, enum: ['Low', 'Medium', 'High', 'Urgent'] },
    contactPreference: { type: String, enum: ['email', 'phone', 'none'], default: 'email' },
    status: {
      type: String,
      enum: ['Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected', 'Closed'],
      default: 'Submitted'
    },
    attachments: { type: [attachmentSchema], default: [] },
    resolution: { type: String, trim: true, maxlength: 3000, default: '' },
    feedback: { type: feedbackSchema, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Complaint', complaintSchema);
