import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

interface Props {
    codigo: number,
    descripcion: string,
    urlFoto: string
}


export const CardReportesComponent = ({codigo, descripcion, urlFoto}: Props) => {

    //DIMENSIONES DE PANTALLA (NO LO USO AÚN)
    const { width, height } = useWindowDimensions();

    return (
        <>
            <Card style={{marginTop: 6}}>
                <Card.Content style={styles.cardContent}>
                    <Title>Reporte # {codigo}</Title>

                    <View style={styles.contenido}>
                        <View style={styles.contenedorDescripcion}>
                            <Text style={styles.tituloDescripcion}>Descripción:</Text>
                            <ScrollView>
                                <Paragraph style={styles.parrafoDescripcion}>{descripcion}</Paragraph>
                            </ScrollView>
                        </View>

                        <View style={styles.imagenBton} >
                            {/* <Card.Cover style={styles.imagen} source={{ uri: 'https://picsum.photos/721' }} /> */}
                            <Card.Cover style={styles.imagen} source={{ uri: 'file:///data/user/0/com.ludyreportmovil/cache/Camera/d6f0d78f-9e5f-4008-8169-649b9e5ba3c2.jpg' }} />
                            <Card.Cover style={styles.imagen} source={{ uri: `${urlFoto}` }} />
                            <View style={styles.botonEditar}>
                                <Button  icon="circle-edit-outline" mode="contained" onPress={() => console.log('Pressed')}>
    
                                </Button>
                            </View>
                        </View>

                    </View>
                </Card.Content>
            </Card>
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
        height: 220
    },
    cardContent: {
        paddingHorizontal: 4,
        paddingTop: 1,
        width: '100%'
    },
    parrafoDescripcion: {
        marginTop: 5,
    },
    imagenBton:{
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