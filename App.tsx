import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarcodeScanningResult, CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions()
  const [scannedValue, setScannedValue] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState<boolean>(false)

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera usage permission has not been given</Text>
        <Button title="Give permission" onPress={requestPermission} />
      </View>
    )
  }

  const handleBarCodeScanner = ( result: BarcodeScanningResult ) => {
    setScannedValue(result.data)
    setIsScanning(false)
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8']
        }}
        onBarcodeScanned={isScanning ? handleBarCodeScanner : undefined}
      />
      <View style={styles.resultView}>
        <Text style={styles.result}>Barcode: {scannedValue ?? ""}</Text>
        <Button 
          title={scannedValue ? "Scan again" : "Scan"} 
          onPress={() => {
            setScannedValue(null)
            setIsScanning(true)
          }} 
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  resultView: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    fontSize: 20,
    marginBottom: 10,
    color: '#fff',
  },
});
