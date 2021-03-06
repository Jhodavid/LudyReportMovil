import React, { useContext, useState } from 'react'

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { Card, Dialog, Paragraph, Portal, Provider, Button } from 'react-native-paper';

import { BotonNuevoComponent } from './BotonNuevoComponent';
import { ModalCrearEditarComponent } from './ModalCrearEditarComponent';


import { SQLiteContext } from '../context/SQLiteContext';
import { ListaCardsComponent } from './ListaCardsComponent';


export const AppComponent = () => {

  const [urlFotoDialog, GuardarUrlFotoDialog] = useState('');
  const { removeReporte }: any = useContext(SQLiteContext);


  // MODAL EDITAR CREAR
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // DIALOGO PARA VER FOTOS
  const [visibleD, setVisibleD] = React.useState(false);
  const showDialog = () => setVisibleD(true);
  const hideDialog = () => setVisibleD(false);

  // DIALOGO PARA EDITAR ELIMNAR
  const [visibleEditarEliminar, setVisibleEditarEliminar] = React.useState(false);
  const showDialogEditarEliminar = () => setVisibleEditarEliminar(true);
  const hideDialogEditarEliminar = () => setVisibleEditarEliminar(false);

  const [codigoEliminar, guardarCodigoEliminar] = useState();
  const [urlEliminar, guardarUrlEliminar] = useState();

  const BotonEliminar = () => {
    removeReporte(codigoEliminar, urlEliminar);
    hideDialogEditarEliminar();
  }

  const [editar_Crear, guardarEditar_Crear] = useState(false);

  const BotonEditar = () => {
    guardarEditar_Crear(true);
    hideDialogEditarEliminar();
    showModal();
  }

  const BotonCrear = () => {
    guardarEditar_Crear(false);
    showModal();
  }

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
            showDialogEditarEliminar={showDialogEditarEliminar}
            guardarCodigoEliminar={guardarCodigoEliminar}
            guardarUrlEliminar={guardarUrlEliminar}
          />

        </View>
      </ScrollView>

      <ModalCrearEditarComponent visible={visible} onDismiss={hideModal} editar_Crear={editar_Crear} />

      <BotonNuevoComponent onPress={BotonCrear} />

      <Portal>
        <Dialog style={styles.contenedorFoto} visible={visibleD} onDismiss={hideDialog}>
          <Card.Cover style={styles.foto} source={{ uri: `${urlFotoDialog}` }} />
        </Dialog>
      </Portal>

      <Portal>
        <Dialog visible={visibleEditarEliminar} onDismiss={hideDialogEditarEliminar}>
          <Dialog.Title>Opciones</Dialog.Title>
          <Dialog.Content>
            <Paragraph style={{ fontSize: 16 }}>??Qu?? desea realizar?</Paragraph>
            <Paragraph style={{ fontSize: 11, color: 'red' }}>Mant??n presionado para el??minar*</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <TouchableWithoutFeedback style={[styles.btnS, styles.btnSEliminar]} onLongPress={BotonEliminar}>
              <Button style={[styles.btnS, styles.btnSEliminar]} mode="contained" >Eliminar</Button>
            </TouchableWithoutFeedback>
            <Button style={[styles.btnS, styles.btnSEditar]} mode="contained" onPress={BotonEditar}>Editar</Button>
          </Dialog.Actions>
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
  },
  btnS: {
    width: '35%',
    marginHorizontal: '2.5%',
  },
  btnSEliminar: {
    backgroundColor: '#e42b2b'
  },
  btnSEditar: {
    backgroundColor: '#2663d4'
  },

});

