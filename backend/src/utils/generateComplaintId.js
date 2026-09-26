const crypto = require('crypto');

const generateComplaintId = () => {
  const year = new Date().getFullYear();
  const suffix = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `CMP-${year}-${suffix}`;
};

module.exports = generateComplaintId;
