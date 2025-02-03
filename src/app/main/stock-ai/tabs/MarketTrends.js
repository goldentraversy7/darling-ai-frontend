import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const StockTable = ({ data }) => {
  const columns = [
    { field: "dTime", headerName: "#", width: 250 }, // Numeric pixel width
    { field: "open", headerName: "Open", width: 100 },
    { field: "high", headerName: "High", width: 100 },
    {
      field: "low",
      headerName: "Low",
      width: 100,
    },
    { field: "close", headerName: "Close", width: 100 },
    { field: "volume", headerName: "Volume", width: 150 },
    { field: "Trend", headerName: "Trend", width: 100 },
  ];

  const rows = data.map((row, index) => ({
    id: index + 1,
    dTime: row.dTime,
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
    volume: row.volume,
    Trend: row.Trend,
  }));

  return (
    <Paper className="w-full h-400">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 25]}
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
      {plot && <img src={plot} alt="Market Trends" className="max-h-640" />}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Stock Data
      </Typography>
      <StockTable className="w-full" data={data} />
    </motion.div>
  );
};

export default MarketTrends;
