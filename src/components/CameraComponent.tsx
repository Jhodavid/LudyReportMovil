import React from 'react'

import { View, StyleSheet } from 'react-native'
import {RNCamera} from 'react-native-camera'
import {useCamera} from 'react-native-camera-hooks'
import { Button } from 'react-native'

interface Props {
    hideDialog: () => void;
    setUrlFoto: any;
}

export const CameraComponent = ({hideDialog, setUrlFoto}: Props) => {

    const [{cameraRef},{takePicture}] = useCamera(undefined);

    const CapturarYCerrarCamara = async () => {
        // console.log(cameraRef);
        
        try {
            const data = await takePicture();
            hideDialog();
            console.log(data.uri);
            setUrlFoto(data.uri);
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
                    onPress={() => CapturarYCerrarCamara()}
                />
            </View>
                
                    
            </RNCamera>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
    },
    preview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        // borderWidth: 7,
        // borderColor: '#a1e5f0',
        // borderRadius: 5,
        // maxHeight: 100
    },
    bton: {
        paddingBottom: 20
    }
});