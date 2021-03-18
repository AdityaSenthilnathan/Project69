import * as React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    scannedData: 'empty',
    buttonState: 'normal'
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted', buttonState: "clicked" });
    //alert("Camera permission granted " + status);
  }

  render() {
    const { hasCameraPermission, scanned, buttonState, scannedData } = this.state;
    if (hasCameraPermission === null) {
      return <View style={styles.container}><Text>Requesting for camera permission</Text></View>;
    }
    if (hasCameraPermission === false) {
      return <View style={styles.container}><Text>No access to camera</Text></View>;
    }
    if (hasCameraPermission == true && scanned == false) {
      //alert("false value");
      //this.setState({hasCameraPermission: null, scanned: false, buttonState: 'normal'});

    }

    if (scanned) {
      return (<View style={styles.container}><Text>Scanned Data : {scannedData}</Text>
      
      <Image style = {styles.image} source={require('../assets/Scanner.jpg')}/>  
        <Button
          title={'Tap to Scan Again'}
          onPress={() => this.setState({ scanned: false })}
        /></View>)

    }
    //alert("outer : " + scanned);


    if (hasCameraPermission && scanned === false) {
      //alert(scanned);

      return (
        <View style={styles.container}>
        
          <BarCodeScanner  onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />}
          <Text>scanned data : {scannedData} </Text>
          <Text>cameraPermission : {String(hasCameraPermission)}</Text>
          <Text>Scanned : {String(scanned)}</Text>
        </View>);

    }
  } 

  handleBarCodeScanned = ({ type, data }) => {
     // alert("word");
    this.setState({ scanned: true });
    this.setState({ scannedData: data });
  };


}





const styles = StyleSheet.create({
  container: {
    fontSize: 10,
    paddingTop: 100,
    paddingLeft: 10,
    paddingBottom: 400,
    backgroundColor: "#f0f0f0",

    flexDirection: 'column'
  } , 
  image: {
    backgroundColor: '#e1e1d1',
    margin: 50  
  }
});
