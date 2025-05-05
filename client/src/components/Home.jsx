import { useState } from 'react'
import {
  Box,
  Button,
  VStack,
  Heading,
  Input,
  useToast,
  Text
} from '@chakra-ui/react'

function Home({ onCreateRoom, onJoinRoom }) {
  const [roomCode, setRoomCode] = useState('')
  const toast = useToast()

  const handleJoinRoom = (e) => {
    e.preventDefault()
    if (roomCode.trim().length < 6) {
      toast({
        title: 'Invalid room code',
        description: 'Please enter a valid 6-character room code',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    onJoinRoom(roomCode.trim())
  }

  return (
    <Box
      w="100%"
      maxW="400px"
      p={8}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
    >
      <VStack spacing={8}>
        <Heading size="md">Welcome to Tic Tac Toe</Heading>
        
        <VStack spacing={4} w="100%">
          <Button
            colorScheme="blue"
            size="lg"
            width="100%"
            onClick={onCreateRoom}
          >
            Create New Game
          </Button>
          
          <Text color="gray.600" textAlign="center">
            - or -
          </Text>
          
          <form onSubmit={handleJoinRoom} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <Input
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                size="lg"
                maxLength={6}
              />
              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                width="100%"
              >
                Join Game
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>
    </Box>
  )
}

export default Home 