
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  lastSearch: '',
  itemsLoaded: false,
  loading: false,
  error: null,
}; 

export const fetchWatchedMovies = createAsyncThunk(
  'movies/fetchWatchedMovies',
  async (_, thunkAPI) => {
    try {
      // alert('run')
      const response = await fetch('https://lurid-origins-api.vercel.app/api/movies');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      let filtered = data.filter(item => item.watched === true);
      filtered.sort((a, b) => {
        const yearA = a.year || a.releaseYear || a.publishedYear || 0;
        const yearB = b.year || b.releaseYear || b.publishedYear || 0;
        return yearA - yearB; // descending (newest first)
      });
      return filtered;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    clearMovies: (state) => {
      state.items = [];
      state.error = null;
    },
    changeSearch: (state, action) => {
      state.lastSearch = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsLoaded = true;
        state.items = action.payload;
      })
      .addCase(fetchWatchedMovies.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.payload || 'Something went wrong';
        state.error = 'HEY NOW' || 'Something went wrong';
      });
  },
});

export const actions = counterSlice.actions
export default counterSlice.reducer