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
import { FaTwitter, FaLinkedin, FaFirefoxBrowser } from 'react-icons/fa'
import LoggedInControls from 'components/loggedin-controls'
// import LoggedOutControls from 'components/loggedout-controls'
export default function Event({
  isAdmin,
  eventId,
  name,
  imageLink,
  eventDetails,
  remainingSeats,
  totalSeats,
  eventStartTime,
  eventEndTime,
  latitude,
  longitude,
  hasRegistered,
  slotClash,
  session,
  ticket
}) {


  return (
    <Box
      h="504px"
      bg="#FFFFFF"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >

      <Box m="1rem">
        <Stack>
          <Heading>{name}</Heading>
          <Text>{eventDetails}</Text>
          <HStack>
            <Text>{new Date(eventStartTime).toLocaleString()}</Text>
            <Text> to </Text>
            <Text>{new  Date(eventEndTime).toLocaleString()}</Text>
          </HStack>
          <Flex>
            <Text>Lat: { latitude }</Text>
            <Spacer></Spacer>
            <Text>Lon: {longitude }</Text>

          </Flex>
          
          <Text color={"pink"}> {ticket?"Ticket:":""} {ticket}</Text>
          <Progress
            colorScheme="green"
            size="md"
            value={(remainingSeats * 100) / totalSeats}
          />
          {(remainingSeats * 100) / totalSeats > 90 ? (
            <Text color={'red'}>
               {totalSeats - remainingSeats} seats left
            </Text>
          ) : (
            ''
          )}
          
          {session?            
              <LoggedInControls 
                eventId={eventId}
                isAdmin={isAdmin} 
                hasRegistered={hasRegistered} 
                slotClash={slotClash}
                isFull={totalSeats==remainingSeats}></LoggedInControls>
                :""
            
              
          }
          

        </Stack>
      </Box>
    </Box>
  )
}
