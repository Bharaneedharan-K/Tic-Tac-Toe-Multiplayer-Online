const games = new Map();

export const createGame = (roomId, player) => {
  const gameState = {
    players: [player],
    board: Array(9).fill(null),
    currentTurn: 'X',
    status: 'waiting'
  };
  games.set(roomId, gameState);
  return gameState;
};

export const getGame = (roomId) => games.get(roomId);

export const updateGame = (roomId, updatedGame) => games.set(roomId, updatedGame);

export const deleteGame = (roomId) => games.delete(roomId);

export const getAllGames = () => games;
