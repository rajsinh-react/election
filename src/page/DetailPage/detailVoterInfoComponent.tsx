import { Paper, Grid, InputLabel, Select, MenuItem, Typography, OutlinedInput, Divider, Box, Container } from '@mui/material'
import moment from 'moment'
import React from 'react'
import Checkbox from '@mui/joy/Checkbox'
import { calculteAge } from '../../../public/functions/calculteAge'

export const DetailvoterInfo = ({ voterData, setvoterData, handlevoter, textFieldStyle, error, inputfield }) => {
    // // date of birth varification

    const handleDob = (e) => {
        const v_dob = e.target.value
        const date = moment(v_dob).format('YYYY-MM-DD')
        const c_date = new Date()
        const c_date1 = moment(c_date).format('YYYY-MM-DD')

        const voterAge = calculteAge(date)
        console.log(voterAge, 'in function')

        const checkDate = moment(date).isBefore(c_date1)
        console.log(checkDate)

        if (checkDate) {
            setvoterData((prev) => ({ ...prev, dob: date })),
                setvoterData((prev) => ({ ...prev, age: voterAge }))
            if (voterAge > 18) {
                setvoterData((prev) => ({ ...prev, age_by_election: voterAge }))
            }
            else {
                setvoterData((prev) => ({ ...prev, age_by_election: 18 }))
            }
        }
        else {
            alert('Please enter a valid date of birth')
            error.dob = true
        }

    }
    return (
        <>      
                <Typography variant='h6'
                    pt={2}
                    ml={2}

                    color='#0073E6'
                >Voter Info </Typography>
                <Divider />
                <Grid container spacing={3} justifyContent={'start'} pl={2} pt={1}>


                    <Grid item xs={2.3} >
                        <InputLabel >Prefix</InputLabel>
                        <Select name="prefix"
                            value={voterData.prefix}
                            onChange={handlevoter}
                            error={!!error.prefix}
                            sx={{ borderRadius: 2, width: '100%', height: 25 }} >
                            <MenuItem value="Mr.">Mr.</MenuItem>
                            <MenuItem value="Mrs.">Mrs.</MenuItem>
                            <MenuItem value="Miss">Miss</MenuItem>
                        </Select>
                        {
                            !!error.prefix && <Typography variant='body2' color='error'>
                                required field
                            </Typography>

                        }


                    </Grid>
                    {/* lastName */}
                    <Grid item xs={2.3}>
                        <InputLabel >LastName</InputLabel>
                        <OutlinedInput sx={inputfield}
                            name="lastName"
                            value={voterData.lastName}
                            onChange={handlevoter}
                            style={{ minWidth: '100%', }}
                            error={!!error.lastName}
                        />
                        {
                            !!error.lastName && <Typography variant='body2' color='error'>
                                enter lastName
                            </Typography>
                        }


                    </Grid >
                    {/* firstName */}
                    <Grid item xs={2.3}>
                        <InputLabel >FirstName</InputLabel>
                        <OutlinedInput sx={inputfield}
                            name="firstName"
                            value={voterData.firstName}
                            onChange={handlevoter}
                            style={{ minWidth: '100%', minHeight: '10px' }}
                            error={!!error.firstName} />
                        {error.firstName &&
                            <Typography variant='body1' color='error'>
                                enter firstName
                            </Typography>
                        }
                    </Grid >

                    {/* middleName */}
                    <Grid item xs={2.3}>
                        <InputLabel >MiddleName</InputLabel>
                        <OutlinedInput
                            name="middleName"
                            sx={inputfield}
                            value={voterData.middleName}
                            onChange={handlevoter}
                            // style={{ minWidth: '100% ', minHeight: '10px' }}
                            required
                            error={!!error.middelName} />
                        {error.middelName && <Typography variant='body2' color='error'> enter middleName</Typography>}
                    </Grid >

                    {/* suffix */}
                    <Grid item xs={2.3}>

                        <InputLabel>
                            Suffix
                        </InputLabel>
                        <Select
                            name="sufix"
                            value={voterData.sufix}
                            onChange={handlevoter}
                            style={{ minWidth: '100%' }}
                            sx={inputfield}
                            error={!!error.sufix}
                        >
                            <MenuItem value="senior">sr.</MenuItem>
                            <MenuItem value="junior">jr.</MenuItem>
                        </Select>
                        {error.sufix && <Typography variant='body2' color='error'>required</Typography>}
                    </Grid >

                    {/* gender */}
                    <Grid item xs={2.3}>
                        <InputLabel> Gender</InputLabel>
                        <Select name="gender"
                            value={voterData.gender}
                            onChange={handlevoter}
                            style={{ minWidth: '100%' }}
                            sx={inputfield}
                            required >
                            <MenuItem value="" ></MenuItem>
                            <MenuItem value="male">male</MenuItem>
                            <MenuItem value="female">female</MenuItem>
                            <MenuItem value="other">other</MenuItem>
                        </Select>
                        {error.gender && <Typography variant='body2' color='error'> required</Typography>}

                    </Grid >

                    {/* date of  birth */}
                    <Grid item xs={2.3}>
                        <InputLabel>Date of Birth</InputLabel>

                        <OutlinedInput sx={inputfield}
                            type="date"
                            name="dob"

                            value={voterData.dob}
                            onChange={handleDob}
                            style={{ width: '100%' }}
                            error={!!error.dob} />
                        {error.dob && <Typography variant='body2' color='error'> enter Date Of Birth</Typography>}
                    </Grid >


                    <Grid item xs={2.3}>
                        <InputLabel >Age </InputLabel>
                        <OutlinedInput sx={inputfield}
                            type="number"
                            name="age"
                            value={voterData.age}
                            style={{ width: '100%' }}
                        />

                    </Grid >

                    {/* Age by Election Date */}
                    <Grid item xs={2.3}>
                        <InputLabel >Age by Election Date</InputLabel>
                        <OutlinedInput sx={inputfield}
                            type="number"
                            name="age_by_election"
                            value={voterData.age_by_election}
                            error={!!error.age_by_election} />
                        {error.age_by_election && <Typography variant='body2' color='error'>enter valid age</Typography>}
                    </Grid >

                    {/*  Signature*/}
                    <Grid item xs={2.3}>
                        <InputLabel>Signature</InputLabel>
                        <Checkbox
                            name='signature'
                            checked={voterData.signature}
                            onChange={(e) => {
                                setvoterData({ ...voterData, signature: e.target.checked })
                            }}
                        />
                    </Grid >

                    <Grid item xs={2.3}>
                        <InputLabel  >
                            Registration Date
                        </InputLabel>
                        <OutlinedInput   sx={inputfield}  style={{ width: '100%' }} type="date" name=" Registration Date"
                        />
                    </Grid >

                    <Grid item xs={2.3}>
                        <InputLabel 
                        >
                            Registration type
                        </InputLabel>
                        <OutlinedInput 
                        sx={inputfield} 
                        type="text"
                         name="Registration type"
                        />
                    </Grid >
                </Grid>

                {/* Us citizen */}
                <Grid container spacing={2} p={2}>
                    <Grid item xs={2.3}>
                        <Checkbox label='Us Citizen' />
                    </Grid>
                    <Grid item xs={2.3}>
                        <InputLabel >
                            Last 4 of SSN
                        </InputLabel>
                        <OutlinedInput sx={inputfield} type="text" name="ssn"
                            //  value={driving_licence} onChange={(e) => { setlicence(e.target.value) }} 
                            required />
                    </Grid >
                    <Grid item xs={2.3}>
                        <InputLabel >
                            Driving license
                        </InputLabel>
                        <OutlinedInput sx={inputfield}
                            type="text"
                            name="driving_licence"
                            value={voterData.driving_licence}
                            onChange={handlevoter}
                            error={!!error.driving_licence} />
                        {error.driving_licence && <Typography variant='body2' color='error'> enter valid driving licence number</Typography>}

                    </Grid >


                </Grid>

                {/* PRoof of Id Provided */}
                <Grid container spacing={2} p={2}>
                    <Grid item xs={2.3}>
                        <Checkbox label='Proof of ID Provided ' />
                    </Grid>
                    <Grid item xs={2.3}>
                        <InputLabel >
                            Type of Identification
                        </InputLabel>
                        <OutlinedInput sx={inputfield}
                            type="text"
                            name='driving_licence'
                            value={voterData.driving_licence}
                            onChange={handlevoter}
                        />
                    </Grid >
                    <Grid item xs={2.3}>
                        <InputLabel >
                            Identification Number
                        </InputLabel>
                        <OutlinedInput sx={inputfield} type="number" name="Identification Number"
                        //  value={driving_licence} onChange={(e) => { setlicence(e.target.value) }}
                        />
                    </Grid >
                </Grid>

                {/* Application Did Not Provide Diver'Licence , State ID or SSN  */}
                <Grid p={2}>
                    <Checkbox label="Application Did Not Provide Diver'Licence , State ID or SSN " />
                </Grid>

                <Box
                 sx={{
                    display:'flex',
                    justifyContent:'flex-start',
                     paddingBottom:2 ,
                     paddingLeft:2,
                     gap:2} }  >
                    <Box>
                    <InputLabel >
                        Email
                    </InputLabel>
                    <OutlinedInput sx={inputfield}
                        type="email"
                        name="email"
                        value={voterData.email}
                        onChange={handlevoter}
                        error={!!error.email} />
                    {error.email &&
                        <Typography variant='body2' color='error'>
                            entere valid email
                        </Typography>}
                        </Box>
                                   {/* phone number */}
               <Box>
                <InputLabel >
                    Phone Number
                </InputLabel>
                <OutlinedInput
                    sx={inputfield}
                    type="number"
                    name="p_number"              
                    value={voterData.p_number}
                    onChange={handlevoter}
                    required
                    error={!!error.p_number}
                />
                {error.p_number && <Typography variant='body2' color='error'>enter valid phone number</Typography>}


                </Box>
                        </Box >
     


     

        </>
    )
}
