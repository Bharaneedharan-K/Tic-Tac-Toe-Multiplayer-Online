import { useState, useEffect } from 'react'
import { ChakraProvider, Box, VStack, Heading, useToast } from '@chakra-ui/react'
import io from 'socket.io-client'
import NameInput from './components/NameInput'
import Home from './components/Home'
import Game from './components/Game'
import Lobby from './components/Lobby'

// Create socket instance with reconnection options
// const socket = io('http://localhost:3001', {
const socket = io('https://tic-tac-toe-multiplayer-online-server.onrender.com', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000
});

function App() {
  const [playerName, setPlayerName] = useState('')
  const [roomId, setRoomId] = useState('')
  const [gameState, setGameState] = useState(null)
  const [currentScreen, setCurrentScreen] = useState('name-input')
  const [isConnected, setIsConnected] = useState(false)
  const toast = useToast()

  useEffect(() => {
    // Connection event handlers
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to the game server. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsConnected(false);
    });

    socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      setIsConnected(false);
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        socket.connect();
      }
      toast({
        title: "Disconnected",
        description: "Lost connection to the game server. Attempting to reconnect...",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    });

    // Game event handlers
    socket.on('roomCreated', ({ roomId }) => {
      console.log('Room created with ID:', roomId);
      setRoomId(roomId);
      setCurrentScreen('lobby');
    });

    socket.on('roomJoined', ({ roomId }) => {
      console.log('Joined room with ID:', roomId);
      setRoomId(roomId);
      setCurrentScreen('game');
    });

    socket.on('gameStart', (gameData) => {
      console.log('Game started with data:', gameData);
      setGameState(gameData);
      setCurrentScreen('game');
    });

    socket.on('gameUpdate', (gameData) => {
      console.log('Game updated with data:', gameData);
      setGameState(gameData);
    });

    socket.on('error', (message) => {
      console.error('Received error:', message);
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });

    socket.on('playerDisconnected', () => {
      toast({
        title: "Player Disconnected",
        description: "The other player has left the game.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setCurrentScreen('home')
      setGameState(null)
    })

    socket.on('gameReset', (gameData) => {
      console.log('Game reset with data:', gameData);
      setGameState(gameData);
    });

    // Cleanup function
    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('disconnect');
      socket.off('roomCreated');
      socket.off('roomJoined');
      socket.off('gameStart');
      socket.off('gameUpdate');
      socket.off('error');
      socket.off('playerDisconnected');
      socket.off('gameReset');
    }
  }, [toast])

  const handleNameSubmit = (name) => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please wait for connection to the server before continuing.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setPlayerName(name)
    setCurrentScreen('home')
  }

  const handleCreateRoom = () => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please wait for connection to the server before creating a room.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    socket.emit('createRoom', playerName)
  }

  const handleJoinRoom = (roomCode) => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please wait for connection to the server before joining a room.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log('Joining room:', roomCode);
    socket.emit('joinRoom', { roomId: roomCode, playerName });
  }

  const handleMakeMove = (index) => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please wait for connection to the server before making a move.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!roomId) {
      toast({
        title: "Error",
        description: "Room ID not found. Please try rejoining the game.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log('Making move in room:', roomId, 'at index:', index);
    socket.emit('makeMove', { roomId, index });
  }

  const handlePlayAgain = () => {
    if (!isConnected) {
      toast({
        title: "Connection Error",
        description: "Please wait for connection to the server before starting a new game.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log('Starting new game in room:', roomId);
    socket.emit('playAgain', { roomId });
  };

  const renderScreen = () => {
    if (!isConnected) {
      return (
        <Box
          w="100%"
          maxW="400px"
          p={8}
          bg="white"
          borderRadius="lg"
          boxShadow="lg"
        >
          <VStack spacing={6}>
            <Heading size="md">Connecting to server...</Heading>
          </VStack>
        </Box>
      );
    }

    switch (currentScreen) {
      case 'name-input':
        return <NameInput onSubmit={handleNameSubmit} />
      case 'home':
        return <Home onCreateRoom={handleCreateRoom} onJoinRoom={handleJoinRoom} />
      case 'lobby':
        return <Lobby roomId={roomId} playerName={playerName} />
      case 'game':
        return (
          <Game
            gameState={gameState}
            playerName={playerName}
            onMakeMove={handleMakeMove}
            onPlayAgain={handlePlayAgain}
          />
        )
      default:
        return null
    }
  }

  return (
    <ChakraProvider>
      <Box
        minH="100vh"
        minW="100vw"
        bgGradient="linear(to-br, #f8fafc, #e0e7ef, #f1f5f9)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Heading
          mb={8}
          fontSize={{ base: '2xl', md: '4xl' }}
          fontWeight="extrabold"
          bgGradient="linear(to-r, blue.400, pink.400)"
          bgClip="text"
          textAlign="center"
          letterSpacing="wide"
          dropShadow="md"
        >
          Tic Tac Toe
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="1"
          w="100vw"
          h="100vh"
        >
          {renderScreen()}
        </Box>
      </Box>
    </ChakraProvider>
  )
}

export default App
