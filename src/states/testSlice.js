
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  items: [],
  pagination: [],
  lastSearch: '',
  fulfilled: [],
  itemsLoaded: false,
  loading: false,
  error: null,
}; 

export const fetchWatchedMovies = createAsyncThunk(
  'movies/fetchWatchedMovies',
  async ({ page, limit } = {}, thunkAPI) => {
    try {
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

      const totalItems = filtered.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const paginatedItems = filtered.slice(startIndex, endIndex);

      return {
        movies: paginatedItems,
        pagination: {
          page,
          limit,
          totalItems,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        }
      };
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
    },
    changePage: (state, action) => {
      const newPage = action.payload;
      if (newPage < 1 || newPage > (state.pagination?.totalPages || 1)) {
        return;
      }
      state.pagination.page = newPage;
      // state.pagination.page++
    },
    addOne: (state, action) => {
      state.pagination.page++
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
        state.pagination = action.payload.pagination;
        state.items = action.payload.movies;
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