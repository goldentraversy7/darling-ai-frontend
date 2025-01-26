import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

const PaginatedTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  // Slice the data for the current page
  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Paper className="w-full">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "30%" }}>#</TableCell>
              <TableCell sx={{ width: "12%" }}>Open</TableCell>
              <TableCell sx={{ width: "12%" }}>High</TableCell>
              <TableCell sx={{ width: "12%" }}>Low</TableCell>
              <TableCell sx={{ width: "12%" }}>Close</TableCell>
              <TableCell sx={{ width: "12%" }}>Volume</TableCell>
              <TableCell sx={{ width: "10%" }}>Trend</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.dTime}</TableCell>
                <TableCell>{row.open}</TableCell>
                <TableCell>{row.high}</TableCell>
                <TableCell>{row.low}</TableCell>
                <TableCell>{row.close}</TableCell>
                <TableCell>{row.volume}</TableCell>
                <TableCell>{row.Trend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length} // Total number of rows
        page={page} // Current page
        onPageChange={handleChangePage} // Handle page change
        rowsPerPage={rowsPerPage} // Number of rows per page
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle rows per page change
        rowsPerPageOptions={[5, 10, 25]} // Rows per page options
      />
    </Paper>
  );
};

const MarketTrends = ({ data, plot }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Market Trends
      </Typography>
      <img src={plot} alt="Market Trends" />
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Stock Data
      </Typography>
      <PaginatedTable className="w-full" data={data} />
    </motion.div>
  );
};

export default MarketTrends;
