import FusePageSimple from "@fuse/core/FusePageSimple";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import FuseLoading from "@fuse/core/FuseLoading";
import TradingViewTab from "./tabs/TradingView/TradingViewTab";

/**
 * The ProjectDashboardApp page.
 */
function DashboardContent() {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
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
            label="TradingView"
          />
        </Tabs>
      </div>
      <div className="flex flex-auto justify-center w-full mx-auto p-0 sm:p-32">
        {selectedTab === 0 && <TradingViewTab />}
      </div>
    </div>
  );
}

export default DashboardContent;
