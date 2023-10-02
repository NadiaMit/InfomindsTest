import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SupplierListQuery } from "../api/types";
import api from "../api/api";

export default function SupplierListPage() {
  const [suppliersList, setSuppliersList] = useState<SupplierListQuery[]>([]);
  const [nameFilter, setNameFilter] = useState<string>('')

  useEffect(() => {
    loadSuppliers()
  }, []);

  function loadSuppliers(){
    api.loadSuppliers(nameFilter)
      .then((response) => setSuppliersList(response))
  }

  return (
    <>
      <Typography variant="h4" sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        Suppliers
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
          id="nameFilter"
          label="Name"
          value={nameFilter}
          onChange={(value) => setNameFilter(value.target.value)}
        />
        <Button variant="contained" onClick={loadSuppliers}>Filter</Button>
      
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeadCell>Name</StyledTableHeadCell>
              <StyledTableHeadCell>Address</StyledTableHeadCell>
              <StyledTableHeadCell>Email</StyledTableHeadCell>
              <StyledTableHeadCell>Phone</StyledTableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliersList.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.address}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
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
