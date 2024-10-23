import React, { useEffect, useState } from 'react'
import { Box, Button, Container, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { readApi } from '../ApiOperetion/sign_in_api';
import { useNavigate } from 'react-router';



export const Sign_in = () => {

  const [admin, setAdmin] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassWord] = useState('')




  const admins = async () => {
    const res = await readApi()

    setAdmin(res.data)

  }


  useEffect(() => {
    admins()
  }, [])


  const [showPassword, setShowPassWord] = useState(false)

  const handleShowPassword = (event) => {
    event.preventDefault()
    setShowPassWord(!showPassword)


  }
  const isUser = () => {
    console.log(admin)
    const found = admin.find((admin) => admin.user === username && admin.password === password)
    if (found) {
      window.location.href = '/search';
    }
    else {
      return alert('invalid username or password')
    }
  }
  // textField style
  // const textFieldStyle = {
  //   '& .MuiInputBase-input': {
  //     color: 'wheat',
  //   },
  //   label: { color: 'wheat' }
  // }



  return (
    <>

      <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container maxWidth="xs" sx={{
          padding: 2, backgroundColor: '#fff', borderRadius: 2, background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
        }}>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>Sign In</Typography>
          <TextField
          //    sx={textFieldStyle}
            id="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => { setUserName(e.target.value) }}
            fullWidth
          />
          <TextField
            // sx={textFieldStyle}
            id="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => { setPassWord(e.target.value) }}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleShowPassword}>
                    {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
                  </IconButton>

                </InputAdornment>
              )

            }}
          />

          <Button variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}
            onClick={isUser}>
            Sign In
          </Button>
        </Container>
      </Box>

    </>

  )
}
