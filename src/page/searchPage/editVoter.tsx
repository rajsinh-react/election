import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { findVoter, updateAddress, updateVoter } from '../../ApiOperetion/voterApi';
import { Box, Button, Container, Divider, Grid, InputLabel, MenuItem, OutlinedInput, Paper, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
import moment from 'moment'
import { calculteAge } from '../../../public/functions/calculteAge'
import { voterInfoInterface } from '../../../public/interface/voterinfoInter';



export const EditVoter = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true)
    const [voterdata, setvoterData] = useState<voterInfoInterface>({
        middleName: '',
        lastName: '',
        firstName: '',
        gender: '',
        prefix: '',
        age: undefined,
        age_by_election: undefined,
        dob: undefined,
        sufix: '',

    })

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
        zip_4: ''

    })



    const [errors, setError] = useState({
        lastName: false,
        firstName: false,
        prefix: false,
        age: false,
        age_by_election: false,
        dob: false,
        middelName: false,
        gender: false,
        suffix: false
        
    })




    const getVoter = async () => {
        try {
            const responce = await findVoter(id)
            const db = responce?.data
            setvoterData({
                driving_licence: db[0]?.driving_licence,
                middleName: db[0]?.middleName,
                lastName: db[0]?.lastName,
                firstName: db[0]?.firstName,
                gender: db[0]?.gender,
                prefix: db[0]?.prefix,
                age: db[0]?.age,
                age_by_election: db[0]?.age_by_election,
                dob: db[0]?.dob,
                sufix: db[0]?.sufix,
                signature: db[0]?.signature
            })
            setAddress({
                user_id: db[0]?.user_id,
                street_number: db[0]?.street_number,
                suffix_a: db[0]?.suffix_a,
                suffix_b: db[0]?.suffix_b,
                street_address: db[0]?.street_address,
                unit_type: db[0]?.unit_type,
                unit_number: db[0]?.unit_number,
                address_line2: db[0]?.address_line2,
                city: db[0]?.city,
                state: db[0]?.state,
                zip_5: db[0]?.zip_5,
                zip_4: db[0]?.zip_4
            })

        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getVoter()
        setLoading(false)
    }, [])

    const date = moment(voterdata?.dob).format('YYYY-MM-DD')
    const age = calculteAge(date)

    const fullDate = new Date();
    const c_date = moment(fullDate).format('YYYY-MM-DD')
    

    const validateFields = async () => {
        const newErrors = {};
        newErrors.firstName = !voterdata.firstName;
        newErrors.lastName = !voterdata.lastName;
        newErrors.age = !voterdata.age;
        newErrors.age_by_election = !voterdata.age_by_election;
        newErrors.dob = !voterdata.dob;
        newErrors.middelName = !voterdata.middleName;

        //address
        newErrors.city = !address.city
        newErrors.state = !address.state
        newErrors.streetAddress = !address.street_address
        newErrors.streetNumber = !address.street_number
        newErrors.suffix_a = !address.suffix_a
        newErrors.suffix_b = !address.suffix_b
        newErrors.unitNumber = !address.unit_number
        newErrors.unitType = !address.unit_type
        newErrors.zip_4 = !address.zip_4
        newErrors.zip_5 = !address.zip_5
        newErrors.address2 = !address.address_line2

        if (age < 18) {
            voterdata.age_by_election = 18
        }

        //date of birth vaidation
        if (date > c_date) {
            newErrors.dob = true
        }
        setError(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };



    // send data to server
    const handlevoter = async (e) => {
        e.preventDefault()
        console.log(errors)

        const isValid = await validateFields();
        console.log(isValid)
        if (!isValid) return;
        try {
            const sendData = { ...voterdata, ...address }
            const v_responce = await updateVoter(voterdata.driving_licence, sendData)
            console.log('voter info', v_responce.data)
            // const a_responce = await updateAddress(voterdata.driving_licence, address)
            // console.log('address', a_responce)
            v_responce && alert('Voter and Address updated successfully')
        }
        catch (error) {
            console.log(error)
        }

    }


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
            errors.dob = true
        }

    }


    //for voter data entry
    const handelChangeVoter = async (e) => {
        try {
            setvoterData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))

            if (age > 18 ) {
                setvoterData((prev) => ({ ...prev, age_by_election: age }))
                console.log(voterdata?.age_by_election)
             }
             else {
                setvoterData((prev) => ({ ...prev, age_by_election: 18 }))
                console.log(voterdata?.age_by_election)
             }

        }
        catch (error) {
            console.log('error voter info', error)
        }

    }

    //for address handling
    const handleAddress = (e) => {
        try {
            setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
            console.log(e.target.name, e.target.value)
        }
        catch (error) {
            console.log(error, 'error in adrress')
        }
    }

    // textField style
    // const textFieldStyle = {
    //     '& .MuiInputBase-input': {
    //         color: 'wheat',
    //     },
    //     
    const inputfield = { borderRadius: 2, height: 25, minWidth: '100% ', minHeight: '10px' }

    return (
        <>
            {loading ? (
                <span>Loading...</span>
            ) :
                (
                    <>
                        <Box sx={{ alignItems: 'start', justifyContent: 'space-evenly' }} >

                            <Paper sx={{ margin: 4, borderRadius: 5, minWidth: '1107px' }}  >

                                <Typography color='primary'
                                    ml={2} mt={2}

                                    variant='subtitle1'
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        textDecoration: 'none',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 2,
                                            right: 0,
                                            bottom: -1,
                                            height: '1px',
                                            backgroundColor: 'primary.main',
                                            paddingTop: '1px',
                                        }
                                    }}
                                > voter Detail</Typography>
                                <Divider />

                                <Box sx={{
                                    border: '2px  solid #e8e8e8',
                                    borderRadius: 2,
                                    margin: 2
                                }}>
                                    <Grid container
                                        spacing={3}
                                        justifyContent={'start'}
                                        p={2}
                                    >


                                        <Grid item xs={2.3} >
                                            <InputLabel>Prifix</InputLabel>
                                            <Select
                                                sx={{ borderRadius: 2, width: '100%', height: 25 }}
                                                name="prefix"
                                                value={voterdata?.prefix}
                                                onChange={handelChangeVoter}
                                            >
                                                <MenuItem value="Mr.">Mr.</MenuItem>
                                                <MenuItem value="Mrs.">Mrs.</MenuItem>
                                                <MenuItem value="Miss">Miss</MenuItem>
                                            </Select>
                                            {
                                                !!errors.prefix && <Typography variant='body2' color='error'>
                                                    required field
                                                </Typography>
                                            }
                                        </Grid>
                                        {/* lastName */}
                                        <Grid item xs={2.3}>
                                            <InputLabel >LastName</InputLabel>
                                            <OutlinedInput
                                                sx={inputfield}
                                                error={errors.lastName}
                                                name='lastName'
                                                required={true}
                                                value={voterdata?.lastName}
                                                onChange={handelChangeVoter}




                                            />
                                            {
                                                !!errors.lastName && <Typography variant='body2' color='error'>
                                                    enter lastName
                                                </Typography>
                                            }


                                        </Grid >
                                        {/* firstName */}
                                        <Grid item xs={2.3}>
                                            <InputLabel >FirstName</InputLabel>
                                            <OutlinedInput
                                                sx={inputfield}
                                                onChange={handelChangeVoter}
                                                value={voterdata.firstName}
                                                name='firstName'



                                                error={errors.firstName} />
                                            {errors.firstName &&
                                                <Typography variant='body1' color='error'>
                                                    enter firstName
                                                </Typography>
                                            }
                                        </Grid >

                                        {/* middleName */}
                                        <Grid item xs={2.3}>
                                            <InputLabel >MiddleName</InputLabel>
                                            <OutlinedInput
                                                sx={inputfield}
                                                name='middleName'
                                                value={voterdata?.middleName}
                                                onChange={handelChangeVoter}



                                                error={errors.middelName} />
                                            {errors.middelName && <Typography variant='body2' color='error'> enter middleName</Typography>}
                                        </Grid >

                                        {/* suffix */}
                                        <Grid item xs={2.3}>

                                            <InputLabel>
                                                Suffix
                                            </InputLabel>
                                            <Select
                                                name="sufix"
                                                value={voterdata?.sufix}
                                                onChange={handelChangeVoter}
                                                style={{ minWidth: '100%' }}
                                                sx={inputfield}
                                                error={!!errors.suffix}
                                            >
                                                <MenuItem value="senior">sr.</MenuItem>
                                                <MenuItem value="junior">jr.</MenuItem>
                                            </Select>
                                            {errors.suffix && <Typography variant='body2' color='error'>required</Typography>}
                                        </Grid >

                                        {/* gender */}
                                        <Grid item xs={2.3}>
                                            <InputLabel> Gender</InputLabel>
                                            <Select name="gender"
                                                value={voterdata?.gender}
                                                onChange={handelChangeVoter}
                                                style={{ minWidth: '100%' }}
                                                sx={inputfield}
                                                required >

                                                <MenuItem value="male">male</MenuItem>
                                                <MenuItem value="female">female</MenuItem>
                                                <MenuItem value="other">other</MenuItem>
                                            </Select>
                                            {errors.gender && <Typography variant='body2' color='error'> required</Typography>}

                                        </Grid >

                                        {/* date of  birth */}
                                        <Grid item xs={2.3}>
                                            <InputLabel>Date of Birth</InputLabel>
                                            <OutlinedInput
                                                sx={inputfield}
                                                type='date'
                                                name='dob'
                                                value={date}
                                                onChange={handleDob}



                                                error={errors.dob}
                                            />
                                            {errors.dob && <Typography variant='body2' color='error'> enter Date Of Birth</Typography>}
                                        </Grid >


                                        <Grid item xs={2.3}>
                                            <InputLabel >Age </InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                type='number'
                                                name='age'
                                                value={age}
                                                onChange={handelChangeVoter}

                                                error={errors.age}

                                            />

                                        </Grid >

                                        {/* Age by Election Date */}
                                        <Grid item xs={2.3}>
                                            <InputLabel >Age by Election Date</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                type='number'
                                                name='age_by_election'
                                                value={voterdata.age_by_election}
                                                // onChange={handelChangeVoter}
                                                error={errors.age_by_election}
                                            />
                                            {errors.age_by_election && <Typography variant='body2' color='error'>enter valid age</Typography>}
                                        </Grid >

                                        <Grid item xs={2.3}>
                                            <InputLabel >Driving License</InputLabel>

                                             <Tooltip title="not changeable" arrow>
                                            <OutlinedInput sx={inputfield}

                                                type='number'
                                                name='age_by_election'
                                                value={voterdata?.driving_licence}
                                                
                                                
                                                // onChange={handelChangeVoter}
                                                // error={errors.age_by_election}
                                            />
                                            </Tooltip>
                                            {/* {errors.age_by_election && <Typography variant='body2' color='error'>enter valid age</Typography>} */}
                                        </Grid >

                                    </Grid>
                                </Box>
                            </Paper>
                        

                            {/* addresss */}

                            <Paper sx={{ margin: 4, borderRadius: 5, minWidth: '1107px' }}>
                                <Typography color='primary'
                                    ml={2} mt={2}
                                    variant='subtitle1'
                                    sx={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        textDecoration: 'none',
                                        '&::after': {
                                            content: '""',
                                            position: 'absolute',
                                            left: 2,
                                            right: 0,
                                            bottom: -1,
                                            height: '1px',
                                            backgroundColor: 'primary.main',
                                            paddingTop: '1px',
                                        }
                                    }}
                                > Address</Typography>
                                <Divider />
                                <Box
                                    sx={{
                                        border: ' 2px  solid #e8e8e8',
                                        margin: 2,
                                        borderRadius: 2,

                                    }}>
                                    <Grid container spacing={3}
                                        justifyContent={'start'}
                                        pl={2} pt={1} >
                                        <Grid item xs={2.3} >
                                            <InputLabel>Street Number</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                            type='number'
                                            name='street_number'
                                                value={address?.street_number}
                                                onChange={handleAddress}
                                                
                                              
                                            
                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Suffix A</InputLabel>
                                            <OutlinedInput sx={inputfield}

                                                onChange={handleAddress}
                                                name='suffix_a'
                                                value={address?.suffix_a}
                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Suffix B</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='suffix_b'
                                                value={address?.suffix_b}
                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Street Address/P.O. Box</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='street_address'
                                                value={address?.street_address}


                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Unit Type</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='unit_type'
                                                value={address?.unit_type}

                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Unit Number</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='unit_number'
                                                value={address?.unit_number}
                                            />

                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Address Line 2</InputLabel>
                                            <OutlinedInput sx={inputfield} type="text" name="address_line2" value={address.address_line2} onChange={handleAddress} required />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>City</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='city'
                                                value={address?.city}

                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>State</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                onChange={handleAddress}
                                                name='state'
                                                value={address?.state}

                                            />
                                        </Grid>

                                        <Grid item xs={2.3}>
                                            <InputLabel>Zip 5</InputLabel>
                                            <OutlinedInput sx={inputfield}
                                                type="number"
                                                name="zip_5"
                                                value={address.zip_5}
                                                onChange={handleAddress} />
                                        </Grid>

                                        <Grid item xs={2.3} pb={1}>
                                            <InputLabel>Zip 4</InputLabel>

                                            <OutlinedInput
                                                sx={inputfield}
                                                type="number"
                                                name="zip_4"
                                                value={address.zip_4}
                                                onChange={handleAddress} />
                                        </Grid>

                                    </Grid>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }} >
                            <Tooltip title="Add" sx={{ m: 2 }}>
                                <Button variant="contained" color="success" onClick={handlevoter}>Submit</Button>
                            </Tooltip>
                        </Box>
                    </>
                )
            }
        </>
    )
}
