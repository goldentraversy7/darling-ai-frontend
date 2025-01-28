import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { LoadingButton } from "@mui/lab";

import {
  selectSearchLoading,
  fetchBackgroundNews,
} from "app/store/backgroundSlice";

function BackgroundAIHeader(props) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("technology");
  const loading = useSelector(selectSearchLoading);

  const _handleSearch = () => {
    dispatch(fetchBackgroundNews({ query }));
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
          Background Search
        </Typography>
        <Stack
          spacing={2}
          className="mt-48 w-full"
          direction={{ xs: "column", sm: "row" }}
          alignItems="center"
        >
          <TextField
            label="Query"
            placeholder="Type Query"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            className="mt-32"
            onClick={_handleSearch}
            disabled={loading}
            loading={loading}
          >
            Search
          </LoadingButton>
        </Stack>
      </div>
    </div>
  );
}

export default BackgroundAIHeader;
