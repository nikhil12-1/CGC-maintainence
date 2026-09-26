require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/db');

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('JWT_SECRET must be set to at least 32 characters');
    await connectDatabase();
    const server = app.listen(port, () => console.log(`Backend server is running on port ${port}`));
    const shutdown = async () => {
      server.close(async () => {
        try { await require('mongoose').disconnect(); process.exit(0); }
        catch (error) { console.error('Shutdown error:', error.message); process.exit(1); }
      });
    };
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (error) {
    console.error(`Unable to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
