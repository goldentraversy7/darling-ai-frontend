import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const PublicRecordsTable = ({ data }) => {
  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "caseName", headerName: "Case Name", width: 300 },
    { field: "court", headerName: "Court", width: 200 },
    { field: "filedDate", headerName: "Filed Date", width: 150 },
    {
      field: "url",
      headerName: "URL",
      width: 250,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
  ];

  const rows = data.map((row, index) => ({
    id: index + 1,
    caseName: row["Case Name"],
    court: row.Court,
    filedDate: row["Filed Date"],
    url: row.URL,
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

const PublicRecords = ({ data }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Public Records
      </Typography>
      <PublicRecordsTable className="w-full" data={data} />
    </motion.div>
  );
};

export default PublicRecords;
