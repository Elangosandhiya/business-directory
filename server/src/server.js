const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Test database connection on startup
  await testConnection();

  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(` Business Directory API Server running`);
    console.log(` Port: ${PORT}`);
    console.log(` URL:  http://localhost:${PORT}`);
    console.log(` API:  http://localhost:${PORT}/api/businesses`);
    console.log(`=============================================`);
  });
};

startServer();
