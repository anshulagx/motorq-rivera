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
  const [search,setSearch]=useState("");
  const [searchBuffer,setSearchBuffer]=useState("");
  const { data, error } = useSWR(API_URL+'/api/events/?s='+search, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const Map = dynamic(
    () => import('components/map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )
  const [session, loading] = useSession()
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
        <HStack>
        <Input background={"white"} m="2rem" type="search" placeholder="Search Events" value={searchBuffer} onChange={(e)=>{
          setSearchBuffer(e.target.value);
        }}/>
        <Button colorScheme={"blue"} onClick={()=>setSearch(searchBuffer)}> Search </Button>
        </HStack>

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
                    hasRegistered={member.hasRegistered}
                    slotClash={member.slotClash}
                    session={session}
                    isAdmin={isAdmin}
                  />{' '}
                </>
              )
            })}
          </SimpleGrid>
        </Box>
        )
      </Container>

      {/* //about us */}
      {/* <Container
        bg="#FAFAFA"
        maxW="container.xl"
        px={{ base: '6', '2xl': '0' }}
        mb="16"
        centerContent
      >
        <Center>
          <Heading as="h2" size="2xl" pt="3rem" pb="3rem">
            About Us
          </Heading>
        </Center>
        <Center maxW={{ base: '100%', md: '75%' }}>
          <Text
            fontSize="lgs"
            ml={['1rem', '5rem', '7rem']}
            mr={['1rem', '5rem', '7rem']}
            align="center"
          >
            Riviera is this this
          </Text>
        </Center>
      </Container> */}
      <Container>
        <Center>
          <Heading as="h2" size="2xl" pt="3rem" pb="3rem">
            Location
          </Heading>
        </Center>

        <Map x={[1,2,3,4]} y={[2,3,4,5]} ></Map>
      </Container>


      {/* <Footer /> */}
    </>
  )
}

export default AboutPage
