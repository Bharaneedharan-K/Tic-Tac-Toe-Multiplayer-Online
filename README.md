
# Tic-Tac-Toe Online Multiplayer Game

This is a real-time, multiplayer Tic-Tac-Toe game built with WebSockets. Players can create rooms, join existing ones, and compete against each other in a turn-based game. The game board automatically updates in real-time using Socket.io for two-way communication.

## Features:
- **Real-time multiplayer**: Players can join a room and play against each other in real-time.
- **Room-based play**: Players can create or join rooms with unique codes.
- **Winner detection**: The game automatically checks for a winner after each move.
- **Game reset**: Players can restart the game after it ends.
- **Responsive UI**: The game is optimized for both desktop and mobile screens.

## Technologies Used:

### Frontend:
- **React**: For building the user interface of the game.
- **Socket.io-client**: To connect to the WebSocket server and handle real-time communication.
- **Vite**: A fast build tool for modern web projects (used for development and bundling).
- **CSS**: For styling the UI.

### Backend:
- **Node.js**: JavaScript runtime to run the server.
- **Express**: Web framework for handling HTTP requests.
- **Socket.io**: To enable real-time, bidirectional communication between the server and clients.
- **In-memory storage**: Using a Map to store active games in memory.

### Hosting:
- **Frontend**: Hosted on [Vercel](https://vercel.com/).
- **Backend**: Hosted on [Render](https://render.com/).

## Setup Instructions:

### 1. Clone the repository:

```bash
https://github.com/Bharaneedharan-K/Tic-Tac-Toe-Multiplayer-Online.git
cd tic-tac-toe-online-multiplayer-game
```

### 2. Frontend (React App)
Navigate to the `frontend` folder and install dependencies:

```bash
cd client
npm install
```

Run the frontend app:

```bash
npm run dev
```

This will start the React app on `http://localhost:3000`.

### 3. Backend (Node.js/Express Server)
Navigate to the `backend` folder and install dependencies:

```bash
cd server
npm install
```

Start the backend server:

```bash
npm stare
```

This will start the server on `http://localhost:3001`.

### 5. Run the Application
Once both the frontend and backend servers are running, open the frontend in your browser (`http://localhost:3000`). You can then create or join rooms to start a game!

## Deployment:

### Frontend:
The frontend is deployed to Vercel, and you can access the live version of the game here: [Tic-Tac-Toe Live](https://tic-tac-toe-online-multiplayer-game.vercel.app/).

### Backend:
The backend is deployed to Render, and you can access the live backend here: [Backend Render URL](https://tic-tac-toe-multiplayer-online-server.onrender.com/).

## Contribution
Feel free to fork this project and submit pull requests. Contributions are always welcome!

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- **Socket.io**: For real-time communication.
- **React**: For the easy-to-build user interface.
- **Vercel**: For fast and seamless deployment of the frontend.
- **Express.js**: For the server-side logic.
