import React from 'react';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';



export const CardReportesComponent = () => {

    const { width, height } = useWindowDimensions();

    return (
        <>
            <Card style={{marginTop: 6}}>
                <Card.Content style={styles.cardContent}>
                    <Title>Reporte # 12345</Title>

                    <View style={styles.contenido}>
                        <View style={styles.contenedorDescripcion}>
                            <Text style={styles.tituloDescripcion}>Descripción:</Text>
                            <Paragraph style={styles.parrafoDescripcion}>Card content</Paragraph>
                        </View>

                        <View style={styles.imagenBton} >
                            <Card.Cover style={styles.imagen} source={{ uri: 'https://picsum.photos/720' }} />
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