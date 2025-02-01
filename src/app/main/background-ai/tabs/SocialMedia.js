import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const SocialMediaTable = ({ data }) => {
  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "text", headerName: "Post Content", width: 300 },
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
    { field: "date", headerName: "Date", width: 150 },
    { field: "platform", headerName: "Platform", width: 200 },
  ];

  const rows = data.map((row, index) => ({
    id: index + 1,
    text: row.Text,
    url: row.URL,
    date: row.Date,
    platform: row.Media,
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

const SocialMedia = ({ data }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Social Media Posts
      </Typography>
      <SocialMediaTable className="w-full" data={data} />
    </motion.div>
  );
};

export default SocialMedia;
