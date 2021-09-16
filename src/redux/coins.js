/**
 * don't forget these imports
 * our fetCoins method must be imported from the coinStatsAPI file
 */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  fetchCoins from './coinStatsAPI';

/**
 * Here we are creating a thunk called getCoins that uses the createAsyncThunk method discussed above in the article.
 * We have used the map method to help us just return a few values from the API.
 */
export const getCoins = createAsyncThunk('coins/getCoins', async () => {
  const coins = await fetchCoins();
  return coins.map(({ id, icon, name, rank, price }) => ({ id, icon, name, rank, price }));
});

// This is our slice, it has a name, initialState and the reducers
const coinsSlice = createSlice({
  name: 'coins',
  initialState: {
    coins: [],
    status: null,
  },
  extraReducers: {
    /**
     * The getCoins thunk returns a promise, here we are checking whether the promise is still
     * pending, fullfilled or rejected. At any given state of the promise, we can perform special
     * actions i.e load a loading spinner on the User Interface while the state is still loading
     * to add interactivity in our app.
     */
    [getCoins.pending]: (state) => {
      state.status = 'loading';
    },
    [getCoins.fulfilled]: (state, { payload }) => {
      state.coins = payload;
      state.status = 'success';
    },
    [getCoins.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default coinsSlice.reducer;
