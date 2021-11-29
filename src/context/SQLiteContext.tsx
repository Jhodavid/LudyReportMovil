import React, { createContext, useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Dialog, Paragraph, Portal } from "react-native-paper";
// import axios from 'axios';
import { openDatabase } from 'react-native-sqlite-storage';

export const SQLiteContext = createContext(undefined);

const db = openDatabase({
  name: 'ReportesDB',
  location: 'default',
},
  () => { },
  error => { console.log(error) }
);

export const SQLiteProvider = (props: any) => {

  // STATE PASAR DATOS ENTRE MODALES
  const [codigoStateModal, guardarCodigoStateModal] = useState("");
  const [descripcionStateModal, guardarDescripcionStateModal] = useState("");
  const [urlFotoStateModal, guardarUrlFotoStateModal] = useState("");


  const [descripcion, setDescripcion] = useState("");
  const [urlFoto, setUrlFoto] = useState("");

  const [reportes, setReportes] = useState(null);

  const crearTabla = () => {
    db.transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS reportes (codigo INTEGER PRIMARY KEY AUTOINCREMENT, descripcion VARCHAR(500), urlfoto VARCHAR(150))`,
        [],
        (sqlTxn, res) => {
          console.log("table created successfully");
        },
        error => {
          console.log("error on creating table " + error.message);
        },
      );
    });
  };

  const addReporte = () => {

    db.transaction(txn => {
      txn.executeSql(
        `INSERT INTO reportes (descripcion, urlfoto) VALUES (?,?)`,
        [descripcion, urlFoto],
        (sqlTxn, res) => {
          console.log(`Reporte agregado con exito ${descripcion} ${urlFoto}`);
          getReportes();
          setDescripcion('');
          setUrlFoto('');
        },
        error => {
          console.log("error on adding reportes " + error.message);
        },
      );
    });
  };

  const getReportes = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM reportes ORDER BY codigo DESC`,
        [],
        (sqlTxn, res) => {
          console.log("reportes retrieved successfully");
          let len = res.rows.length;

          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ codigo: item.codigo, descripcion: item.descripcion, urlfoto: item.urlfoto });
            }
            setReportes(results);

            // console.log("reportes");

            // reportes.forEach(reporte => {
            //     console.log("Codigo: "+reporte.codigo+" Descripcion: "+reporte.descripcion+" urlFoto: "+reporte.urlfoto);
            // });
          }
          console.log("No hay nada");
        },
        error => {
          console.log("error on getting reportes " + error.message);
        },
      );
    });
  };

  const removeReporte = (codigo: number, urlFoto: string) => {
    db.transaction(txn => {
      txn.executeSql(
        `DELETE FROM reportes
        WHERE codigo=${codigo}`,
        [],
        (sqlTxn, res) => {
          console.log("reportes delete successfully");
          getReportes();

          ///////////////
          //ELIMINAR FOTO /// REQUIERE METODO PARA ELIMINAR AL EDITA O CREAR
          ///////////////

          console.log("No hay nada");
        },
        error => {
          console.log("error on delete reporte " + error.message);
        },
      );
    });
  }

  // const updateData = async () => {
  //   try {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         "UPDATE Users SET Name=?",
  //         [name],
  //         () => { Alert.alert('Success!', 'Your data has been updated.') },
  //         error => { console.log(error) }
  //       )
  //     })
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    const effectReportes = async () => {
      await crearTabla();
      await getReportes();
    }
    effectReportes();
  }, [])

  return (
    <SQLiteContext.Provider
      value={{
        crearTabla,
        getReportes,
        addReporte,
        setDescripcion,
        setUrlFoto,
        reportes,
        removeReporte,
        guardarCodigoStateModal,
        guardarDescripcionStateModal,
        guardarUrlFotoStateModal,
        codigoStateModal,
        descripcionStateModal,
        urlFotoStateModal,
      }}
    >
      {props.children}
    </SQLiteContext.Provider>
  )
}


const styles = StyleSheet.create({
  dialogFoto: {
    flex: 1,
    position: 'relative',
    // width: `${width}`
  }
});