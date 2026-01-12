import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchGigs = createAsyncThunk(
  'gigs/fetchGigs',
  async (filters = {}) => {
    console.log('Fetching gigs with filters:', filters);
    const response = await api.get('/gigs', { params: filters });
    console.log('Gigs response:', response.data);
    return response.data;
  }
);

export const fetchGig = createAsyncThunk(
  'gigs/fetchGig',
  async (id) => {
    const response = await api.get(`/gigs/${id}`);
    return response.data;
  }
);

export const createGig = createAsyncThunk(
  'gigs/createGig',
  async (gigData, { rejectWithValue }) => {
    try {
      const response = await api.post('/gigs', gigData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMyGigs = createAsyncThunk(
  'gigs/fetchMyGigs',
  async () => {
    const response = await api.get('/gigs/my-gigs');
    return response.data;
  }
);

const gigSlice = createSlice({
  name: 'gigs',
  initialState: {
    gigs: [],
    currentGig: null,
    myGigs: [],
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
      .addCase(fetchGigs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGig.fulfilled, (state, action) => {
        state.currentGig = action.payload;
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.myGigs.unshift(action.payload);
      })
      .addCase(fetchMyGigs.fulfilled, (state, action) => {
        state.myGigs = action.payload;
      });
  },
});

export const { clearError } = gigSlice.actions;
export default gigSlice.reducer;