import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stockService } from "../services/stockService";

export const getStock = createAsyncThunk("stock/getStock", async (params) => {
  try {
    const response = await stockService.getStock(params);
    return response;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    throw error; // Pass error to rejected state
  }
});

export const selectStockLoading = ({ stock }) => stock.loading;
export const selectStock = ({ stock }) => stock.data;

const initialState = {
  loading: false,
};

const stockSlice = createSlice({
  name: "stock",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStock.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStock.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload?.data;
      })
      .addCase(getStock.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default stockSlice.reducer;
