import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import _ from "lodash";

const StockChart = ({ data }) => {
  ChartJS.register(...registerables);

  // Format the chart data
  const chartData = {
    labels: data.map((d) => d.dTime), // X-Axis (Dates)
    datasets: [
      {
        label: "Close Price",
        data: data.map((d) => d.close),
        borderColor: "blue",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: "SMA (20)",
        data: data.map((d) => d.SMA_20),
        borderColor: "orange",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: "EMA (20)",
        data: data.map((d) => d.EMA_20),
        borderColor: "purple",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
      },
      {
        label: "RSI",
        data: data.map((d) => d.RSI),
        borderColor: "red",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        yAxisID: "RSI",
      },
      {
        label: "MACD",
        data: data.map((d) => d.MACD),
        borderColor: "pink",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        yAxisID: "MACD",
      },
      {
        label: "Signal Line",
        data: data.map((d) => d.Signal_Line),
        borderColor: "brown",
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        yAxisID: "MACD",
      },
      {
        label: "Bollinger Upper",
        data: data.map((d) => d.BB_Upper),
        borderColor: "green",
        borderWidth: 1.5,
        fill: false,
        borderDash: [5, 5],
      },
      {
        label: "Bollinger Lower",
        data: data.map((d) => d.BB_Lower),
        borderColor: "red",
        borderWidth: 1.5,
        fill: false,
        borderDash: [5, 5],
      },
    ],
  };

  const volumeData = {
    labels: data.map((d) => d.dTime),
    datasets: [
      {
        label: "Volume",
        data: data.map((d) => d.volume),
        backgroundColor: "rgba(0, 0, 255, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category", // X-axis should be time-based
        ticks: {
          color: "white",
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          color: "white",
        },
      },
      RSI: {
        position: "right",
        grid: { drawOnChartArea: false },
      },
      MACD: {
        position: "right",
        grid: { drawOnChartArea: false },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
        backgroundColor: "#121212",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center" }}>Market Trends</h2>
      <div style={{ height: "500px" }}>
        <Line data={chartData} options={options} />
      </div>
      <div style={{ height: "500px", marginTop: "20px" }}>
        <Bar data={volumeData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

const __StockChart = ({ data }) => {
  ChartJS.register(...registerables);

  const chartData = {
    labels: data.map((d) => d.dTime),
    datasets: [
      {
        label: "Close Price",
        data: data.map((d) => d.close),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "SMA (20)",
        data: data.map((d) => d.SMA_20),
        borderColor: "orange",
        fill: false,
      },
      {
        label: "SMA (50)",
        data: data.map((d) => d.SMA_50),
        borderColor: "green",
        fill: false,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows setting a custom height & width
    plugins: {
      legend: {
        labels: {
          color: "#ffffff", // Light text for dark mode
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#ffffff" }, // X-axis labels
        grid: { color: "rgba(255, 255, 255, 0.2)" }, // Lighter grid lines
      },
      y: {
        ticks: { color: "#ffffff" }, // Y-axis labels
        grid: { color: "rgba(255, 255, 255, 0.2)" }, // Lighter grid lines
      },
    },
  };

  return (
    <div
      style={{
        width: "80vw",
        height: "50vh",
        backgroundColor: "#1e1e1e",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

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
  ];

  const rows = data.map((row, index) => ({
    id: index + 1,
    dTime: row.dTime,
    open: row.open,
    high: row.high,
    low: row.low,
    close: row.close,
    volume: row.volume,
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

const MarketTrends = ({ data }) => {
  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
      className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32 mr-32 w-full"
    >
      {!_.isEmpty(data) && (
        <>
          <Typography variant="h5" style={{ marginTop: "20px" }}>
            Market Trends
          </Typography>
          <StockChart className="w-full" data={data} />
        </>
      )}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Stock Data
      </Typography>
      <StockTable className="w-full" data={data} />
    </motion.div>
  );
};

export default MarketTrends;
