import React, { useContext, useEffect } from 'react'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  useWindowDimensions,
  Button,
  TouchableOpacity
} from 'react-native';

import { Dialog, Provider } from 'react-native-paper';

import { BotonNuevoComponent } from './BotonNuevoComponent';
import { CardReportesComponent } from './CardReportesComponent';
import { ModalCrearEditarComponent } from './ModalCrearEditarComponent';


import { SQLiteContext } from '../context/SQLiteContext';


export const AppComponent = () => {

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { crearTabla, getReportes, addReporte, setDescripcion, setUrlFoto, reportes }: any = useContext(SQLiteContext);

  // useEffect(() => {
  //   const effectReportes = async () => {
  //       await crearTabla();
  //       await getReportes();
  //   }
  //   effectReportes();
  // }, [])

  // const TodosLosReportes = () => {
  //     reportes.map((reporte: any) => {
  //       return (
  //         <CardReportesComponent
  //           key={reporte.codigo}
  //           descripcion={reporte.descripcion}
  //           urlFoto={reporte.urlfoto}
  //         />
  //       )
  //     }
  // }

  console.log(reportes);

  // let TodosLosReportes = reportes.map((reporte: any, reporte.codigo) => {
  //     return (
        // <CardReportesComponent
        //   key={reporte.codigo}
        //   descripcion={reporte.descripcion}
        //   urlFoto={reporte.urlfoto}
        // />
  //     )
  // })


  return (

    <Provider>
      <View style={styles.barra}>
        <Image style={styles.imagen} source={require("../assets/logo.png")}></Image>
        <Text style={styles.titulo}>LudyReport</Text>
      </View>

      <ScrollView>
        <View style={styles.contenedor}>

          {reportes.map((reporte: any) => (
                <CardReportesComponent
                  key={reporte.codigo}
                  codigo={reporte.codigo}
                  descripcion={reporte.descripcion}
                  urlFoto={reporte.urlfoto}
                />
          ))}
          {/* {TodosLosReportes} */}

        </View>
      </ScrollView>

      <ModalCrearEditarComponent visible={visible} onDismiss={hideModal} />

      <BotonNuevoComponent onPress={showModal} />

    </Provider>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: 5
  },
  titulo: {
    marginVertical: 5,
    color: '#fff',
    fontFamily: 'roboto',
    width: '85%',
    fontSize: 32,
    left: '17%',
    paddingTop: 7
  },
  barra: {
    backgroundColor: 'rgb(30, 30, 117)',
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 5
  },
  imagen: {
    width: '15%',
    left: '4%'
  },

});

