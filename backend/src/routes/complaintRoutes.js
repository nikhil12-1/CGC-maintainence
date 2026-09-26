const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const complaintController = require('../controllers/complaintController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads/complaints'),
  filename: (req, file, callback) => callback(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${path.extname(file.originalname).toLowerCase()}`)
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 },
  fileFilter: (req, file, callback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    callback(null, true);
  }
});

router.post('/', requireAuth, upload.array('attachments', 5), complaintController.submitComplaint);
router.get('/mycmp', requireAuth, complaintController.listMyComplaints);
router.get('/stats', requireAuth, require('../controllers/homeController').summary);
router.get('/track/:id', requireAuth, complaintController.getComplaint);
router.get('/track/:id/attachments/:file', requireAuth, complaintController.downloadAttachment);
router.post('/:id/feedback', requireAuth, complaintController.submitFeedback);

module.exports = router;
