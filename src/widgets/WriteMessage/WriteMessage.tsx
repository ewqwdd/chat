import { ChatIcon } from '@chakra-ui/icons'
import { Button, Container, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { ChangeEvent, useCallback, useState } from 'react'
import { useUser } from '../UserContext/useUser'

interface WriteMessageProps {
  path: string
}

export default function WriteMessage({path}: WriteMessageProps) {
    
  const [input, setInput] = useState<string>('')
  const toast = useToast()
  const {user} = useUser()

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }, [])

  const post = useCallback(async() => {
    if (!user || !input) return
    try {
        await axios.post(import.meta.env.VITE_API + path, {
            content: input,
            name: user.name,
            token: user.token
        })
        setInput('')
    } catch(err) {
      console.log(err)
        toast({
            variant: 'error',
            title: 'Error',
            description: 'Something went wrong.',
            isClosable: true
        })
    }
  }, [input, toast, user, path])

  return (
    <Container as='form' display={'grid'} gridTemplateColumns={'1fr auto'} gap={4} padding={'8px 8px 16px 8px'} background={'var(--main-600)'}>
        <Input placeholder='Type a message...' _placeholder={{
            color: 'rgba(255, 255, 255, 0.5)'
        }}
        value={input}
        flexShrink={1}
        onChange={onChange}
        fontSize={'20px'}
        padding={'auto 12px'}
        height={'100%'}
        />
        <Button onClick={post} aspectRatio={'1/1'} height={'100%'} flexGrow={1}>
          <ChatIcon boxSize={'20px'} />
        </Button>
        
      </Container>
  )
}
