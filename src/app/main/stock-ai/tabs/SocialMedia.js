import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Paper, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ArticleTable = ({ articles }) => {
  const [expandedRowId, setExpandedRowId] = useState(null); // Track expanded row

  const handleRowClick = (rowId) => {
    setExpandedRowId(rowId === expandedRowId ? null : rowId); // Toggle row expansion
  };

  const columns = [
    { field: "id", headerName: "#", width: 50 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "title",
      headerName: "Title",
      width: 300,
      renderCell: (params) => (
        <a
          href={params.row.URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#4fc3f7",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </a>
      ),
    },
    { field: "summary", headerName: "Summary", width: 400 },
    { field: "sentiment", headerName: "Sentiment", width: 150 },
    {
      field: "actions",
      headerName: "",
      width: 100,
      renderCell: (params) => (
        <button
          onClick={() => handleRowClick(params.row.id)}
          style={{
            background: "transparent",
            border: "none",
            color: "#4fc3f7",
            cursor: "pointer",
          }}
        >
          {params.row.id === expandedRowId ? "Collapse" : "Expand"}
        </button>
      ),
    },
  ];

  const rows = articles.map((row, index) => ({
    id: index + 1,
    date: row.dDate,
    title: row.Title,
    URL: row.URL,
    summary: row.Summary,
    sentiment: row.Sentiment,
  }));

  const renderExpandedContent = (row) => (
    <Box
      sx={{
        backgroundColor: "#1e293b",
        color: "#e0e0e0",
        padding: 2,
        marginTop: 1,
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="body1">
        <strong>Title:</strong>{" "}
        <a
          href={row.URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "#4fc3f7",
            fontWeight: "bold",
          }}
        >
          {row.title}
        </a>
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        <strong>Summary:</strong> {row.summary}
      </Typography>
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        <strong>Sentiment:</strong> {row.sentiment}
      </Typography>
    </Box>
  );

  return (
    <Paper
      sx={{
        backgroundColor: "#0f172a",
        padding: 2,
        borderRadius: "8px",
      }}
      className="w-full"
    >
      <Box sx={{ height: 400 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 25]}
          disableSelectionOnClick
          getRowClassName={(params) =>
            params.row.id === expandedRowId ? "Mui-expanded-row" : ""
          }
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              color: "#e0e0e0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1e293b",
              color: "#cfd8dc",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#334155",
            },
            "& .Mui-expanded-row": {
              backgroundColor: "#1e293b !important",
            },
          }}
        />
        {expandedRowId &&
          renderExpandedContent(rows.find((row) => row.id === expandedRowId))}
      </Box>
    </Paper>
  );
};

const SocialMedia = ({ articles }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Social Media Articles
      </Typography>
      <ArticleTable className="w-full" articles={articles} />
    </motion.div>
  );
};

export default SocialMedia;
