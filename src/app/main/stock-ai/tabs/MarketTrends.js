import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Typography, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import Chart from "react-apexcharts";
import { createChart } from "lightweight-charts";
import _ from "lodash";

const formatNumber = (value) => {
  return _.isNumber(value) && !_.isNaN(value) ? value.toFixed(4) : null;
};

const StockChart = ({ stockData, predictions }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!stockData || stockData.length === 0) {
      console.warn("Stock data is empty or undefined");
      return;
    }

    // Process Historical Stock Data for Candlestick Chart
    const processedStockData = stockData.map((item) => ({
      x: new Date(_.get(item, "dDate", "")), // Convert Date String to Date Object
      y: [
        formatNumber(_.get(item, "open", 0)), // Open
        formatNumber(_.get(item, "high", 0)), // High
        formatNumber(_.get(item, "low", 0)), // Low
        formatNumber(_.get(item, "close", 0)), // Close
      ],
    }));

    // Get the last available close price (current price)
    const lastClose = formatNumber(
      _.get(stockData[stockData.length - 1], "close", 0)
    );
    const lastDate = new Date(
      _.get(stockData[stockData.length - 1], "dDate", "")
    );

    const lastStockPoint = {
      x: lastDate,
      y: lastClose,
      marker: {
        size: 7,
        fillColor: "#00E396",
        strokeColor: "#000",
        strokeWidth: 2,
      },
      label: {
        text: `Last Close: ${lastClose}`,
        borderColor: "#00E396",
        offsetY: -10,
        style: { background: "#00E396", color: "#000" },
      },
    };
    processedStockData.push(lastStockPoint);

    // Process Prediction Data (keep trading weekends, create line + dots)
    const predictionLine = [];
    const predictionPoints = [];

    if (predictions && predictions.length > 0) {
      predictionLine.push({ x: lastDate, y: lastClose }); // Start from last actual price

      predictions.forEach((item) => {
        const date = new Date(_.get(item, "dDate", ""));

        const predictedClose = formatNumber(_.get(item, "close", 0));

        predictionLine.push({ x: date, y: predictedClose });

        // Add points for each predicted value
        predictionPoints.push({
          x: date,
          y: predictedClose,
          marker: {
            size: 7,
            fillColor: "#FF9800",
            strokeColor: "#000",
            strokeWidth: 2,
          },
          label: {
            text: `Prediction: ${predictedClose}`,
            borderColor: "#FF9800",
            offsetY: -10,
            style: {
              background: "#FF9800",
              color: "#000",
            },
          },
        });
      });
    }

    // Get Last 60 Days for Default Zoom
    const last60Days = new Date();
    last60Days.setDate(last60Days.getDate() - 60);

    setChartData({
      series: [
        { name: "Stock Price", data: processedStockData },
        {
          name: "Predictions",
          data: predictionLine,
          type: "line",
          color: "#FF9800",
          stroke: {
            width: 3, // Make it thicker for better visibility
            dashArray: 5, // Ensures the line is dashed
          },
        },
      ],
      options: {
        chart: {
          type: "candlestick",
          height: 450,
          toolbar: { show: true },
          zoom: { enabled: true },
        },
        title: {
          text: `Stock Market Trends & Predictions`,
          align: "left",
        },
        xaxis: {
          type: "datetime",
          min: last60Days.getTime(), // Show last 60 days
          max: new Date().getTime() + 3 * 24 * 60 * 60 * 1000, // Extend X-axis for prediction dates
          labels: {
            format: "yyyy-MM-dd", // Format date labels (e.g., Jan 10)
          },
        },
        yaxis: {
          tooltip: { enabled: true },
          labels: {
            formatter: (value) => value.toFixed(4), // Formats Y-axis Labels to 4 Decimal Places
          },
        },
        tooltip: {
          enabled: true,
          theme: "dark",
          y: {
            formatter: (value) => value.toFixed(4), // Formats Tooltip Values to 4 Decimal Places
          },
        },
        annotations: {
          xaxis: [
            {
              x: new Date(_.get(_.head(predictions), "dDate")).getTime(),
              borderColor: "#00E396",
              label: {
                borderColor: "#00E396",
                style: {
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#fff",
                  background: "#00E396",
                  width: "100%",
                  textAlign: "right", // Centers text for better readability
                  padding: { left: 5, right: 10, top: 5, bottom: 5 },
                },
                orientation: "horizontal",
                offsetY: 7,
                text:
                  "📊 Prediction: " +
                  formatNumber(
                    parseFloat(_.get(_.head(predictions), "close", 0))
                  ),
              },
            },
          ],
        },
      },
    });
  }, [stockData, predictions]);

  return (
    <div className="w-full">
      {chartData ? (
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={450}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

const _StockChart = ({ data }) => {
  ChartJS.register(...registerables);

  // Format the chart data
  const chartData = {
    labels: data.map((d) => d.dDate), // X-Axis (Dates)
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
    labels: data.map((d) => d.dDate),
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

const StockTable = ({ data }) => {
  const columns = [
    { field: "dDate", headerName: "Date", width: 130 },
    { field: "open", headerName: "Open", width: 100 },
    { field: "high", headerName: "High", width: 100 },
    { field: "low", headerName: "Low", width: 100 },
    { field: "close", headerName: "Close", width: 100 },
    { field: "volume", headerName: "Volume", width: 120 },
    { field: "SMA_20", headerName: "SMA (20)", width: 120 },
    { field: "EMA_20", headerName: "EMA (20)", width: 120 },
    { field: "RSI", headerName: "RSI", width: 100 },
    { field: "MACD", headerName: "MACD", width: 100 },
    { field: "Signal_Line", headerName: "Signal", width: 100 },
    { field: "BB_Upper", headerName: "BB Upper", width: 120 },
    { field: "BB_Lower", headerName: "BB Lower", width: 120 },
  ];

  const rows = data
    .slice()
    .reverse()
    .map((row, index) => ({
      id: index + 1,
      dDate: _.get(row, "dDate", "N/A"),
      open: formatNumber(_.get(row, "open", null)),
      high: formatNumber(_.get(row, "high", null)),
      low: formatNumber(_.get(row, "low", null)),
      close: formatNumber(_.get(row, "close", null)),
      volume: _.get(row, "volume", "N/A"),
      SMA_20: formatNumber(_.get(row, "SMA_20", null)),
      EMA_20: formatNumber(_.get(row, "EMA_20", null)),
      RSI: formatNumber(_.get(row, "RSI", null)),
      MACD: formatNumber(_.get(row, "MACD", null)),
      Signal_Line: formatNumber(_.get(row, "Signal_Line", null)),
      BB_Upper: formatNumber(_.get(row, "BB_Upper", null)),
      BB_Lower: formatNumber(_.get(row, "BB_Lower", null)),
    }));

  return (
    <Paper className="w-full h-400 p-4">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Paper>
  );
};

const MarketTrends = ({ data, predictions }) => {
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
          <StockChart
            className="w-full"
            stockData={data}
            data={data}
            predictions={predictions}
          />
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
