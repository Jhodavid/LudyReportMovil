import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { SQLiteContext } from '../context/SQLiteContext';
import { CardReportesComponent } from './CardReportesComponent';

interface Prods {
    showDialog: () => void,
    GuardarUrlFotoDialog: any,
    showDialogEditarEliminar: any,
    guardarCodigoEliminar: any,
    guardarUrlEliminar: any
}

export const ListaCardsComponent = ({ showDialog, GuardarUrlFotoDialog, showDialogEditarEliminar, guardarCodigoEliminar, guardarUrlEliminar }: Prods) => {

    const { crearTabla, getReportes, reportes }: any = useContext(SQLiteContext);

    // console.log(reportes);

    useEffect(() => {
        const effectReportes = async () => {
            await crearTabla();
            await getReportes();
        }
        effectReportes();
    }, [])

    return (
        <View>

            {reportes
                ?
                reportes.map((reporte: any) => (
                    <CardReportesComponent
                        key={reporte.codigo}
                        reporte={reporte}
                        showDialog={showDialog}
                        GuardarUrlFotoDialog={GuardarUrlFotoDialog}
                        showDialogEditarEliminar={showDialogEditarEliminar}
                        guardarCodigoEliminar={guardarCodigoEliminar}
                        guardarUrlEliminar={guardarUrlEliminar}
                    />
                ))
                : null}

        </View>
    )
}
