import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { registerSocketHandlers } from './socket/socketHandler.js';
import './keepAlive.js'; // ✅ ADD THIS LINE

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

registerSocketHandlers(io);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
