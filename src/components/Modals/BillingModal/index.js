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

const handleClose = () => {
  window.location.href = "about:blank";
};

export default function PricingTable() {
  return (
    <Container className="billing-container" maxWidth="md">
      {" "}
      <Grid container spacing={3} justifyContent="center">
        {" "}
        <Grid item xs={12}>
          {" "}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableFooterPagination
            // autoHeight
          />
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Button
          className="button"
          variant="contained"
          sx={{
            textTransform: "none",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#8f47ff",
            },
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </Grid>
    </Container>
  );
}
