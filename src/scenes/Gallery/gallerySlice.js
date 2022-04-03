import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchList } from '../../helpers/utils';

const initialState = {
  lists: {
    people: null,
    species: null,
    films: null,
    starships: null,
  },
  filters: {
    film: '',
    species: '',
    from: '',
    to: '',
  },
};

// Async thunk to fetch a swapi list
export const fetchSwapiList = createAsyncThunk(
  'gallery/fetchList',
  async (...args) => await fetchList(...args),
);

// Reducer
export const galleryReducer = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {...state.filters, ...action.payload};
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSwapiList.fulfilled, (state, action) => {
      state.lists = {...state.lists, ...action.payload};
    });
  },
});

// Selectors
export const selectLists = (state) => state.gallery.lists;
export const selectFilters = (state) => state.gallery.filters;

export const { setFilters } = galleryReducer.actions

export default galleryReducer.reducer;
