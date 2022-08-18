import * as React from 'react'
import Navbar from 'components/navbar'

// import Map from 'components/map'

import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { API_URL } from 'lib/api'

const fetcher = (...args) => fetch(...args).then((res) => res.json())
import Event from 'components/event'
import {
  Box,
  Container,
  Text,
  Heading,
  Center,
  Image,
  Input,
  Button,
  Flex,
  Spacer,
  HStack,
} from '@chakra-ui/react'

import { SimpleGrid } from '@chakra-ui/react'

import { signIn, signOut, useSession } from 'next-auth/client'
import { useState, useEffect } from 'react'


const AboutPage = ({events}) => {

  const [session, loading] = useSession()
  const userId=session?("/"+session.user.userId):"";
  const url=API_URL+'/api/events'+ userId
  console.log(url);
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>



  const isAdmin = session ? session.user.email === 'ans29hul@gmail.com' : false // TODO: move to env
  return (
    <>
      <Navbar />


      {/* //Events */}
      <Container
        bg="#FAFAFA"
        maxW="container.xl"
        px={{ base: '6', '2xl': '0' }}
        mb="8"
      >
         {/* Admin Controls */}
          {          
            isAdmin ? 
           <Box p="1rem">
            
            <Text>Admin Controls</Text>
            <Flex p="1rem">

            <Button onClick={() => window.open('create-event')}>
              Create Event
            </Button>
            <Spacer></Spacer>
            <Button onClick={() => window.open('verify-ticket')}>
              Verify Ticket
            </Button>
            </Flex>

            </Box>
            :
            ""
            
          }
        <Center>
          <Heading as="h2" size="2xl" p="3rem">
            Upcoming Events
          </Heading>
        </Center>


        <Box>


          <SimpleGrid columns={[1, 2, 3]} spacing="30px">
            {data.map((member, index) => {
              return (
                <>
                  <Event
                    name={member.event_name}
                    profileLink={member.profileLink}
                    imageLink={member.imageLink}
                    key={index}
                    eventDetails={member.event_desc}
                    remainingSeats={member.filled}
                    totalSeats={member.event_capacity}
                    eventStartTime={member.event_start_timestamp}
                    eventEndTime={member.event_end_timestamp}
                    latitude={member.event_lat}
                    longitude={member.event_lon}
                    eventId={member._id}
                    hasRegistered={true}
                    slotClash={member.slotClash}
                    session={session}
                    isAdmin={isAdmin}
                    ticket={member.ticket}
                  />{' '}
                </>
              )
            })}
          </SimpleGrid>
        </Box>
        )
      </Container>



      {/* <Footer /> */}
    </>
  )
}


export default AboutPage
