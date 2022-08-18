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
import { API_URL } from 'lib/api'
import { useRouter } from 'next/router'


import LoggedInUserControls from "components/loggedin-user-controls"
const LoggedInControls = ({eventId,isAdmin,slotClash,hasRegistered, isFull}) => {
  const router = useRouter()
  return (
    isAdmin ? (
        <HStack>
          <Button
          colorScheme={"red"}
          onClick={()=>{
            fetch(API_URL+'/api/events/'+eventId, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
              })


router.reload(window.location.pathname)
          }}
          >Delete</Button>
          <Button>See Reg Details</Button>
        </HStack>
        
      ) : 
      <LoggedInUserControls eventId={eventId} isFull={isFull} slotClash={slotClash} hasRegistered={hasRegistered}></LoggedInUserControls>
  )
}

export default LoggedInControls