import React from 'react'
import { Box, Button, Text, useToast } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { InputField } from './atoms/InputField';
import { SelectInputField } from './atoms/selectInputField';
import { checkPostCode } from './untils/postCodeChecker';
import { STATES } from './constances';



export default function PostCodeForm() {
  const toast = useToast()

  return (
    <Box maxW={800} margin={'auto'}>
      <Formik
        initialValues={{
          postCode: 0,
          suburb: "",
          state: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          fetch(`http://localhost:5000/postcode/search.json?q=${values.suburb}&state=${values.state}`)
            .then(response => response.json())
            .then(data => {
              toast({
                title: "Post Box Search Result",
                description: checkPostCode(values, data),
                status: "info",
                duration: 5000,
                isClosable: true,
              })
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Text fontSize={'4xl'}>Aus Post Code Checker</Text>
            <Box mt={4}>
              <SelectInputField name="state" placeholder="Enter State Here" label="State" required options={STATES} />
            </Box>
            <Box mt={4}>
              <InputField name="suburb" placeholder="Enter Suburb Here" label="Suburb" required />
            </Box>
            <Box mt={4}>
              <InputField name="postCode" placeholder="Enter Post Code Here" label="Post Code" required type="number" />
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
