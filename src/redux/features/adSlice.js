import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Platform} from 'react-native';
import {AppLovinMAX} from 'react-native-applovin-max';

const SDK_KEY =
  'VirrFkoTWvaopQTzfrGgT2ucy3KoCvTTgcl7vMZGkT_QZtz2DDB-Ly5PAeRyIxOk-xcWtSIVRVLverke5IQI2S';
const MREC_AD_UNIT = Platform.select({android: '2c7da55de02005fb'});

const adLoadState = {
  notLoaded: 'NOT_LOADED',
  loading: 'LOADING',
  loaded: 'LOADED',
};

const INITIAL_ADSTATE = {
  statusText: 'Initializing APPPLOVIN SDK...',
  initialized: false,
  initializationError: '',
  mrecAdUnit: MREC_AD_UNIT,
  adLoadState: adLoadState.notLoaded,
};

export const initializeApplovin = createAsyncThunk(
  'applovin/initialize',
  async (data, thunkAPI) => {
    if (!(await AppLovinMAX.isInitialized())) {
      let config = await AppLovinMAX.initialize(SDK_KEY);
      console.log(config);
      return thunkAPI.fulfillWithValue('initialized');
    } else {
      return thunkAPI.fulfillWithValue('initialized');
    }
  },
);

const adSlice = createSlice({
  name: 'applovin',
  initialState: INITIAL_ADSTATE,
  extraReducers: builder => {
    builder
      .addCase(initializeApplovin.pending, state => {
        state.statusText = 'Initializing APPPLOVIN SDK...';
        state.initializationError = '';
        state.initialized = false;
      })
      .addCase(initializeApplovin.fulfilled, state => {
        state.statusText = 'APPLOVIN Initialized';
        state.initialized = true;
      })
      .addCase(initializeApplovin.rejected, (state, action) => {
        state.initialized = false;
        state.statusText = 'Initialization failed..';
        state.initializationError =
          action.error.message || 'Unknown error occurred...';
      });
  },
});

export default adSlice.reducer;
