import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMockList, fetchList } from '../../helpers/swapiCall';

const initialState = {
  lists: {
    people: null,
    species: null,
    films: null,
    starships: null,
  },
};

// Async thunk to fetch a swapi list
export const fetchSwapiList = createAsyncThunk(
  'gallery/fetchList',
  async (...args) => await fetchMockList(...args),
  // async (...args) => await fetchList(...args),
);

// Reducer
export const galleryReducer = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSwapiList.fulfilled, (state, action) => {
      state.lists = {...state.lists, ...action.payload};
    });
  },
});

// Selectors
export const selectLists = (state) => state.gallery.lists;

export default galleryReducer.reducer;
