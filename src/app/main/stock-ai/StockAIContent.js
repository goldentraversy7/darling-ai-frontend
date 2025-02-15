import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";

import {
  selectStockLoading,
  selectStock,
  getStock,
  selectStockMsg,
  selectStockStatus,
} from "app/store/stockSlice";
import { useMessage } from "app/shared-components/NotistackProvider";

import MarketTrends from "./tabs/MarketTrends";
import SocialMedia from "./tabs/SocialMedia";
import FuseLoading from "@fuse/core/FuseLoading";

/**
 * The ProjectStockAIApp page.
 */
function StockAIContent() {
  const message = useMessage(); // Hook for notifications
  const [selectedTab, setSelectedTab] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const data = useSelector(selectStock);
  const msg = useSelector(selectStockMsg);
  const status = useSelector(selectStockStatus);
  const loading = useSelector(selectStockLoading);
  const { news_articles = [], stock_data = [], predictions = [] } = data || {};

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  useEffect(() => {
    if (status == 200) {
      message.success(msg);
    }
    if (status == 202) {
      message.info(msg);
    }
  }, [status]);

  if (loading) return <FuseLoading />;

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
        <div className="flex flex-auto justify-center w-full mx-auto">
          {selectedTab === 0 && (
            <MarketTrends data={stock_data} predictions={predictions} />
          )}
          {selectedTab === 1 && <SocialMedia articles={news_articles} />}
        </div>
      </div>
    </div>
  );
}

export default StockAIContent;
