// Main Express App entry point

const express = require('express');
const http = require('http'); // Built-in Node module
const socketIo = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars (reads your .env file)
require('dotenv').config();

// 1. Initialize Express and HTTP Server
const app = express();
const server = http.createServer(app);

// 2. Connect to Database
connectDB();

// 3. Setup Middleware (The "Gatekeepers")
app.use(express.json()); // Allows server to accept JSON data
app.use(cors()); // Allows React to connect

// 4. Setup Socket.io (Real-time Chat)
const io = socketIo(server, {
  cors: {
    origin: "*", // Allow all connections for now (easier for dev)
    methods: ["GET", "POST"]
  }
});

// Pass 'io' to every request so controllers can use it later
app.use((req, res, next) => {
  req.io = io;
  next();
});

// 5. Socket Logic (What happens when someone connects)
io.on('connection', (socket) => {
  console.log('A user connected via Socket.io:', socket.id);

  // Join a specific chat room
  socket.on('join_chat', (room) => {
    socket.join(room);
    console.log(`User Joined Room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// 6. Routes (URLs)
// We will uncomment these as we build them!
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/requests', require('./routes/requestRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Simple test route to check if server is working
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 7. Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));