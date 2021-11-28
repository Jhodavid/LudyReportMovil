import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
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

    const [descripcion, setDescripcion] = useState("");
    const [urlFoto, setUrlFoto] = useState("");

    const [reportes, setReportes] = useState({});

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
        // if (!category) {
        //   Alert("Enter category");
        //   return false;
        // }
    
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
                  results.push({ codigo: item.codigo, descripcion: item.descripcion ,urlfoto: item.urlfoto });
                }
                setReportes(results);

                console.log("reportes");

                reportes.forEach(reporte => {
                    console.log("Codigo: "+reporte.codigo+" Descripcion: "+reporte.descripcion+" urlFoto: "+reporte.urlfoto);
                });
              }
            },
            error => {
              console.log("error on getting reportes " + error.message);
            },
          );
        });
      };



      

    return (
        <SQLiteContext.Provider
            value={{
                crearTabla,
                getReportes,
                addReporte,
                setDescripcion,
                setUrlFoto,
                reportes
            }}
        >
            {props.children}
        </SQLiteContext.Provider>
    )
}