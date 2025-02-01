import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TextField, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import memoize from "memoize-one";

import {
  selectSearchLoading,
  selectBackgroundNews,
  selectBackgroundSocialPosts,
  selectBackgroundPublicReports,
  fetchBackgroundNews,
  fetchBackgroundSocialPosts,
  fetchBackgroundPublicReports,
} from "app/store/backgroundSlice";

import News from "./tabs/News";
import SocialMedia from "./tabs/SocialMedia";
import PublicRecords from "./tabs/PublicRecords";

/**
 * The ProjectBackgroundAIApp page.
 */
function BackgroundAIContent() {
  const loading = useSelector(selectSearchLoading);
  const newsData = useSelector(selectBackgroundNews);
  const socialMediaData = useSelector(selectBackgroundSocialPosts);
  const publicRecordsData = useSelector(selectBackgroundPublicReports);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("technology");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
    if (!query) return;
    if (value == 0) {
      fetchNews(query);
    }
    if (value == 1) {
      fetchSocialPosts(query);
    }
    if (value == 2) {
      fetchPublicReports(query);
    }
  };

  const handleSearch = () => {
    if (!query) return;
    if (selectedTab == 0) {
      fetchNews(query);
    }
    if (selectedTab == 1) {
      fetchSocialPosts(query);
    }
    if (selectedTab == 2) {
      fetchPublicReports(query);
    }
  };

  const fetchNews = memoize((query) => {
    dispatch(fetchBackgroundNews({ query }));
  });

  const fetchSocialPosts = memoize((query) => {
    dispatch(fetchBackgroundSocialPosts({ query }));
  });

  const fetchPublicReports = memoize((query) => {
    dispatch(fetchBackgroundPublicReports({ query }));
  });

  return (
    <div className="w-full pt-16 sm:pt-24">
      <div className="w-full pt-16 sm:pt-24">
        <Stack
          spacing={2}
          className="w-full mb-16 px-24"
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
            onClick={handleSearch}
            disabled={loading}
            loading={loading}
          >
            Search
          </LoadingButton>
        </Stack>
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
              label="News Platforms"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Social Media Platforms"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 "
              disableRipple
              label="Public Records"
            />
          </Tabs>
        </div>
        <div className="flex flex-auto justify-center w-full mx-auto">
          {selectedTab === 0 && <News data={newsData} />}
          {selectedTab === 1 && <SocialMedia data={socialMediaData} />}
          {selectedTab === 2 && <PublicRecords data={publicRecordsData} />}
        </div>
      </div>
    </div>
  );
}

export default BackgroundAIContent;
