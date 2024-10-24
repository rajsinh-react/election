import { useCallback, useState } from 'react'

import { createVoter, createVoterAddress, readVoterApi } from '../../ApiOperetion/voterApi'
import {  Box, Button, Container, Divider, Grid, Grid2, Input, InputLabel, List, ListItem, MenuItem, OutlinedInput, Paper, Select, Tooltip, Typography } from '@mui/material'

import { Link, Element } from 'react-scroll'
import moment from 'moment'
import Alert from '@mui/material/Alert';


import { voterInfoInterface } from '../../../public/interface/voterinfoInter'
import { DetailvoterInfo } from './detailVoterInfoComponent'
import { AddressComponent } from './addressComponet'
import { v4 as uv4 } from 'uuid';
import '../../App.css'



export const DatailPage = () => {
  const [error, setError] = useState(
    {
      prefix: false,
      lastName: false,
      firstName: false,
      age: false,
      age_by_election: false,
      dob: false,
      middelName: false,
      sufix: false,
      gender: false,
      driving_licence: false,
      email: false,
      p_number: false
    }
  )
  const [voterData, setvoterData] = useState<voterInfoInterface>({
    lastName: '',
    firstName: '',
    middleName: '',
    prefix: '',
    sufix: '',
    gender: '',
    age: undefined,
    dob: undefined,
    age_by_election: undefined,
    email: '',
    driving_licence: undefined,
    signature: false,
    p_number: undefined
  })
  const[alert,setAlert]= useState({ open: false, message: '', severity: '' })


  const [address, setAddress] = useState({
    user_id: '',
    street_number: '',
    suffix_a: '',
    suffix_b: '',
    street_address: '',
    unit_type: '',
    unit_number: '',
    address_line2: '',
    city: '',
    state: '',
    zip_5: '',
    zip_4: '',
  })


  let currentDate: any = new Date()
  currentDate = moment(currentDate).format('YYYY-MM-DD')

// check Detail true or false
  const voterinfo = useCallback(() => {
    return Object.values(voterData).every((data) => data)
  }
    , [voterData])

// check address true or false
  const addressCheck = useCallback(() => {
    return Object.values(address).every((data) => data)
  }, [address])

  console.log('voterinfo :', voterinfo(), 'addresscheck:  ', addressCheck())


   // stroe voter detail in voterData
  const handlevoter = (e) => {
    try {
      setvoterData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      console.log(e.target.name, e.target.value)

      console.log(voterData)
    }
    catch (error) {
      console.log(error, 'error in voter  info')
    }
  }


  //store address in address
  const handleAddress = (e) => {
    try {
      address.user_id = voterData.driving_licence
      setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
      console.log(address)
    }
    catch (error) {
      console.log(error, 'error in address')
    }
  }


  // for validation
  const validateFields = () => {

    const email = voterData.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validEmail = emailRegex.test(email)
    console.log(validEmail)

    const newErrors = {}
    newErrors.prefix = !voterData.prefix
    newErrors.firstName = !voterData.firstName
    newErrors.lastName = !voterData.lastName
    newErrors.middelName = !voterData.middleName
    newErrors.p_number = !voterData.p_number
    newErrors.sufix = !voterData.sufix
    newErrors.gender = !voterData.gender
    newErrors.driving_licence = !voterData.driving_licence
    newErrors.email = !voterData.email
    newErrors.dob = !voterData.dob

    if (voterData.firstName?.length < 3) {
      newErrors.firstName = true
    }

    if (voterData.lastName?.length < 3) {
      newErrors.lastName = true
    }

    if (voterData.middleName?.length < 3) {
      newErrors.middleName = true
    }
    if (voterData.driving_licence?.length !== 6) {
      newErrors.driving_licence = true
    }
    if (voterData.p_number?.length !== 10) {
      newErrors.p_number = true
    }

    if (!(emailRegex?.test(email))) {
      newErrors.email = true
    }

    console.log('new errors is', newErrors)
    setError(newErrors)
    console.log(error, "error")
    return Object.values(newErrors).every((error) => !error)
  }




//send data to server
  const addVoter = async (voterData, address) => {
    const voterinformation={...address,...voterData}
    console.log('send data to server',voterinformation)
    try{
      const res = await createVoter(voterinformation)
      console.log('info', res)
  
      if (res.status === 200) {
              {console.log(res.status)}
              setAlert({ open: true, message: 'Voter Add Successful', severity: 'success' })
   
  }}
  catch(error){ 
    if(error.status===400){
      console.log(error.status)
      setAlert({ open: true, message: 'Duplicate Voter Entry', severity: 'error' })
    }
    if(error.status === 500){
      console.log(error.status) 
      setAlert({ open: true, message: 'SomeThing wrong', severity: 'error' })}
    
    }
  

}

  // submit form handle
  const handleForm = async (e) => {
    e.preventDefault()

    const validation = validateFields()

    console.log(validation)
    address.user_id = voterData.driving_licence
    if (validation && voterinfo() && addressCheck()) {
      console.log('voter add')
      return addVoter(voterData, address)
    }
    else {
      setAlert({ open: true, message: 'Required Field Is Empty', severity: 'info' })
    }
  }

  // textField style
  const textFieldStyle = {
    '& .MuiInputBase-input': {
      color: 'wheat',
    },
    label: { color: 'wheat' }
  }
  const inputfield = { borderRadius: 2, height: 25, minWidth: '100% ', minHeight: '10px' }

  const linkTo = [{id:uv4(), to: 'voterinfo', label: 'Voter  Info' },
  {id:uv4() ,to:'address', label: 'Address' }]

  return (
    <>

      <Paper style={{ width: 200, position: 'fixed', minHeight:"870px" ,left: 0, borderRadius: 10 }}  >
        <List style={{ paddingTop: 20, }}  >
          {linkTo.map((current) => {
            return (
              <Box  key={current.id}>

                <ListItem  >               
                  <Link
                    activeClass='active'
                    to={current.to}
                    spy={true}
                    duration={500}
                    smooth={true}
                  >
                    <Typography variant={'body1'} >{current.label}</Typography>
                  </Link>
                </ListItem>
                <Divider />
              </Box>
            )
          })}
        </List>
      </Paper>
      <Paper sx={{
         position: 'relative',
          marginRight:0,marginLeft:28 ,top:0, borderRadius: 5, minWidth:'775px'}}>
      {alert.open && (
        <Alert 
         variant="filled"
        severity={alert.severity} 
        onClose={() => setAlert({ ...alert, open: false })} 
        sx={{
          position:'fixed',
          top:2,
          left:'50%',
        borderRadius:10,
          zIndex:1
        }}
        >
          {alert.message}
        </Alert>
      )}
        <Element name='voterinfo'>
          <DetailvoterInfo
            voterData={voterData}
            setvoterData={setvoterData}
            handlevoter={handlevoter}
            textFieldStyle={textFieldStyle}
            error={error}
            inputfield={inputfield} />
        </Element>

        {/* user address */}

        <Element name='address'>
          <AddressComponent
            address={addVoter}
            inputfield={inputfield}
            handleAddress={handleAddress} />
        </Element>
        <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'transparent',bottom:0}}  >
          <Tooltip title="Add" sx={{ m: 2 }}>
            <Button variant="contained" color="success" onClick={handleForm}>Submit</Button>
          </Tooltip>
          <Tooltip title="Reset" sx={{ m: 2 }}>
            <Button variant="contained" color="success" onClick={() => { window.location.reload() }} >Reset</Button>
          </Tooltip>
        </Box>
      </Paper>
    

    </>

  )
}