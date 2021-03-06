import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Modal, Button, Dialog } from 'react-native-paper';
import { Portal } from 'react-native-paper';
import { SQLiteContext } from '../context/SQLiteContext';

import { CameraComponent } from './CameraComponent';

interface Props {
    visible: boolean,
    onDismiss: () => void;
    editar_Crear: any
}


export const ModalCrearEditarComponent = ({ visible, onDismiss, editar_Crear }: Props) => {

    const containerStyle: any = {
        backgroundColor: 'white',
        paddingVertical: 10,
        maxWidth: '95%',
        alignSelf: 'center',
        borderRadius: 10
    };

    const [visibleD, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    const { addReporte, updateReporte, reporteStateModal }: any = useContext(SQLiteContext);

    const [descripcion, setDescripcion] = useState(reporteStateModal.descripcion);
    const [urlFoto, setUrlFoto] = useState(reporteStateModal.urlfoto);

    const enviarYCerrar = () => {
        if (descripcion != null && urlFoto != null) {
            onDismiss();
            addReporte(descripcion, urlFoto);
        }
    }

    const EditarYCerrar = () => {
        // setDescripcion(reporteStateModal.descripcion)
        updateReporte(reporteStateModal.codigo, descripcion, urlFoto);
        onDismiss();
    }

    useEffect(() => {
        setDescripcion(reporteStateModal.descripcion)
        setUrlFoto(reporteStateModal.urlfoto)
    }, [reporteStateModal])

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
                        value={editar_Crear ? reporteStateModal.codigo.toString() : ""}
                        disabled={true}
                    />
                    <Text style={styles.titulosI}>Descripción:</Text>
                    <TextInput
                        multiline
                        style={styles.textArea}
                        mode="outlined"
                        placeholder="Descripción del reporte..."
                        onChangeText={setDescripcion}
                        value={editar_Crear ? descripcion : null}
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
                        {editar_Crear
                            ? <Button style={[styles.btnS, styles.btnSCrearEditar]} mode="contained" onPress={() => EditarYCerrar()}>
                                Editar
                            </Button>
                            :
                            <Button style={[styles.btnS, styles.btnSCrearEditar]} mode="contained" onPress={() => enviarYCerrar()}>
                                Crear
                            </Button>
                        }
                    </View>
                </View>
            </Modal>

            <Dialog style={styles.camaraDialog} visible={visibleD} onDismiss={hideDialog}>
                <CameraComponent
                    hideDialog={hideDialog}
                    setUrlFoto={setUrlFoto}
                />
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
        width: '80%',
        marginHorizontal: '10%',
        borderRadius: 5,

    }
});