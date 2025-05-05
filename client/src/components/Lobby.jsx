import {
  Box,
  VStack,
  Heading,
  Text,
  Spinner,
  Button,
  useClipboard,
  useToast
} from '@chakra-ui/react'

function Lobby({ roomId, playerName }) {
  const { hasCopied, onCopy } = useClipboard(roomId)
  const toast = useToast()

  const handleCopy = () => {
    onCopy()
    toast({
      title: 'Room code copied!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
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
      <VStack spacing={6}>
        <Heading size="md">Waiting for opponent...</Heading>
        
        <VStack spacing={4} w="100%">
          <Text>Share this room code with your friend:</Text>
          <Button
            onClick={handleCopy}
            colorScheme="blue"
            size="lg"
            width="100%"
          >
            {hasCopied ? 'Copied!' : roomId}
          </Button>
        </VStack>

        <VStack spacing={2}>
          <Text>Players in lobby:</Text>
          <Text fontWeight="bold">{playerName}</Text>
        </VStack>

        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </VStack>
    </Box>
  )
}

export default Lobby 