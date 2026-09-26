const mongoose = require('mongoose');
const complaintService = require('../services/complaintService');
const path = require('path');

const submitComplaint = async (req, res, next) => {
  try {
    const requiredFields = ['category', 'subject', 'description', 'location', 'priority'];
    const missingField = requiredFields.find((field) => req.body[field] === undefined || req.body[field] === '');
    if (missingField) return res.status(400).json({ success: false, message: `${missingField} is required` });

    const complaint = await complaintService.createComplaint(req.user._id, req.body, req.files);
    res.status(201).json({ success: true, message: 'Complaint submitted successfully', data: complaint });
  } catch (error) {
    next(error);
  }
};

const listMyComplaints = async (req, res, next) => {
  try {
    const result = await complaintService.getMyComplaints(req.user._id, req.query);
    res.json({ success: true, message: 'Complaints fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};

const getComplaint = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id) && !/^CMP-\d{4}-[A-F0-9]{8}$/i.test(req.params.id)) return res.status(404).json({ success: false, message: 'Complaint not found' });
    const complaint = await complaintService.getOwnedComplaint(req.params.id, req.user._id);
    res.json({ success: true, message: 'Complaint fetched successfully', data: complaint });
  } catch (error) {
    next(error);
  }
};

const submitFeedback = async (req, res, next) => {
  try {
    const { rating, comment = '' } = req.body;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be an integer from 1 to 5' });
    }
    if (!mongoose.isValidObjectId(req.params.id) && !/^CMP-\d{4}-[A-F0-9]{8}$/i.test(req.params.id)) return res.status(404).json({ success: false, message: 'Complaint not found' });

    const complaint = await complaintService.addFeedback(req.params.id, req.user._id, { rating, comment });
    res.json({ success: true, message: 'Feedback submitted successfully', data: complaint });
  } catch (error) {
    next(error);
  }
};

const downloadAttachment = async (req, res, next) => {
  try {
    const complaint = await complaintService.getOwnedComplaint(req.params.id, req.user._id);
    const attachment = complaint.attachments.find((item) => path.basename(item.path) === req.params.file);
    if (!attachment) return res.status(404).json({ success: false, message: 'Attachment not found' });
    res.sendFile(path.resolve(__dirname, '../../uploads/complaints', path.basename(attachment.path)));
  } catch (error) { next(error); }
};

module.exports = { submitComplaint, listMyComplaints, getComplaint, submitFeedback, downloadAttachment };
