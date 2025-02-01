import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backgroundService } from "../services/backgroundService";

export const fetchBackgroundNews = createAsyncThunk(
  "background/news",
  async (params) => {
    try {
      const response = await backgroundService.fetchBackgroundNews(params);
      return response;
    } catch (error) {
      console.error("Error fetching news data:", error);
      throw error; // Pass error to rejected state
    }
  }
);
export const fetchBackgroundSocialPosts = createAsyncThunk(
  "background/social",
  async (params) => {
    try {
      const response = await backgroundService.fetchBackgroundSocialPosts(
        params
      );
      return response;
    } catch (error) {
      console.error("Error fetching social posts:", error);
      throw error; // Pass error to rejected state
    }
  }
);
export const fetchBackgroundPublicReports = createAsyncThunk(
  "background/public-record",
  async (params) => {
    try {
      const response = await backgroundService.fetchBackgroundPublicReports(
        params
      );
      return response;
    } catch (error) {
      console.error("Error fetching public reports:", error);
      throw error; // Pass error to rejected state
    }
  }
);

export const selectSearchLoading = ({ background }) => background.loading;
export const selectBackgroundNews = ({ background }) => background.news;
export const selectBackgroundSocialPosts = ({ background }) =>
  background.socialPosts;
export const selectBackgroundPublicReports = ({ background }) =>
  background.publicReports;

const initialState = {
  news: [],
  socialPosts: [],
  publicReports: [],
  loading: false,
};

const backgroundSlice = createSlice({
  name: "background",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackgroundNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBackgroundNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload?.data;
      })
      .addCase(fetchBackgroundNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchBackgroundSocialPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBackgroundSocialPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.socialPosts = action.payload?.data;
      })
      .addCase(fetchBackgroundSocialPosts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchBackgroundPublicReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBackgroundPublicReports.fulfilled, (state, action) => {
        state.loading = false;
        state.publicReports = action.payload?.data;
      })
      .addCase(fetchBackgroundPublicReports.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default backgroundSlice.reducer;
