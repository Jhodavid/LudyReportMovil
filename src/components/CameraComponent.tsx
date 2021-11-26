import React from 'react'

import { View, StyleSheet } from 'react-native'
import {RNCamera} from 'react-native-camera'
import {useCamera} from 'react-native-camera-hooks'
import { Button } from 'react-native'

export const CameraComponent = () => {

    const [{cameraRef},{takePicture}] = useCamera(undefined);

    const captureHandle = async () => {
        try {
            const data = await takePicture();
            console.log(data.uri);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.body}>
            <RNCamera
                ref={cameraRef}
                type={RNCamera.Constants.Type.back}
                style={styles.preview}
            >
            <View
                style={styles.bton}
            >
                <Button
                    
                    title="Capturar"
                    color= '#1eb900'
                    onPress={() => captureHandle()}
                />
            </View>
                
                    
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    bton: {
        paddingBottom: 20
    }
});