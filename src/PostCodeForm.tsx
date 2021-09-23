import React from 'react'
import { Box, Button, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from './atoms/InputField';

export default function PostCodeForm() {
  return (
    <Box maxW={800} margin={'auto'}>
      <Formik
        initialValues={{
          postCode: "",
          suburb: "",
          state: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values)
          fetch(`https://digitalapi.auspost.com.au/postcode/search.json?q=Melbourne&state=VIC`, {
            mode: 'no-cors',
            headers: {
              'auth-key': '872608e3-4530-4c6a-a369-052accb03ca8',
              'Accept': '*/*',
            }
          }).then(response => response.json()).then(data => console.log(data));
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text fontSize={'4xl'}>Aus Post Code Checker</Text>
            <Box mt={4}>
              <InputField name="state" placeholder="Enter State Here" label="State" required />
            </Box>
            <Box mt={4}>
              <InputField name="suburb" placeholder="Enter Suburb Here" label="Suburb" required />
            </Box>
            <Box mt={4}>
              <InputField name="postCode" placeholder="Enter Post Code Here" label="Post Code" required />
            </Box>
            <Box mt={4}>
              <Button mt={4} type="submit" bgColor={'teal'} variant="solid" isLoading={isSubmitting}>Check Post Code</Button>
            </Box>
          </Form>
        )}
      </Formik >
    </Box >
  )
}
