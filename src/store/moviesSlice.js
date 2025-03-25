import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movies: [],
  loading: false,
  error: null,
};

const BASE_URL = 'https://082591db2a551cac.mokky.dev/milm';

// const token = localStorage.getItem('token')

export const getAllMovies = createAsyncThunk("movies/getAll", async (_, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data ? Object.entries(data).map(([id, movie]) => ({ id, ...movie })) : [];
  } catch (error) {
    console.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addMovie = createAsyncThunk("movies/addMovie", async (movieData, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(BASE_URL, movieData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return { id: response.data.name, ...movieData };
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});

export const deleteMovie = createAsyncThunk("movies/deleteMovie", async (id, { rejectWithValue }) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return id;
  } catch (error) {
    console.error(error);
    return rejectWithValue(error.message);
  }
});



export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.error = action.payload;
      })
   
  },
});

export default moviesSlice.reducer;


