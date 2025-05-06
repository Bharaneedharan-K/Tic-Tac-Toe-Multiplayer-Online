# 🕹️ Tic-Tac-Toe Online Multiplayer Game — Project Summary

This project is a **real-time, online multiplayer Tic-Tac-Toe game** that allows two players to connect remotely using a room code and play against each other interactively. It uses **WebSocket communication** to handle real-time updates and a responsive, intuitive interface similar to chat-based apps (like WhatsApp).

---

## ✅ Key Features

- 🔁 **Real-Time Gameplay** – Smooth two-way game play using WebSockets.
- 👥 **Room-Based Game Sessions** – Unique room codes let players create/join private game rooms.
- 🧠 **Winner and Draw Detection** – Automatically checks win or draw after every move.
- ⏳ **Countdown Before Start** – Once two players are in the room, a 3-second countdown begins.
- 🔄 **Game Restart Support** – After a win or draw, players can restart the game instantly.
- 📱 **Responsive UI** – Works great on both desktop and mobile screens.

---

## 🧱 Project Architecture

### 🔹 Frontend

- **Framework**: React
- **Bundler**: Vite (for fast development and builds)
- **Communication**: Socket.IO Client for real-time WebSocket communication
- **Routing**: React state management and page flow logic
- **Styling**: Clean CSS with a layout inspired by messaging apps (split view: user list + game board)
- **Main Pages**:
  - Home: Choose to Create or Join a room
  - Create Room: Display generated code, wait for another player
  - Join Room: Enter room code to join an existing game
  - Game Board: Show board, moves, turns, and result notifications

### 🔹 Backend

- **Runtime**: Node.js
- **Framework**: Express.js (lightweight HTTP server)
- **WebSockets**: Socket.IO Server
- **Game State Storage**:  
  - Uses **`Map`** (native JavaScript object) to store:
    - Room IDs
    - Player sockets
    - Game board data
    - Turn info and winner status
  - Chosen for simplicity and speed — no external database is required
- **Winner/Draw Logic**: Implemented server-side for security and fairness
- **Event Handling**:
  - `createRoom`, `joinRoom`, `makeMove`, `restartGame`, `disconnect`

---

## ☁️ Hosting

| Layer     | Platform  | URL |
|-----------|-----------|-----|
| **Frontend** | Vercel | [https://tic-tac-toe-online-multiplayer-game.vercel.app](https://tic-tac-toe-online-multiplayer-game.vercel.app) |
| **Backend** | Render  | _Your backend Render URL here_ |

---

## ⚙️ Technologies Used

| Layer        | Tools/Tech |
|--------------|------------|
| **Frontend** | React, Vite, CSS, Socket.IO Client |
| **Backend**  | Node.js, Express, Socket.IO Server, JavaScript `Map` (for in-memory storage) |
| **Hosting**  | Vercel (Frontend), Render (Backend) |

---

## 💡 Why These Technologies?

| Technology | Purpose |
|------------|---------|
| **React** | To build a modular, component-based frontend UI |
| **Vite** | For fast dev server and lightning-fast builds |
| **Socket.IO** | Enables real-time bidirectional communication between clients and server |
| **Express** | Handles lightweight server logic and HTTP layer |
| **Node.js** | Runs the backend using JavaScript on the server |
| **Map (JavaScript)** | Efficient in-memory storage for managing room/game state without database latency |
| **Vercel & Render** | Simplifies deployment for frontend (Vercel) and backend (Render) with free tiers |

---

## 🧪 Use Case

- Great example of real-time multiplayer logic using WebSockets.
- Clean UI design suitable for portfolio or demonstrating frontend/backend integration.
- Scalable pattern — the game logic can later be extended to add leaderboard, authentication, or persistent storage.