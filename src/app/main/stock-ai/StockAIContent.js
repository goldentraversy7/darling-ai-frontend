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
  Tab,
  Tabs,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";

import {
  selectStockLoading,
  selectStock,
  getStock,
} from "app/store/stockSlice";

import MarketTrends from "./tabs/MarketTrends";
import SocialMedia from "./tabs/SocialMedia";

/**
 * The ProjectStockAIApp page.
 */
function StockAIContent() {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("AAPL");
  const [company, setCompany] = useState("");
  const loading = useSelector(selectStockLoading);
  const [selectedTab, setSelectedTab] = useState(0);
  const data = useSelector(selectStock);
  const { news_articles, stock_data, plot } = data;

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

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
        </Stack>

        {stock_data && (
          <>
            <div className="w-full pt-16 sm:pt-24">
              <div className="w-full px-24">
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  indicatorColor="primary"
                  textColor="inherit"
                  variant="scrollable"
                  scrollButtons={false}
                  className="-mx-4 min-h-40"
                  classes={{
                    indicator:
                      "flex justify-center bg-transparent w-full h-full",
                  }}
                  TabIndicatorProps={{
                    children: (
                      <Box
                        sx={{ bgcolor: "text.disabled" }}
                        className="w-full h-full rounded-full opacity-20"
                      />
                    ),
                  }}
                >
                  <Tab
                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Market Trends"
                  />
                  <Tab
                    className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
                    disableRipple
                    label="Social Media Sentiment"
                  />
                </Tabs>
              </div>
              <div className="flex flex-auto justify-center w-full mx-auto p-0 sm:p-32">
                {selectedTab === 0 && (
                  <MarketTrends data={stock_data} plot={plot} />
                )}
                {selectedTab === 1 && <SocialMedia articles={news_articles} />}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default StockAIContent;
