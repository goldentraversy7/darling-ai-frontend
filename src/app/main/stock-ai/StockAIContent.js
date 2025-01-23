import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  selectStockLoading,
  selectStock,
  getStock,
} from "app/store/stockSlice";

// import AnalysisTable from "./components/AnalysisTable";
// import MarketTrendsChart from "./components/MarketTrendsChart";

/**
 * The ProjectStockAIApp page.
 */
function StockAIContent() {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("AAPL");
  const [company, setCompany] = useState("");
  const loading = useSelector(selectStockLoading);
  const data = useSelector(selectStock);

  const fetchAnalysis = () => {
    dispatch(getStock({ symbol, company }));
  };

  return (
    <div className="w-full pt-16 sm:pt-24">
      <Container style={{ marginTop: "20px" }}>
        <Stack
          spacing={2}
          className="mt-32"
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <TextField
            label="Stock Symbol"
            fullWidth
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
          <TextField
            label="Company Name"
            fullWidth
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </Stack>
        <LoadingButton
          variant="contained"
          color="primary"
          className="mt-32"
          onClick={fetchAnalysis}
          disabled={loading}
          loading={loading}
        >
          Analyze
        </LoadingButton>

        {data && (
          <>
            <Typography variant="h5" style={{ marginTop: "20px" }}>
              Market Trends
            </Typography>
            {/* <MarketTrendsChart stockTrends={analysis.stock_trends} /> */}

            <Typography variant="h5" style={{ marginTop: "20px" }}>
              Social Media Sentiment
            </Typography>
            {/* <AnalysisTable sentimentData={analysis.social_sentiment} /> */}
          </>
        )}
      </Container>
    </div>
  );
}

export default StockAIContent;
