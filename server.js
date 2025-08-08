const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Routes
app.get('/', (req, res) => {
  res.render('index.html');
});

// Store active users and messages
const users = new Map(); // socket.id -> user data
const messages = [];
const MAX_MESSAGES = 100; // Maximum number of messages to keep in history

// Helper function to get user by socket ID
const getUser = (socketId) => users.get(socketId);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  // Handle new user joining
  socket.on('userJoined', (username) => {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      socket.emit('error', 'Nome de usuário inválido');
      return;
    }

    // Store user data
    users.set(socket.id, {
      id: socket.id,
      username: username.trim(),
      joinedAt: new Date()
    });

    // Notify all clients about the new user
    io.emit('userConnected', {
      userId: socket.id,
      username: username.trim(),
      timestamp: new Date()
    });

    // Send message history to the new user
    socket.emit('previousMessages', messages);
  });

  // Handle new messages
  socket.on('sendMessage', (data) => {
    const user = getUser(socket.id);
    if (!user || !data || !data.text || typeof data.text !== 'string' || data.text.trim() === '') {
      socket.emit('error', 'Mensagem inválida');
      return;
    }

    const message = {
      id: uuidv4(),
      author: user.username,
      authorId: socket.id,
      text: data.text.trim(),
      timestamp: new Date()
    };

    // Add to message history
    messages.push(message);
    
    // Limit message history
    if (messages.length > MAX_MESSAGES) {
      messages.shift();
    }

    // Broadcast to all connected clients
    io.emit('newMessage', message);
  });

  // Handle typing indicator
  socket.on('typing', () => {
    const user = getUser(socket.id);
    if (user) {
      socket.broadcast.emit('userTyping', {
        username: user.username,
        userId: socket.id
      });
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = getUser(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('userDisconnected', {
        userId: socket.id,
        username: user.username,
        timestamp: new Date()
      });
      console.log(`User disconnected: ${user.username} (${socket.id})`);
    }
  });

  // Error handling
  socket.on('error', (error) => {
    console.error('Socket error:', error);
    socket.emit('error', 'Ocorreu um erro no servidor');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

