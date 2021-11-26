import React from 'react';


import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Modal, Button, Dialog, Paragraph } from 'react-native-paper';
import { Portal } from 'react-native-paper';

import { CameraComponent } from './CameraComponent';


// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface Props {
    visible: boolean,
    onDismiss: () => void;
}

export const ModalCrearEditarComponent = ({ visible, onDismiss }: Props) => {


    const containerStyle: any = {
        backgroundColor: 'white',
        paddingVertical: 10,
        maxWidth: '95%',
        alignSelf: 'center',
        borderRadius: 10
    };

    // const cameraPermission = async () => (await Camera.getCameraPermissionStatus());

    const [visibleD, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

    return (

        

        <Portal>
            <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
                <Text style={styles.titulo}>Nuevo Reporte</Text>
                <View style={styles.inputs}>
                    <Text style={styles.titulosI}>Código:</Text>
                    <TextInput
                        style={styles.textField}
                        mode="outlined"
                        placeholder="Por asignación automática"
                        disabled={true}
                    />
                    <Text style={styles.titulosI}>Descripción:</Text>
                    <TextInput
                        multiline
                        style={styles.textArea}
                        mode="outlined"
                        placeholder="Por asignación automática"
                    />
                </View>
                <View style={styles.containerFoto}>
                    <View style={styles.btnFotoContainer}>
                        <Button icon="camera" mode="outlined" onPress={showDialog}>
                            Adjuntar Foto
                        </Button>
                    </View>
                    <View style={styles.botones}>
                        <Button style={[styles.btnS, styles.btnSCancelar]} mode="contained" onPress={onDismiss}>
                            Cancelar
                        </Button>
                        <Button style={[styles.btnS, styles.btnSCrearEditar]} mode="contained" onPress={() => console.log('Pressed')}>
                            Crear
                        </Button>
                    </View>

                </View>
            </Modal>

            <Dialog style={styles.camaraDialog} visible={visibleD} onDismiss={hideDialog}>
                <CameraComponent/>
            </Dialog>
        </Portal>


    )
}

const styles = StyleSheet.create({
    titulo: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomWidth: 1,
        borderBottomColor: '#cee032be',
        marginVertical: 5
    },
    inputs: {
        width: 290,
        alignItems: 'center',
        backgroundColor: '#c5dfe040',
        borderRadius: 10,
        margin: 5,
        paddingBottom: 7

    },
    titulosI: {
        marginTop: 7,
        marginLeft: 17,
        fontSize: 17,
        alignSelf: 'flex-start'
    },
    textField: {
        width: '90%',
    },
    textArea: {
        width: '90%',
        height: 200
    },
    containerFoto: {
        paddingHorizontal: 10
    },
    btnFotoContainer: {
        width: '90%',
        marginHorizontal: '5%',
        fontSize: 20,
        marginBottom: 20
    },
    botones: {
        width: '90%',
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: 'center',
        // padding: '10%'
    },
    btnS: {
        width: '45%',
        marginHorizontal: '2.5%',
        
    },
    btnSCancelar: {
        backgroundColor: '#e42b2b'
    },
    btnSCrearEditar: {
        backgroundColor: '#2663d4'
    },
    camaraDialog: {
        flex: 1,
        width: '82%'
    }
});