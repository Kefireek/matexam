import { KeyboardEventHandler, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import {
  Heading,
  Box,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

import { AuthService } from '../../services/auth/AuthService';

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm()

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = () =>{
      AuthService.login(login, password).then((succed) => {
        if(succed) navigate("/")
      }).catch((err) => {
        throw err
      })
  }

  const handleKeyPress = (e : KeyboardEventHandler<HTMLInputElement>) => {
    if(e.key === 'Enter'){
      onSubmit();
    }
  }


  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)} className='block' style={{display: 'block', width: '20vw'}}>
        <Heading marginBottom="2vh">Logowanie</Heading>
        <FormControl>
          <FormLabel htmlFor='login'>Login</FormLabel>
          <Input
            id='login'
            placeholder='login'
            value={login}
            {...register('login', {
              required: 'To pole jest wymagane',
              minLength: { value: 4, message: 'Minimalna długość powinna wynosić 4' },
            })}
            onChange={ (e) => {setLogin(e.target.value)}}
            marginBottom="1vh"
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='password'>Hasło</FormLabel>
          <Input
            id='password'
            placeholder='hasło'
            type="password"
            value={password}
            {...register('password', {
              required: 'To pole jest wymagane',
              minLength: { value: 4, message: 'Minimalna długość powinna wynosić 4' },
            })}
            onChange={ (e) => {setPassword(e.target.value)}}
            onKeyDown={handleKeyPress}
          />
        </FormControl>
        <Button id="submitBtn" marginBottom="10vh" mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
          Zaloguj się
        </Button>
      </form>
    </Box>
  )
}