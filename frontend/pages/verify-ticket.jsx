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

const VerifyTicket = () => {
  const [cardData, setCardData] = useState('')

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setCardData((values) => ({ ...values, [name]: value }))
    console.log(cardData)
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
          Validate Tickets
        </Heading>
        <form
        // method="post"
        // action={API_URL + '/api/events'}
        // onSubmit={() => setSubmittingForm(true)}
        >
          <FormControl isRequired>
            <FormLabel> Ticket ID </FormLabel>
            <Input
              placeholder=""
              name="event_code"
              value={cardData.event_code || ''}
              onChange={handleChange}
            />
          </FormControl>

          <Button
            onClick={() => {
              console.log(cardData)
              fetch(API_URL + '/api/verify', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(cardData),
              })
                .then((response) => response.json())
                .then((response) => {
                  console.log(response)
                  response.ticket_used
                    ? alert('Ticket already used')
                    : alert('Ticket is valid and unused')
                })
                .catch((e) => {
                  console.log(e)
                  alert('Invalid Ticket')
                })
            }}
          >
            Submit
          </Button>
        </form>
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default VerifyTicket
