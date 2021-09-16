/**
 * Do the following imports.
 * The reducer is from coins.js file
 */
import { configureStore } from '@reduxjs/toolkit';
import reducer from './coins';

/**
 * Now lets create the store and export it to make it available to our app.
 */
const store = configureStore({
  reducer,
});

export default store;
