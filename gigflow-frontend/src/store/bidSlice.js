import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const createBid = createAsyncThunk(
  'bids/createBid',
  async ({ gigId, bidData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/bids/gig/${gigId}`, bidData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGigBids = createAsyncThunk(
  'bids/fetchGigBids',
  async (gigId) => {
    const response = await api.get(`/bids/gig/${gigId}`);
    return response.data;
  }
);

export const acceptBid = createAsyncThunk(
  'bids/acceptBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/bids/${bidId}/accept`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMyBids = createAsyncThunk(
  'bids/fetchMyBids',
  async () => {
    const response = await api.get('/bids/my-bids');
    return response.data;
  }
);

const bidSlice = createSlice({
  name: 'bids',
  initialState: {
    bids: [],
    myBids: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.myBids.unshift(action.payload);
      })
      .addCase(createBid.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchGigBids.fulfilled, (state, action) => {
        state.bids = action.payload;
      })
      .addCase(acceptBid.fulfilled, (state, action) => {
        const bidIndex = state.bids.findIndex(bid => bid._id === action.payload.bid._id);
        if (bidIndex !== -1) {
          state.bids[bidIndex] = action.payload.bid;
        }
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.myBids = action.payload;
      });
  },
});

export const { clearError } = bidSlice.actions;
export default bidSlice.reducer;