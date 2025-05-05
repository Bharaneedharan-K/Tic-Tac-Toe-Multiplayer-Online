import { useState } from 'react'
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  useToast
} from '@chakra-ui/react'

function NameInput({ onSubmit }) {
  const [name, setName] = useState('')
  const toast = useToast()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim().length < 2) {
      toast({
        title: 'Invalid name',
        description: 'Please enter a name with at least 2 characters',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    onSubmit(name.trim())
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
        <Heading size="md">Enter Your Name</Heading>
        <Text color="gray.600">This name will be visible to other players</Text>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="lg"
            />
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
            >
              Continue
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  )
}

export default NameInput 