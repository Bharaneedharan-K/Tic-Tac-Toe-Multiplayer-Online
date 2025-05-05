import {
  Box,
  Grid,
  GridItem,
  Text,
  VStack,
  Button,
  useToast
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { keyframes } from '@emotion/react'

const MotionGridItem = motion(GridItem)

const popIn = keyframes`
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
`

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const symbolColors = {
  X: 'blue.400',
  O: 'red.400',
}

function Game({ gameState, playerName, onMakeMove, onPlayAgain }) {
  const toast = useToast()

  if (!gameState) {
    return <Text>Loading game...</Text>
  }

  const handleCellClick = (index) => {
    if (gameState.status !== 'playing') {
      toast({
        title: "Game not active",
        description: "The game is not in playing status.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const currentPlayer = gameState.players.find(p => p.name === playerName);
    if (!currentPlayer) {
      toast({
        title: "Error",
        description: "Player not found in game.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (currentPlayer.symbol !== gameState.currentTurn) {
      toast({
        title: "Not your turn",
        description: "Please wait for your turn.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (gameState.board[index] !== null) {
      toast({
        title: "Invalid move",
        description: "This cell is already occupied.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onMakeMove(index);
  }

  const getStatusMessage = () => {
    if (gameState.status === 'finished') {
      const winner = gameState.players.find(p => p.symbol === gameState.winner);
      if (winner.name === playerName) {
        return 'You won! 🎉';
      }
      return 'You lost! 😢';
    }
    if (gameState.status === 'draw') {
      return 'Game ended in a draw! 🤝';
    }
    const currentPlayer = gameState.players.find(p => p.symbol === gameState.currentTurn);
    if (currentPlayer.name === playerName) {
      return 'Your turn! ✨';
    }
    return `${currentPlayer.name}'s turn...`;
  }

  const getCellColor = (cell) => {
    if (!cell) return 'white';
    return cell === 'X' ? 'blue.50' : 'red.50';
  }

  const getCellTextColor = (cell) => {
    if (!cell) return 'gray.400';
    return symbolColors[cell];
  }

  return (
    <Box
      w={{ base: '95vw', sm: '400px' }}
      maxW="400px"
      p={{ base: 4, sm: 8 }}
      bg="whiteAlpha.900"
      borderRadius="2xl"
      boxShadow="2xl"
      border="1px solid"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH={{ base: 'auto', sm: '600px' }}
    >
      <VStack spacing={6} w="100%">
        <Text
          fontSize={{ base: 'lg', sm: 'xl' }}
          fontWeight="extrabold"
          color={gameState.status === 'playing' ? "blue.500" : "gray.600"}
          textAlign="center"
          sx={{
            animation: gameState.status === 'playing' ? `${bounce} 2s infinite` : 'none',
            letterSpacing: '0.5px',
          }}
        >
          {getStatusMessage()}
        </Text>

        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={3}
          w="100%"
          maxW="320px"
          mx="auto"
        >
          {gameState.board.map((cell, index) => (
            <MotionGridItem
              key={index}
              w={{ base: '70px', sm: '100px' }}
              h={{ base: '70px', sm: '100px' }}
              bg={getCellColor(cell)}
              border="2px"
              borderColor={cell ? getCellTextColor(cell) : "gray.200"}
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize={{ base: '2xl', sm: '4xl' }}
              fontWeight="bold"
              color={getCellTextColor(cell)}
              cursor={gameState.status === 'playing' && cell === null ? 'pointer' : 'default'}
              _hover={
                gameState.status === 'playing' && cell === null
                  ? {
                      bg: 'gray.100',
                      transform: 'scale(1.05)',
                      transition: 'all 0.2s',
                    }
                  : {}
              }
              onClick={() => handleCellClick(index)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              whileHover={gameState.status === 'playing' && cell === null ? { scale: 1.05 } : {}}
              whileTap={gameState.status === 'playing' && cell === null ? { scale: 0.95 } : {}}
              boxShadow={cell ? 'md' : 'sm'}
            >
              {cell}
            </MotionGridItem>
          ))}
        </Grid>

        <VStack spacing={2} w="100%" align="start">
          <Text fontWeight="bold" color="gray.600">Players:</Text>
          {gameState.players.map((player) => (
            <Box key={player.id} display="flex" alignItems="center" gap={2}>
              <Box w="10px" h="10px" borderRadius="full" bg={symbolColors[player.symbol]} />
              <Text
                color={player.symbol === gameState.currentTurn ? symbolColors[player.symbol] : "gray.500"}
                fontWeight={player.symbol === gameState.currentTurn ? "bold" : "normal"}
                fontSize="md"
              >
                {player.name} ({player.symbol})
                {player.name === playerName && ' (You)'}
              </Text>
            </Box>
          ))}
        </VStack>

        {(gameState.status === 'finished' || gameState.status === 'draw') && (
          <Button
            colorScheme="blue"
            size="lg"
            onClick={onPlayAgain}
            sx={{
              animation: `${popIn} 0.5s ease-out`,
              boxShadow: 'lg',
            }}
            _hover={{ transform: 'scale(1.05)', bg: 'blue.600' }}
            _active={{ transform: 'scale(0.95)', bg: 'blue.700' }}
            mt={4}
            w="100%"
          >
            Play Again
          </Button>
        )}
      </VStack>
    </Box>
  )
}

export default Game 