import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Collapse, Box, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import { PiDotsThreeCircleVerticalFill } from 'react-icons/pi'
import { NavLink } from 'react-router-dom'
import { FaAngleDown, FaAngleUp, FaVoteYea } from "react-icons/fa"
import { EditVoter } from './editVoter'





export const Searchinfo = ({ findVoter }: any) => {
  
  //header of table
  const column = [
    'Address',
    'Driving License',
    'Last Name',
    'First Name',
    'Middle Name',
    'DOB',
    'Age',
    'Gender',
    'Edit'
  ]

  console.log(column)
  const [openRows, setOpenRows] = useState<{ [key: number]: boolean }>({});

  const handleToggle = (index: number) => {
    setOpenRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 900 }}>  
          <TableHead >
            <TableRow >
              {column.map((column) => {
                return <TableCell component='th' align='right'>{column}</TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>

            {findVoter.map((c_voter, index) => {
              return (<>

                <TableRow key={index} sx={{ backgroundColor: "#F4F3EF" }}>
                  <TableCell align='right'>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleToggle(index)}
                    >
                      {openRows[index] ? <FaAngleUp /> : <FaAngleDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell align='right'>{c_voter.driving_licence} </TableCell>
                  <TableCell align='right'>{c_voter.lastName} </TableCell>
                  <TableCell align='right'>{c_voter.firstName} </TableCell>
                  <TableCell align='right'>{c_voter.middleName} </TableCell>
                  <TableCell align='right'>{
                    new Date(c_voter.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell align='right'>{c_voter.age} </TableCell>
                  <TableCell align='right'>{c_voter.gender} </TableCell>
                  <TableCell align='right'>
                    <NavLink to={`/voterinfo/${c_voter.driving_licence}`}>< PiDotsThreeCircleVerticalFill /></NavLink>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <TableCell align='right' >Street Number:  {c_voter.address.street_number}</TableCell>
                        <TableCell align='right' >Suffix a:  {c_voter.address.suffix_a}</TableCell>
                        <TableCell align='right' >Suffix b:  {c_voter.address.suffix_b}</TableCell>
                        <TableCell align='right'>Street Address: {c_voter.address.street_address}</TableCell>
                        <TableCell align='right'>Unit Type:  {c_voter.address.unit_type}</TableCell>
                        <TableCell align='right'> Unit Number:  {c_voter.address.unit_number}</TableCell>
                        <TableCell align='right'> City:  {c_voter.address.city}</TableCell>
                        <TableCell align='right'>State:  {c_voter.address.state}</TableCell>
                        <TableCell align='right'> Zip 4:  {c_voter.address.zip_4 || 'null'} </TableCell>
                        <TableCell align='right'>Zip 5:   {c_voter.address.zip_5}</TableCell>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>

              </>
              )
            })}
          </TableBody>
        </Table>

      </TableContainer>


    </>
  )
}
