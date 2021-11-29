import React, { useContext } from 'react';
import { StyleSheet, Text, useWindowDimensions, View, ScrollView, TouchableOpacity, Touchable, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, Portal, Modal, Provider, Dialog } from 'react-native-paper';
import { SQLiteContext } from '../context/SQLiteContext';

interface Props {
    codigo: number,
    descripcion: string,
    urlFoto: string,
    showDialog: () => void,
    GuardarUrlFotoDialog: any,
    showDialogEditarEliminar: any,
    guardarCodigoEliminar: any,
    guardarUrlEliminar: any,
}

export const CardReportesComponent = ({ codigo, descripcion, urlFoto, showDialog, GuardarUrlFotoDialog, showDialogEditarEliminar, guardarCodigoEliminar, guardarUrlEliminar }: Props) => {

    //DIMENSIONES DE PANTALLA (NO LO USO AÚN)
    const { width, height } = useWindowDimensions();

    const { crearTabla, getReportes, addReporte, setDescripcion, setUrlFoto, reportes, removeReporte, guardarCodigoStateModal, guardarDescripcionStateModal, guardarUrlFotoStateModal }: any = useContext(SQLiteContext);

    const AsignarUrlFotoYMostrar = () => {
        GuardarUrlFotoDialog(urlFoto);
        showDialog();
    }

    const MostrasEditarEliminar = () => {
        showDialogEditarEliminar();
        guardarCodigoEliminar(codigo);
        guardarUrlEliminar(urlFoto);

        guardarCodigoStateModal(codigo);
        guardarDescripcionStateModal(descripcion);
        guardarUrlFotoStateModal(urlFoto);
    }

    return (
        <>
            <Provider>
                <Card style={{ marginTop: 6 }}>
                    <Card.Content style={styles.cardContent}>
                        <Title>Reporte # {codigo}</Title>

                        <View style={styles.contenido}>
                            <TouchableWithoutFeedback onLongPress={MostrasEditarEliminar}>
                                <View style={styles.contenedorDescripcion}>
                                    <Text style={styles.tituloDescripcion}>Descripción:</Text>
                                    <ScrollView>
                                        <Paragraph style={styles.parrafoDescripcion}>{descripcion}</Paragraph>
                                    </ScrollView>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={styles.imagenBton} >
                                <TouchableOpacity onPress={AsignarUrlFotoYMostrar}>
                                    <Card.Cover style={styles.imagen} source={{ uri: `${urlFoto}` }} />
                                </TouchableOpacity>
                                <View style={styles.botonEditar}>
                                    <Button icon="circle-edit-outline" mode="contained" onPress={MostrasEditarEliminar}>

                                    </Button>
                                </View>
                            </View>

                        </View>
                    </Card.Content>
                </Card>

            </Provider>
        </>
    )
}

const styles = StyleSheet.create({
    tituloDescripcion: {
        fontSize: 20,
        backgroundColor: '#86b3bb47',
        maxWidth: 120,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 2,
        paddingHorizontal: 3
    },

    contenedorDescripcion: {
        backgroundColor: '#6abff034',
        borderRadius: 10,
        width: '70%',
        // height: 220,
        height: 'auto',
    },
    cardContent: {
        paddingHorizontal: 4,
        paddingTop: 1,
        width: '100%'
    },
    parrafoDescripcion: {
        marginTop: 5,
    },
    imagenBton: {
        width: '29%',
    },
    imagen: {
        padding: 10,
        borderRadius: 20,
        marginLeft: '5%',
        height: 170
    },
    contenido: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: "wrap",
    },
    botonEditar: {
        width: '19%',
        height: 50,
        color: '#fff',
        paddingHorizontal: '23%',
        paddingTop: '10%'
    }
});