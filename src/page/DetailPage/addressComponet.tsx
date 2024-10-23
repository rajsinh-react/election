import { Paper, Grid, InputLabel, OutlinedInput, Typography, Divider } from '@mui/material'
import React from 'react'

export const AddressComponent = ({ address, inputfield, handleAddress }) => {
    return (
        <>
            <Typography variant='h6'
                sx={{ marginLeft: 2, color: '#0073E6 ' }}
                ml={2}
                pt={3}

            >Address </Typography>
            <Divider />
            <Grid container spacing={3} 
            justifyContent={'start'} 
            pl={2} pt={1} >
                <Grid item xs={2.3} >
                    <InputLabel>Street Number</InputLabel>
                    <OutlinedInput sx={inputfield} type="number" name="street_number" value={address.street_number} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Suffix A</InputLabel>
                    <OutlinedInput sx={inputfield} type="text" name="suffix_a" value={address.suffix_a} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Suffix B</InputLabel>
                    <OutlinedInput sx={inputfield}
                        type="text"
                        name="suffix_b"
                        value={address.suffix_b}
                        onChange={handleAddress}
                        required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Street Address/P.O. Box</InputLabel>
                    <OutlinedInput sx={inputfield}
                        type="text"
                        name="street_address"
                        value={address.street_address}
                        onChange={handleAddress} />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Unit Type</InputLabel>
                    <OutlinedInput sx={inputfield} type="text" name="unit_type" value={address.unit_type} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Unit Number</InputLabel>
                    <OutlinedInput sx={inputfield} type="number" name="unit_number" value={address.unit_number} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Address Line 2</InputLabel>
                    <OutlinedInput sx={inputfield} type="text" name="address_line2" value={address.address_line2} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>City</InputLabel>
                    <OutlinedInput sx={inputfield} type="text" name="city" value={address.city} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>State</InputLabel>
                    <OutlinedInput sx={inputfield} type="text" name="state" value={address.state} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3}>
                    <InputLabel>Zip 5</InputLabel>
                    <OutlinedInput sx={inputfield} type="number" name="zip_5" value={address.zip_5} onChange={handleAddress} required />
                </Grid>

                <Grid item xs={2.3} pb={1}>
                    <InputLabel>Zip 4</InputLabel>

                    <OutlinedInput sx={inputfield} type="number" name="zip_4" value={address.zip_4} onChange={handleAddress} required />
                </Grid>

            </Grid>
        </>
    )
}

