// Import required modules
const app = require('./app'); // Adjust the path if needed

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

// Load environment variables from config file
dotenv.config({ path: './config.env' });

// MongoDB connection string
const connectionString =
  'mongodb+srv://user123:user123@mongopartik.noweicc.mongodb.net/your-database';

// Connect to MongoDB using mongoose
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the mongoose connection object
const db = mongoose.connection;

// Event listener for MongoDB connection error
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Event listener for successful MongoDB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set the port for the application, default to 3000 if not provided in the environment
const port = process.env.PORT || 3000;

// Start the application server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // Assuming 'server' is your HTTP server object, close it gracefully
  server.close(() => {
    process.exit(1);
  });
});
