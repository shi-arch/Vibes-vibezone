import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Grid, Button, Modal } from "@mui/material";
import "./index.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { setBillingModal } from "../../../redux/features/modalSlice";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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
      //const invoiceId = params.row.invoice || "";
      return (
        <button
          className="download-btn"
          //onClick={() => downloadInvoice(invoiceId)}
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

export default function PricingTable() {
  const modalSelector = useSelector((state) => state.modalSlice);

  const dispatch = useDispatch();
  const { billingModal } = modalSelector;
  const handleClose = () => {
    dispatch(setBillingModal());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "30%",
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={billingModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container style={style} className="billing-container" maxWidth="md">
        <TableContainer
          style={{ border: "1px solid #0bee80" }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  S.No
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Plan
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Start Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  End Date
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right">
                  Amount
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="center">
                  Invoice
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="right">{row.plan}</TableCell>
                  <TableCell align="right">{row.startDate}</TableCell>
                  <TableCell align="right">{row.endDate}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="center">
                    <button
                      className="download-btn"
                      onClick={() => downloadInvoice()}
                      // onClick={() => downloadInvoice(invoiceId)}
                    >
                      Download
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="button"
            style={{
              background: "#8f47ff",
              textTransform: "none",
              margin: "12px 35px 20px 0px",
              float: "right",
            }}
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </TableContainer>
      </Container>
    </Modal>
  );
}
