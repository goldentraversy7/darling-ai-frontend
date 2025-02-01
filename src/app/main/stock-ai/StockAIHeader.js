import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { LoadingButton } from "@mui/lab";

import { selectStockLoading, getStock } from "app/store/stockSlice";

function StockAIHeader(props) {
  const dispatch = useDispatch();
  const [symbol, setSymbol] = useState("AAPL");
  const [company, setCompany] = useState("");
  const loading = useSelector(selectStockLoading);

  const fetchAnalysis = () => {
    dispatch(getStock({ symbol, company }));
  };

  return (
    <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 w-full items-center justify-between py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start">
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-24 md:text-32 font-extrabold tracking-tight leading-none"
        >
          Advanced Stock Analysis
        </Typography>
        <Stack
          spacing={2}
          className="mt-48 w-full"
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
            className="hidden"
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
      </div>
    </div>
  );
}

export default StockAIHeader;
