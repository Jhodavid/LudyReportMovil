
import React from 'react';
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

// import { CameraComponent } from './src/components/CameraComponent';


import { BotonNuevoComponent } from './src/components/BotonNuevoComponent';
import { CardReportesComponent } from './src/components/CardReportesComponent';
import { ModalCrearEditarComponent } from './src/components/ModalCrearEditarComponent';


export const App = () => {

  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (

    <Provider>
      <View style={styles.barra}>
        <Image style={styles.imagen} source={require("./src/assets/logo.png")}></Image>
        <Text style={styles.titulo}>LudyReport</Text>
      </View>

      <ScrollView>
        <View style={styles.contenedor}>
          <CardReportesComponent />
          <CardReportesComponent />
        </View>
      </ScrollView>

      <ModalCrearEditarComponent visible={visible} onDismiss={hideModal}/>
      

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




  modal: {
    height: 400,
    width: 200
  }
});
