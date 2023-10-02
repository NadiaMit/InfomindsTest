import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from "@mui/material";
import { useEffect, useState } from "react";
import { EmployeeListQuery } from "../api/types";
import api from "../api/api";

export default function EmployeeListPage() {
    const [employeesList, setEmployeesList] = useState<EmployeeListQuery[]>([]);
  const [firstNameFilter, setFirstNameFilter] = useState<string>('')
  const [lastNameFilter, setLastNameFilter] = useState<string>('')

  useEffect(() => {
    loadEmployees()
  }, []);

  function loadEmployees(){
    api.loadEmployees(firstNameFilter, lastNameFilter)
      .then((response) => setEmployeesList(response))
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Employees
      </Typography>

      <Grid
      container={true}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      }}
      noValidate
      autoComplete="off"
      >
        <TextField
          id="firstNameFilter"
          label="First Name"
          value={firstNameFilter}
          onChange={(value) => setFirstNameFilter(value.target.value)}
        />
        <TextField
          id="lastNameFilter"
          label="Last Name"
          value={lastNameFilter}
          onChange={(value) => setLastNameFilter(value.target.value)}
        />
        <Button variant="contained" onClick={loadEmployees}>Filter</Button>
      
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>First Name</StyledTableHeadCell>
              <StyledTableHeadCell>Last Name</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
              <StyledTableHeadCell>Code</StyledTableHeadCell>
              <StyledTableHeadCell>Description</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.department?.code ?? '---'}</TableCell>
                <TableCell>{row.department?.description ?? '---'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
}));