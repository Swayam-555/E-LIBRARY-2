import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
export default class TransactionScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            domState: "normal",
            hasCameraPermission: null,
            scanned: false,
            scannedData: ""
        }
    }
    handleCameraPermission = async domstate => {
        const { status } = await Camera.getCameraPermissionsAsync();
        this.setState({
            hasCameraPermission: status === "granted",
            scanned: false,
            domState: domstate
        })
    }
    handleBarCode = async ({ type, data }) => {
        this.setState({
            scannedData: data,
            scanned: true,
            domState: "normal"
        })
    }
    render() {
        const { domState, hasCameraPermission, scanned, scannedData } = this.state;
        if (domState === "scanner") {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCode} />
            )
        }
        return (
            <View style={styles.container}>
                <Text>
                    {hasCameraPermission ? scannedData : "Requesting for access"}
                </Text>
                <TouchableOpacity
                    style={{ backgroundColor: "orange", borderWidth: 2 }}
                    onPress={() => this.handleCameraPermission("scanner")}>
                    <Text>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
