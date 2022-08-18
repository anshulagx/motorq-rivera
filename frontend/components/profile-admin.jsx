import React from 'react'
import { Box,Flex,Spacer, Circle, Center, Image, Button, Link, Text, Stack, Progress, Heading, HStack } from '@chakra-ui/react'
import { FaTwitter, FaLinkedin, FaFirefoxBrowser } from 'react-icons/fa'
export default function Profile({ name, profileLink, imageLink, eventDetails,remainingSeats, totalSeats, eventStartTime, eventEndTime,eventLocation, hasRegistered, slotClash }) {
  // function getIcon() {
  //   switch (socialType) {
  //     case 'twitter':
  //       return <FaTwitter />
  //     case 'linkedin':
  //       return <FaLinkedin />
  //     case 'website':
  //       return <FaFirefoxBrowser />
  //     default:
  //       return null
  //   }
  // }

  return (
    <Box
      h="504px"
      bg="#FFFFFF"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Center p="2.5rem">
        <Circle size="140px" borderWidth="3px" borderColor="green">
          <Image src={imageLink} borderRadius="50%" />
        </Circle>
      </Center>
      <Box m="1rem">
        <Stack>
        <Heading>{name}</Heading>
        <Text>{eventDetails}</Text>
        <HStack> 
          <Text>{eventStartTime}</Text>
          <Text> to </Text>
          <Text>{eventEndTime}</Text>
        </HStack>
        <Flex>
        <Text>{eventLocation}</Text> 
        <Spacer></Spacer>
        <Button>Map</Button>

        </Flex>
        <Progress colorScheme='green' size='md' value={remainingSeats*100/totalSeats} />
        {remainingSeats*100/totalSeats>90 ? 
          <Text color={"red"}> {totalSeats-remainingSeats} seats left</Text>
        :""}
        
        { hasRegistered ?       
        <Button
        isFullWidth
        colorScheme="red"
        onClick={() => {
          window.open(profileLink, '_blank')
        }}
      >
        Deregister
      </Button>
      :
      slotClash ?
      <Button
      isFullWidth
      colorScheme="yellow"
      isDisabled
    >
      Slot Clash
    </Button>
  :
         <Button
         isFullWidth
         colorScheme="green"
         onClick={() => {
           window.open(profileLink, '_blank')
         }}
       >
         Register
       </Button>
      }
        
        </Stack>

        
      </Box>
    </Box>
  )
}
