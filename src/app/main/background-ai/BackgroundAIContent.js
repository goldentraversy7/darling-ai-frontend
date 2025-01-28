import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import {
  selectStockLoading,
  selectStock,
  getStock,
} from "app/store/stockSlice";

/**
 * The ProjectBackgroundAIApp page.
 */
function BackgroundAIContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const data = useSelector(selectStock);
  const { news_articles = [], stock_data = [], plot = null } = data || {};

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <div className="w-full pt-16 sm:pt-24">
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
              indicator: "flex justify-center bg-transparent w-full h-full",
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
        <div className="flex flex-auto justify-center w-full mx-auto"></div>
      </div>
    </div>
  );
}

export default BackgroundAIContent;
