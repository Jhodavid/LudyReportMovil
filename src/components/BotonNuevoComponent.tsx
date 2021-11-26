import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button } from 'react-native-paper';

interface Props {
    onPress: () => void;
}

export const BotonNuevoComponent = ({onPress}: Props) => {
    return (
        <View style={styles.fabLocation}>
            <Button style={styles.boton} icon="bookmark-plus-outline" mode="contained" onPress={onPress}>
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#5856d6',
        width: 30,
        height: 50,
        borderRadius: 100,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 6,
    },
    fabLocation: {
        position: 'absolute',
        bottom: 68,
        right: 13,
        paddingHorizontal: 'auto',
    },
});