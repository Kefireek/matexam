import { useForm } from 'react-hook-form'
import {
  Heading,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

  function onSubmit() {
    
  }

  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl width="20vw">
        <Heading marginBottom="2vh">Logowanie</Heading>
        <FormLabel htmlFor='login'>Login</FormLabel>
        <Input
          id='login'
          placeholder='login'
          {...register('login', {
            required: 'To pole jest wymagane',
            minLength: { value: 4, message: 'Minimalna długość powinna wynosić 4' },
          })}
          marginBottom="1vh"
        />
        <FormLabel htmlFor='password'>Hasło</FormLabel>
        <Input
          id='password'
          placeholder='hasło'
          {...register('password', {
            required: 'To pole jest wymagane',
            minLength: { value: 4, message: 'Minimalna długość powinna wynosić 4' },
          })}
        />
      </FormControl>
      <Button marginBottom="10vh" mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </Box>
  )
}