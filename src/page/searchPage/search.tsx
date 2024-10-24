import { Box, Button, Card, CardActions, CardContent, Checkbox, colors, Container, Divider, FormControl, FormControlLabel, FormLabel, Grid, Grid2, InputLabel, OutlinedInput, Paper, Popover, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { findVoter, readVoterApi, searchVoter } from '../../ApiOperetion/voterApi'
import { data } from '@remix-run/router/dist/utils'
import { PiDotsThreeCircleVerticalFill } from "react-icons/pi";
import { NavLink, useNavigate } from 'react-router-dom';
import { Searchinfo } from './searchinfo';
import { DatailPage } from '../DetailPage/datailPage';
import { FaSearch } from 'react-icons/fa';



export const Search = () => {

  interface searchVoter {
    lastName?: string
    firstName?: string
    middelName?: string

    driving_licence?: string

    dob?: string

  }


  const [voter, setVoter] = useState<searchVoter>({
    lastName: '',
    firstName: '',
    middelName: '',
    driving_licence: '',
    dob: ''
  })
  const [fetchVoter, setfetchVoter] = useState()
  const [find, setfind] = useState()


  //style
  const inputfield = { borderRadius: 2, height: 30 }




  const findVoter = () => {
    try {
      const queryParams = [
        voter.driving_licence ? `driving_licence=${voter.driving_licence}` :  `driving_licence`,
        voter.lastName ? `lastName=${voter.lastName}` :`lastName`,
        voter.firstName ? `firstName=${voter.firstName}` : `firstName`,
        voter.middelName ? `middleName=${voter.middelName}` : `middleName`,
        voter.dob ? `dob=${voter.dob}` : `dob`
    ].filter(param => param).join("&");

      const serchVoter = searchVoter(queryParams)
      return (serchVoter)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSeach = async (e) => {
    e.preventDefault()
    const result = await findVoter();
    console.log(result?.data);
    setfetchVoter(result?.data)

  }


  return (
    <>
      <Paper sx={{
        minWidth: '1110px'
      }}>

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
        >Flexi Search</Typography>
        <Divider />

        <Box

          m={1}
          sx={{
            border: '1px solid #e8e8e8  ',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography color='primary' pl={2} variant='body1' mr={2} >
            Search  In
          </Typography>



          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"

          >
            <FormControlLabel value="County" control={<Radio />} label="County" sx={{ paddingLeft: 2 }} />
            <Divider orientation='vertical' flexItem />
            <FormControlLabel value="State" control={<Radio />} label="State" sx={{ paddingLeft: 2 }} />
          </RadioGroup>

        </Box>


        <Box
          sx={{
            display: 'flex',
          }}
          m={1}
        >
          <Box width={"50vw"} sx={{
            border: '1px solid #e8e8e8  ',
            borderRadius: 2,
          }} m={1}  >
            {/* search voter by information */}
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={1} >
              <Typography variant='subtitle1' color='primary'>
                Search by Voter Information
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"

              >
                <FormControlLabel value="Current" control={<Radio />} label="Current" sx={{ paddingLeft: 2 }} />
                <Divider orientation='vertical' flexItem />
                <FormControlLabel value="Previous" control={<Radio />} label="Previous" sx={{ paddingLeft: 2 }} />
              </RadioGroup>


            </Box>
            <Grid container spacing={2}
              m={1}
              p={1}
              sx={{
                border: '1px solid #e8e8e8  ',
                borderRadius: 2,
                width: '97%'
              }}>

              <Grid item xs={12} sm={6}>
                <InputLabel>Last Name </InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: voter.lastName ? '#eff7ff' : '#e8e8e8'
                }
                }
                  fullWidth
                  size='small'
                  placeholder=' enter Last Name'
                  value={voter.lastName}
                  onChange={(e) => setVoter({ ...voter, lastName: e.target.value })}
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel>  First Name</InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: voter.firstName ? '#eff7ff' : '#e8e8e8'
                }
                }
                  size='small'
                  fullWidth
                  placeholder=' enter First Name'
                  value={voter.firstName}
                  onChange={(e) => setVoter({ ...voter, firstName: e.target.value })} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel> Middle Name</InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: voter.middelName ? '#eff7ff' : '#e8e8e8'

                }
                }
                  fullWidth
                  size='small'
                  placeholder=' enter Middle Name'
                  value={voter.middelName}
                  onChange={(e) => setVoter({ ...voter, middelName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel>Driving  License No.</InputLabel>

                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: voter.driving_licence ? '#eff7ff' : '#e8e8e8'
                }
                }
                  fullWidth
                  size='small'
                  placeholder='enter Driving License number'
                  value={voter.driving_licence}
                  onChange={(e) => setVoter({ ...voter, driving_licence: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel>Date of Birth</InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: voter.dob ? '#eff7ff' : '#e8e8e8'
                }
                }
                  type='date'
                  fullWidth
                  size='small'
                  disabled
                  value={voter.dob}
                  onChange={(e) => setVoter({ ...voter, dob: e.target.value })}
                />
              </Grid>
            </Grid>

          </Box>

          {/* search by address */}
          <Box width={"50vw"}
            m={1}

            sx={{
              border: '1px solid #e8e8e8  ',
              borderRadius: 2,
            }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} m={1}>
              <Typography variant='subtitle1' color='primary'>
                Search by Voter Address
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"

              >
                <FormControlLabel value="Current" control={<Radio />} label="Current" sx={{ paddingLeft: 2 }} />
                <Divider orientation='vertical' flexItem />
                <FormControlLabel value="Previous" control={<Radio />} label="Previous" sx={{ paddingLeft: 2 }} />
              </RadioGroup>

            </Box>
            <Grid container
              width={'97%'}
              spacing={2}
              m={1}
              p={1}

              sx={{
                border: '1px solid #e8e8e8  ',
                borderRadius: 2,
              }}>
              <Grid item xs={12} sm={4} >
                <InputLabel>County </InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: '#e8e8e8'
                }
                }
                  disabled
                  fullWidth
                  size='small'
                // value={voter.lastName}
                //  onChange={(e) => setVoter({ ...voter, lastName: e.target.value })}
                />

              </Grid>
              <Grid item xs={12} sm={4}>
                <InputLabel> Postal City</InputLabel>
                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: '#e8e8e8'
                }
                }
                  disabled
                  size='small'
                  fullWidth

                // value={voter.firstName}
                //  onChange={(e) => setVoter({ ...voter, firstName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel> Street Name</InputLabel>
                <OutlinedInput sx={{
                  ...inputfield,
                  backgroundColor: '#e8e8e8'

                }
                }
                  fullWidth
                  size='small'
                  disabled
                //value={voter.middelName}
                //  onChange={(e) => setVoter({ ...voter, middelName: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <InputLabel>Street Number</InputLabel>

                <OutlinedInput sx={{
                  ...inputfield, backgroundColor: '#e8e8e8'
                }

                }
                  fullWidth
                  size='small'
                  disabled
                //    value={voter.driving_licence}
                // onChange={(e) => setVoter({ ...voter, driving_licence: e.target.value })}
                />
              </Grid>




            </Grid>

          </Box>


        </Box >
        <Box display={'flex'} justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            <Checkbox />
            <Typography>    Do Not Include Cancelled Voter</Typography>
          </Box>
          <Box display={'flex'} color={'white'}>
            <Button variant='contained' color='info' size='small' sx={{ margin: ' 0 10px 7px 0' }}>
              <NavLink to='/details'>
                add voter
              </NavLink>
            </Button>



            <Button onClick={handleSeach} variant="contained" color="primary" size='small' sx={{ margin: ' 0 10px 7px 0' }}>
              <FaSearch /> search Voter
            </Button>
          </ Box>
        </Box>


      </Paper>


      {fetchVoter && <Searchinfo findVoter={fetchVoter}/>}





    </>
  )
}
