import {StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {initializeApplovin} from './src/redux/features/adSlice';
import {AdView, AdFormat} from 'react-native-applovin-max';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const applovin = useSelector(state => state.applovin);
  const {statusText, mrecAdUnit, initialized} = applovin;
  const dispatch = useDispatch();

  console.log(statusText);
  console.log(initialized);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    console.log('App opened');
    if (!initialized) {
      dispatch(initializeApplovin());
    }
  }, []);

  return (
    <View>
      <Text>App</Text>
      {initialized && (
        <>
          <AdView
            adUnitId={mrecAdUnit}
            adFormat={AdFormat.MREC}
            style={styles.mrec}
            onAdLoaded={adInfo => {
              console.log('MREC ad loaded from ' + adInfo.networkName);
            }}
            onAdLoadFailed={errorInfo => {
              console.log(
                'MREC ad failed to load with error code ' +
                  errorInfo.code +
                  ' and message: ' +
                  errorInfo.message,
              );
            }}
            onAdClicked={adInfo => {
              console.log('MREC ad clicked');
            }}
            onAdExpanded={adInfo => {
              console.log('MREC ad expanded');
            }}
            onAdCollapsed={adInfo => {
              console.log('MREC ad collapsed');
            }}
            onAdRevenuePaid={adInfo => {
              console.log('MREC ad revenue paid: ' + adInfo.revenue);
            }}
          />

          <AdView
            adUnitId={mrecAdUnit}
            adFormat={AdFormat.MREC}
            style={styles.mrec}
            onAdLoaded={adInfo => {
              console.log('MREC ad loaded from ' + adInfo.networkName);
            }}
            onAdLoadFailed={errorInfo => {
              console.log(
                'MREC ad failed to load with error code ' +
                  errorInfo.code +
                  ' and message: ' +
                  errorInfo.message,
              );
            }}
            onAdClicked={adInfo => {
              console.log('MREC ad clicked');
            }}
            onAdExpanded={adInfo => {
              console.log('MREC ad expanded');
            }}
            onAdCollapsed={adInfo => {
              console.log('MREC ad collapsed');
            }}
            onAdRevenuePaid={adInfo => {
              console.log('MREC ad revenue paid: ' + adInfo.revenue);
            }}
          />
        </>
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mrec: {
    width: '100%',
    height: 250,
    backgroundColor: 'red',
    bottom: Platform.select({
      ios: 36, // For bottom safe area
      android: 0,
    }),
  },
});
