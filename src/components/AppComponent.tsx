import React, { useContext, useEffect, useState } from 'react'

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

import { Card, Dialog, Paragraph, Portal, Provider } from 'react-native-paper';

import { BotonNuevoComponent } from './BotonNuevoComponent';
import { CardReportesComponent } from './CardReportesComponent';
import { ModalCrearEditarComponent } from './ModalCrearEditarComponent';


import { SQLiteContext } from '../context/SQLiteContext';
import { ListaCardsComponent } from './ListaCardsComponent';


export const AppComponent = () => {

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [urlFotoDialog, GuardarUrlFotoDialog] = useState('');

  const { crearTabla, getReportes, addReporte, setDescripcion, setUrlFoto, reportes }: any = useContext(SQLiteContext);


  const [visibleD, setVisibleD] = React.useState(false);
  const showDialog = () => setVisibleD(true);
  const hideDialog = () => setVisibleD(false);


  return (

    <Provider>
      <View style={styles.barra}>
        <Image style={styles.imagen} source={require("../assets/logo.png")}></Image>
        <Text style={styles.titulo}>LudyReport</Text>
      </View>

      <ScrollView>
        <View style={styles.contenedor}>

          <ListaCardsComponent
            showDialog={showDialog}
            GuardarUrlFotoDialog={GuardarUrlFotoDialog}
          />

        </View>
      </ScrollView>

      <ModalCrearEditarComponent visible={visible} onDismiss={hideModal} />

      <BotonNuevoComponent onPress={showModal} />

      <Portal>
        <Dialog style={styles.contenedorFoto} visible={visibleD} onDismiss={hideDialog}>
            <Card.Cover style={styles.foto} source={{ uri: `${urlFotoDialog}` }} />
        </Dialog>
      </Portal>

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
  foto: {
    height: '100%',
    margin: 0
  },
  contenedorFoto: {
    flex: 1,
    padding: 0,
    margin: 0
  }

});

