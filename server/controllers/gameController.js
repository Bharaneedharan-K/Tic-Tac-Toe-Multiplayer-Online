import { createGame, getGame, updateGame, deleteGame, getAllGames } from '../models/gameModel.js';
import { checkWinner } from '../utils/checkWinner.js';

export function handleCreateRoom(socket, io, playerName) {
  const roomId = Math.floor(100000 + Math.random() * 900000).toString();
  const player = { id: socket.id, name: playerName, symbol: 'X' };
  const game = createGame(roomId, player);

  socket.join(roomId);
  socket.emit('roomCreated', { roomId, playerName });
}

export function handleJoinRoom(socket, io, { roomId, playerName }) {
  const game = getGame(roomId);
  if (!game) return socket.emit('error', 'Room not found');
  if (game.players.length >= 2) return socket.emit('error', 'Room is full');

  const player = { id: socket.id, name: playerName, symbol: 'O' };
  game.players.push(player);
  game.status = 'playing';
  updateGame(roomId, game);

  socket.join(roomId);
  socket.emit('roomJoined', { roomId });

  io.to(roomId).emit('gameStart', game);
}

export function handleMakeMove(socket, io, { roomId, index }) {
  const game = getGame(roomId);
  if (!game) return socket.emit('error', 'Game not found');
  if (game.status !== 'playing') return socket.emit('error', 'Game is not in playing status');

  const player = game.players.find(p => p.id === socket.id);
  if (!player) return socket.emit('error', 'Player not in game');
  if (player.symbol !== game.currentTurn) return socket.emit('error', 'Not your turn');
  if (game.board[index] !== null) return socket.emit('error', 'Cell already occupied');

  game.board[index] = player.symbol;
  game.currentTurn = game.currentTurn === 'X' ? 'O' : 'X';

  const winner = checkWinner(game.board);
  if (winner) {
    game.status = 'finished';
    game.winner = winner;
  } else if (game.board.every(cell => cell !== null)) {
    game.status = 'draw';
  }

  updateGame(roomId, game);
  io.to(roomId).emit('gameUpdate', game);
}

export function handlePlayAgain(socket, io, { roomId }) {
  const game = getGame(roomId);
  if (!game) return socket.emit('error', 'Game not found');

  game.board = Array(9).fill(null);
  game.currentTurn = 'X';
  game.status = 'playing';
  game.winner = null;

  updateGame(roomId, game);
  io.to(roomId).emit('gameReset', game);
}

export function handleDisconnect(socket, io) {
  const allGames = getAllGames();
  for (const [roomId, game] of allGames.entries()) {
    const index = game.players.findIndex(p => p.id === socket.id);
    if (index !== -1) {
      game.players.splice(index, 1);
      if (game.players.length === 0) {
        deleteGame(roomId);
      } else {
        io.to(roomId).emit('playerDisconnected');
      }
    }
  }
}
