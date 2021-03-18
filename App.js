import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation'; 
import ScanScreen from './screens/ScanScreen';

export default function App() {
  return (
    <View>  
    <Appcontainer></Appcontainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
var switchContainer = createSwitchNavigator({
  ScanScreen : ScanScreen
});
const Appcontainer = createAppContainer(switchContainer);