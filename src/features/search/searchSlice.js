import { createAsyncThunk, createSlice, createSelector } from '@reduxjs/toolkit';

export const getSearchQueryURL = query => `https://mobile-staging.gametime.co/v1/search?q=${query}`

export const search = createAsyncThunk(
  'search/query',
  async (query) => {
    const response = await fetch(getSearchQueryURL(query));
    return await response.json();
  }
);

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    // The most recent search request, to prevent old queries from overwriting the most recent one.
    activeRequestID: null,
    error: null,

    events: [],
    performers: [],
    venues: []
  },
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(search.pending, (state, action) => {
        // For pending, since it happens immediately, the current action is always the most recent one.
        state.activeRequestID = action.meta.requestId;
      
        // When starting a new request, clear the error state.
        state.error = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        // If the fulfilled query is not the active query, then ignore it.
        if (state.activeRequestID !== action.meta.requestId) {
          return;
        }

        const { events = [], performers = [], venues = [] } = action.payload;

        state.events = events;
        state.performers = performers;
        state.venues = venues;

        state.activeRequestID = null;
      })
      .addCase(search.rejected, (state, action) => {
        // If the fulfilled query is not the active query, then ignore it.
        if (state.activeRequestID !== action.meta.requestId) {
          return;
        }

        state.error = action.error;
      });
  }
});

export const selectSearch = (state = {}) => state?.search ?? {};

export const selectEvents = createSelector(
  selectSearch,
  state => state?.events ?? [])
;

export const selectPerformers = createSelector(
  selectSearch,
  state => state?.performers ?? [])
;

export const selectVenues = createSelector(
  selectSearch,
  state => state?.venues ?? [])
;


export default searchSlice.reducer;
