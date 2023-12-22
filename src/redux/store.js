import {configureStore} from '@reduxjs/toolkit';
import adReducer from './features/adSlice';

const store = configureStore({
  reducer: {
    applovin: adReducer,
  },
});

export default store;
