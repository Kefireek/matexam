import { useEffect, useState } from 'react';
import axios from 'axios';
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

import AuthAPIService from '../../services/api/auth/AuthAPIService';

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
      AuthAPIService.login(login, password).then((res) => {
        localStorage.setItem("token", res.data.token)
      }
      ).catch((err) => {
        throw err
      })

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
          value={login}
          {...register('login', {
            required: 'To pole jest wymagane',
            minLength: { value: 4, message: 'Minimalna długość powinna wynosić 4' },
          })}
          onChange={ (e) => {setLogin(e.target.value)}}
          marginBottom="1vh"
        />
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
        />
      </FormControl>
      <Button marginBottom="10vh" mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
    </form>
    </Box>
  )
}