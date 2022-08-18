import {
  Container,
  Flex,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
  FormControl,
  FormLabel,
  Input,
  Form,
  Field,
  Button,
} from '@chakra-ui/react'

import Navbar from 'components/navbar'
import { useState, useEffect } from 'react'
import { API_URL } from 'lib/api'

const validateInput = (e) => {
  e.preventDefault()

  setName(e.target.fname.value)
  setEmail(e.target.femail.value)

  props.addContact(name, email)
}

const PrivacyPage = () => {
  const [cardData, setCardData] = useState('')

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setCardData((values) => ({ ...values, [name]: value }))
    console.log(cardData);
  }

  return (
    <>
      <Navbar />
      <Container
        flex="1"
        maxW="container.xl"
        px={[6, 12, 16, 32]}
        py="12"
        bg="white"
      >
        <Heading as="h1">Admin Portal</Heading>

        <Heading as="h2" size="lg" mt="4">
          Create Event
        </Heading>
        <form
          // method="post"
          // action={API_URL + '/api/events'}
          // onSubmit={() => setSubmittingForm(true)}
        >
          <FormControl isRequired>
            <FormLabel>Event Name</FormLabel>
            <Input
              placeholder="Event Name"
              name="event_name"
              value={cardData.event_name || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Event Description</FormLabel>
            <Input
              placeholder="Event Description"
              name="event_desc"
              value={cardData.event_desc || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Event Start</FormLabel>
            <Input
              placeholder="Event Start"
              type="datetime-local"
              name="event_start_timestamp"
              value={cardData.event_start_timestamp || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Event End</FormLabel>
            <Input
              placeholder="Event End"
              type="datetime-local"
              name="event_end_timestamp"
              value={cardData.event_end_timestamp || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Latitude</FormLabel>
            <Input
              placeholder="Event Location"
              name="event_lat"
              value={cardData.event_lat || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Longitude</FormLabel>
            <Input
              placeholder="Event Location"
              name="event_lon"
              value={cardData.event_lon || ''}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Max Participants</FormLabel>
            <Input
              placeholder="Max Participants"
              type="number"
              name="event_capacity"
              value={cardData.event_capacity || ''}
              onChange={handleChange}
            />
          </FormControl>
          <Button type='submit' onClick={
            ()=>{
              console.log(cardData);
              fetch(API_URL + '/api/events', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
              })

            }
          }>Submit</Button>
        </form>
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default PrivacyPage
