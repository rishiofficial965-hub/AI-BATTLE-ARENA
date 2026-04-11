import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import battleApi from '../../services/api';

export const conductBattle = createAsyncThunk(
  'battle/conductBattle',
  async (message, { rejectWithValue }) => {
    try {
      const data = await battleApi.conductBattle(message);
      return {
        id: Date.now().toString(),
        problem: message,
        ...data
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to initiate battle.');
    }
  }
);

const initialState = {
  history: [],
  currentBattle: null,
  loading: false,
  error: null,
};

const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {
    setCurrentBattle: (state, action) => {
      state.currentBattle = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(conductBattle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentBattle = null;
      })
      .addCase(conductBattle.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBattle = action.payload;
        state.history = [action.payload, ...state.history];
      })
      .addCase(conductBattle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentBattle, clearError } = battleSlice.actions;
export default battleSlice.reducer;
