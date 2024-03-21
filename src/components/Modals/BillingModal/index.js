import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Grid, Button } from "@mui/material";
import "./index.css";
const columns = [
  { field: "id", headerName: "S.No", width: 70 },
  { field: "plan", headerName: "Plan", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "endDate", headerName: "End Date", width: 130 },
  { field: "amount", headerName: "Amount", width: 130 },
  {
    field: "invoice",
    headerName: "Invoice",
    width: 100,
    renderCell: (params) => {
      const invoiceId = params.row.invoice;
      return (
        <button
          className="download-btn"
          onClick={() => downloadInvoice(invoiceId)}
        >
          Download
        </button>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
  {
    id: 2,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
  {
    id: 3,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
  {
    id: 4,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
  {
    id: 5,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
  {
    id: 6,
    plan: "VibeZone Free",
    startDate: "04 Dec 23",
    endDate: "05 Dec 23",
    amount: 9,
  },
];

const downloadInvoice = (invoiceId) => {
  console.log(`Downloading invoice with ID: ${invoiceId}`);
};
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function PricingTable() {
  return (
    <Container className="billing-container" maxWidth="md">
      <TableContainer style={{border: "1px solid #0bee80"}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{fontWeight: "bold"}} align="center">S.No</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="center">Plan</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="right">Start Date</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="right">End Date</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="right">Amount</TableCell>
              <TableCell style={{fontWeight: "bold"}} align="center">Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="right">{row.plan}</TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">{row.endDate}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="center"><button
                  className="download-btn"
                  onClick={() => downloadInvoice(invoiceId)}
                >
                  Download
                </button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          className="button"
          style={{ background: "#8f47ff", textTransform: "none", margin: "12px 35px 20px 0px", float: "right" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Cancel
        </Button>
      </TableContainer>

    </Container>
    // <Container className="billing-container" maxWidth="md">
    //   {" "}
    //   <Grid container spacing={3} justifyContent="center">
    //     {" "}
    //     <Grid item xs={12}>
    //       {" "}
    //       <DataGrid
    //         rows={rows}
    //         columns={columns}
    //         pageSize={5}
    //         rowsPerPageOptions={[5]}
    //         disableFooterPagination
    //         autoHeight
    //       />
    //       <Button
    //         className="button"
    //         variant="contained"
    //         onClick={() => setOpen(true)}
    //       >
    //         Cancel
    //       </Button>
    //     </Grid>
    //   </Grid>
    //   {/* <Grid item xs={3}>
    //     <Button
    //       className="button"
    //       variant="contained"
    //       onClick={() => setOpen(true)}
    //     >
    //       Cancel
    //     </Button>
    //   </Grid> */}
    // </Container>
  );
}
