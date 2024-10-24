import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Box, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { PiDotsThreeCircleVerticalFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import { FaAngleDown, FaAngleUp, FaVoteYea } from "react-icons/fa"
import { EditVoter } from './editVoter'

import '../../../public/image/voterNotFound.gif'



export const Searchinfo = ({ findVoter }: any) => {

  //header of table
  const column = [
    'Address',
    'Driving License',
    'Prifix',
    'Last Name',
    'First Name',
    'Middle Name',
    'DOB',
    'Age',
    'Gender',
    'Edit'
  ]
  const voterNotFound = '../../../public/image/voterNotFound.gif'

  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  console.log('find voter data', findVoter)
  const handleToggle = (index: number) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      {findVoter && findVoter.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>

          <Table sx={{ minWidth: 900 }}>
            <TableHead >
              <TableRow >
                {column.map((column) => {
                  return <TableCell key={column} component='th' align='right'>{column}</TableCell>
                })}
              </TableRow>
            </TableHead>

            <TableBody>

              {findVoter.map((c_voter, index) => {
                return (<React.Fragment key={c_voter.driving_licence}>
                  <TableRow sx={{ backgroundColor: "#F4F3EF" }}>
                    <TableCell align='right'>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleToggle(index)}
                      >
                        {openRows[index] ? <FaAngleUp /> : <FaAngleDown />}
                      </IconButton>
                    </TableCell>
                    <TableCell align='right'>{c_voter?.driving_licence} </TableCell>
                    <TableCell align='right'>{c_voter?.prefix} </TableCell>
                    <TableCell align='right'>{c_voter?.lastName} </TableCell>
                    <TableCell align='right'>{c_voter?.firstName} </TableCell>
                    <TableCell align='right'>{c_voter?.middleName} </TableCell>
                   
                    <TableCell align='right'>{
                      new Date(c_voter?.dob)?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell align='right'>{c_voter?.age} </TableCell>
                    <TableCell align='right'>{c_voter?.gender} </TableCell>
                    <TableCell align='right'>
                      <NavLink to={`/voterinfo/${c_voter?.driving_licence}`}>< PiDotsThreeCircleVerticalFill /></NavLink>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                      <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <TableCell align='right' >Street Number:  {c_voter?.street_number}</TableCell>
                          <TableCell align='right' >Suffix a:  {c_voter?.suffix_a}</TableCell>
                          <TableCell align='right' >Suffix b:  {c_voter?.suffix_b}</TableCell>
                          <TableCell align='right'>Street Address: {c_voter?.street_address}</TableCell>
                          <TableCell align='right'>Unit Type:  {c_voter?.unit_type}</TableCell>
                          <TableCell align='right'> Unit Number:  {c_voter?.unit_number}</TableCell>
                          <TableCell align='right'> City:  {c_voter?.city}</TableCell>
                          <TableCell align='right'>State:  {c_voter?.state}</TableCell>
                          <TableCell align='right'> Zip 4:  {c_voter?.zip_4 || 'null'} </TableCell>
                          <TableCell align='right'>Zip 5:   {c_voter?.zip_5}</TableCell>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
                )
              })}
            </TableBody>
          </Table>

        </TableContainer>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
        <img src={voterNotFound} alt=" voter not found" style={{height:'100px'}} />
        <Typography  variant="h4" sx={{color:'#e57373'}}> Voter Not Exist</Typography>

       
        </Box>
      )
      }


    </>
  )
}
