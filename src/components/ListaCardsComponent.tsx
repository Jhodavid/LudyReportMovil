import React, { useContext, useEffect } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SQLiteContext } from '../context/SQLiteContext';
import { CardReportesComponent } from './CardReportesComponent';

interface Prods {
    showDialog: () => void
    GuardarUrlFotoDialog: any
}

export const ListaCardsComponent = ({showDialog, GuardarUrlFotoDialog}: Prods) => {

    const {crearTabla, getReportes, addReporte, setDescripcion, setUrlFoto, reportes}: any = useContext(SQLiteContext);

    console.log(reportes);

    useEffect(() => {
        const effectReportes = async () => {
            await crearTabla();
            await getReportes();
        }
        effectReportes();
    }, [])

    return (
        <View>

            {(reportes) 
            ?
            reportes.map((reporte: any) => (
                <CardReportesComponent
                  key={reporte.codigo}
                  codigo={reporte.codigo}
                  descripcion={reporte.descripcion}
                  urlFoto={reporte.urlfoto}
                  showDialog={showDialog}
                  GuardarUrlFotoDialog={GuardarUrlFotoDialog}
                />
            ))
            : null}

        </View>
    )
}
