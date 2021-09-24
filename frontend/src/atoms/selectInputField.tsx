import React from 'react'
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'
import { useField } from 'formik'
import { InputHTMLAttributes } from 'react'

// any normal input value props + making
type SelectInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  placeholder: string;
  name: string;
  required?: boolean;
  options: { display: string, value: string }[]
}

export const SelectInputField: React.FC<SelectInputFieldProps> = ({ label, required, size, options, ...props }) => {
  const [field, { error }] = useField(props);
  return (
    // `!!error` converts empty string to boolean
    <FormControl isInvalid={!!error} isRequired={required}>
      <FormLabel htmlFor={props.name}>{label}</FormLabel>
      <Select {...field} placeholder="Select option">
        {options.map(option => <option key={option.value} value={option.value}>{option.display}</option>)}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
