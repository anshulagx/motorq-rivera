import React from 'react'
import {
  Box,
  Flex,
  Spacer,
  Circle,
  Center,
  Image,
  Button,
  Link,
  Text,
  Stack,
  Progress,
  Heading,
  HStack,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { API_URL } from 'lib/api'
import { session } from 'next-auth/client'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

const LoggedInControls = ({ eventId, slotClash, hasRegistered, isFull }) => {
  const [session, loading] = useSession()
  const router = useRouter()
  const toast = useToast()

  return hasRegistered ? (
    <Button
      isFullWidth
      colorScheme="red"
      onClick={() => {
        console.log({
          user_id: session.user.userId,
          event_id: eventId,
        })
        fetch(API_URL + '/api/deregister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: session.user.userId,
            event_id: eventId,
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            router.reload(window.location.pathname)
            console.log(response.data)
          })
      }}
    >
      Deregister
    </Button>
  ) : slotClash ? (
    <Button isFullWidth colorScheme="yellow" isDisabled>
      Slot Clash
    </Button>
  ) : (
    <Button
      isFullWidth
      colorScheme="green"
      isDisabled={isFull}
      onClick={() => {
        console.log('aaa', eventId)
        console.log(session.user)
        let url = API_URL + '/api/events/' + eventId
        console.log(url)
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: session.user.userId,
          }),
        })
          .then((response) => {
            console.log(response)
            return response.json()
          })
          .then((response) => {
            console.log('ABCD')
            console.log(response.error)
            if (response.error)
              toast({
                title: response.error,
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
            else
            toast({
              title: "Registered",
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          })
          .catch((e) => {
            console.log('err', e)
          })
      }}
    >
      Register
    </Button>
  )
}

export default LoggedInControls
