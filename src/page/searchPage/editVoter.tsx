import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { findVoter, updateAddress, updateVoter } from '../../ApiOperetion/voterApi';
import { Box, Button, Container, InputLabel, MenuItem, Paper, Select, Stack, TextField, Tooltip, Typography } from '@mui/material';
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
        middelName: false
    })


    const boxstyle = { padding: 1, }

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
        newErrors.middelName = !voterdata.middleName

        if (age > voterdata.age_by_election) {
            newErrors.age_by_election = true

        }

        //date of birth vaidation
        if (date > c_date) {
            newErrors.dob = true
        }
        setError(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };




    const handlevoter = async (e) => {
        e.preventDefault()
        console.log(errors)

        const isValid = await validateFields();
        console.log(isValid)
        if (!isValid) return;
        const v_responce = await updateVoter(voterdata.driving_licence, voterdata)
        console.log('voter info', v_responce.data)
        const a_responce = await updateAddress(voterdata.driving_licence, address)
        console.log('address', a_responce)
        v_responce && a_responce && alert('Voter and Address updated successfully')

    }


    //for voter data entry
    const handelChangeVoter = async (e) => {
        try {
            setvoterData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }))
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
    //     label: { color: 'wheat' }
    // }
    return (
        <>
            {loading ? (
                <span>Loading...</span>
            ) :
                (
                    <>
                        <Container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-evenly' }} >
                            {/* voter info */}
                            <Paper
                                elevation={2}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 2,


                                }}>
                                <Typography variant='h4' sx={{ marginBottom: 1, padding: 3 }}>
                                    voter Info...
                                </Typography>
                                <Container sx={boxstyle}>
                                    <TextField
                                        //    sx={textFieldStyle}
                                        label="First Name"
                                        onChange={handelChangeVoter}
                                        value={voterdata.firstName}
                                        name='firstName'
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        error={errors.firstName}
                                    />
                                </Container>

                                <Container sx={boxstyle} >
                                    <TextField
                                        //sx={textFieldStyle}

                                        label="Middel Name"
                                        name='middleName'
                                        value={voterdata?.middleName}
                                        onChange={handelChangeVoter}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        error={errors.middelName} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        error={errors.lastName}
                                        label="Last Name"
                                        name='lastName'
                                        required
                                        value={voterdata?.lastName}
                                        onChange={handelChangeVoter}
                                        variant="outlined"
                                        fullWidth

                                        InputLabelProps={{ shrink: true }} />
                                </Container>

                                <Container sx={boxstyle} >
                                    <InputLabel id='prefix'  >Prefix</InputLabel>
                                    <Select
                                        // sx={textFieldStyle}
                                        name="prefix"
                                        value={voterdata?.prefix}
                                        onChange={handelChangeVoter}
                                        fullWidth>
                                        <MenuItem value="Mr.">Mr.</MenuItem>
                                        <MenuItem value="Mrs.">Mrs.</MenuItem>
                                        <MenuItem value="Miss">Miss</MenuItem>
                                    </Select>
                                </Container>

                                <Container sx={{ display: 'flex' }}>
                                    <Container   >
                                        <TextField
                                            // sx={textFieldStyle}
                                            type='number'
                                            label="Age"
                                            name='age'
                                            value={age}
                                            onChange={handelChangeVoter}
                                            variant="outlined"
                                            error={errors.age}
                                            InputLabelProps={{ shrink: true }} />
                                    </Container>

                                    <Container >
                                        <InputLabel id='gender' >Gender</InputLabel>
                                        <Select
                                            // sx={textFieldStyle}
                                            name='gender'
                                            value={voterdata?.gender}
                                            onChange={handelChangeVoter}
                                        >
                                            <MenuItem value="male">male</MenuItem>
                                            <MenuItem value="female">female</MenuItem>
                                            <MenuItem value="other">other</MenuItem>
                                        </Select>
                                    </Container>

                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        type='number'
                                        label="Age by Election"
                                        name='age_by_election'
                                        value={voterdata?.age_by_election}
                                        onChange={handelChangeVoter}
                                        variant="outlined"
                                        fullWidth
                                        error={errors.age_by_election}
                                        InputLabelProps={{ shrink: true }} />
                                    {errors.age_by_election && <Typography sx={{ color: 'red' }} variant='body2'>enter valide age</Typography>}

                                </Container>
                                <Container sx={boxstyle} >

                                    <TextField
                                        // sx={textFieldStyle}
                                        type='date'
                                        label="Date of Birth"
                                        name='dob'
                                        value={date}
                                        onChange={handelChangeVoter}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }}
                                        error={errors.dob}
                                    />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}

                                        label="Driving License"
                                        name='driving_licence'
                                        value={voterdata?.driving_licence}
                                        onChange={handelChangeVoter}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                            </Paper>

                            {/* addresss */}
                            <Paper elevation={2}
                                sx={{
                                    width: 1 / 3, display: 'flex', flexDirection: 'column', borderRadius: 2,
                                }}>
                                <Typography variant="h4" marginBottom={3} padding={4} >
                                    address
                                </Typography>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="City"
                                        onChange={handleAddress}
                                        name='city'
                                        value={address?.city}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="State"
                                        onChange={handleAddress}
                                        name='state'
                                        value={address?.state}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Street Address"
                                        onChange={handleAddress}
                                        name='street_address'
                                        value={address?.street_address}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Street Number"
                                        onChange={handleAddress}
                                        name='street_name'
                                        value={address?.street_number}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Suffix A"
                                        onChange={handleAddress}
                                        name='suffix_a'
                                        value={address?.suffix_a}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Suffix B"
                                        onChange={handleAddress}
                                        name='suffix_b'
                                        value={address?.suffix_b}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Unit Number"
                                        onChange={handleAddress}
                                        name='unit_number'
                                        value={address?.unit_number}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                                <Container sx={boxstyle} >
                                    <TextField
                                        // sx={textFieldStyle}
                                        label="Unit Type"
                                        onChange={handleAddress}
                                        name='unit_type'
                                        value={address?.unit_type}
                                        variant="outlined"
                                        fullWidth
                                        InputLabelProps={{ shrink: true }} />
                                </Container>
                            </Paper>
                        </Container>
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
