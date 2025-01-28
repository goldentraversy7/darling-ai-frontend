import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { backgroundService } from "../services/backgroundService";

export const fetchBackgroundNews = createAsyncThunk(
  "background/news",
  async (params) => {
    try {
      const response = await backgroundService.fetchBackgroundNews(params);
      return response;
    } catch (error) {
      console.error("Error fetching stock data:", error);
      throw error; // Pass error to rejected state
    }
  }
);

export const selectSearchLoading = ({ background }) => background.loading;
export const selectBackgroundNews = ({ background }) => background.news;

const initialState = {
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
      });
  },
});

export default backgroundSlice.reducer;
