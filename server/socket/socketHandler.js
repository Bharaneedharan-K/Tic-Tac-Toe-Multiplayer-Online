import {
    handleCreateRoom,
    handleJoinRoom,
    handleMakeMove,
    handlePlayAgain,
    handleDisconnect
  } from '../controllers/gameController.js';
  
  export function registerSocketHandlers(io) {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      socket.on('createRoom', (playerName) => handleCreateRoom(socket, io, playerName));
      socket.on('joinRoom', (data) => handleJoinRoom(socket, io, data));
      socket.on('makeMove', (data) => handleMakeMove(socket, io, data));
      socket.on('playAgain', (data) => handlePlayAgain(socket, io, data));
  
      socket.on('disconnect', () => handleDisconnect(socket, io));
    });
  }
  