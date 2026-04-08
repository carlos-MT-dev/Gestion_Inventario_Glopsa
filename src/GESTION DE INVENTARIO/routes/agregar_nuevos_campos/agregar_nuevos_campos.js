const express = require("express");
const router = express.Router();
const {
  insertItem,
  insertMarca,
  insertModelo,
} = require("../../mysql-querys/agregar_nuevos_datos/enviar_nuevos_datos"); // ruta correcta

const validarPreexistencia = require("../../mysql-querys/agregar_nuevos_datos/validar_preexistencia_campo");

router.post("/registrar_nuevos_datos", async (req, res) => {
  try {
    //VARIABLES GLOBALES

    let tableName;
    let columnaName;
    let existenciaCampo;

  
    //ESTE APARTADO REGISTRA NUEVOS CAMPOS EN LA BASE DE DATOS
    console.log("Datos nuevos recibidos para su registro en la bd:", req.body);

    if (req.body.txt_nuevo_objeto && req.body.agregar_categoria_objeto) {
      tableName = "item";
      columnaName = "Item";
   
      existenciaCampo = await validarPreexistencia(
        columnaName,
        tableName,
        req.body.txt_nuevo_objeto,
      );

      if (existenciaCampo) {
        return res.json({
          messaje: "El objeto ya existe en la base de datos",
        });
        console.log("El objeto ya existe en la base de datos");
        
      } else {
        console.log("Registrando nuevo objeto en la base de datos");
        await insertItem(req.body);
      }
    }



    if (req.body.txt_nueva_marca && req.body.agregar_categoria_marca) {
      tableName = "marca";
      columnaName = "Marca";
      
      existenciaCampo = await validarPreexistencia(
        columnaName,
        tableName,
        req.body.txt_nueva_marca,
      );
      if (existenciaCampo) {
        return res.json({
          messaje: "El objeto ya existe en la base de datos",
        });
         console.log("El objeto ya existe en la base de datos");
      } else {
        console.log("Registrando nuevo objeto en la base de datos");
        await insertItem(req.body);
      }
    }

    if (req.body.txt_nuevo_modelo && req.body.agregar_categoria_modelo) {
      tableName = "modelo";
      columnaName = "modelo";
    
      existenciaCampo = await validarPreexistencia(
        columnaName,
        tableName,
        req.body.txt_nuevo_modelo,
      );
      if (existenciaCampo) {
        return res.json({
          messaje: "El objeto ya existe en la base de datos",
        });
         console.log("El objeto ya existe en la base de datos");
      } else {
        console.log("Registrando nuevo objeto en la base de datos");
        await insertItem(req.body);
      }
    }

    res.json({
      ok: true,
      message: "elemento regestrado corectamente",
      datos: req.body,
    });
  } catch (error) {
    console.error("Error al insertar:", error);
    res.status(500).json({
      ok: false,
      message: "Error al registrar el elemento",
      error: error.message,
    });
  }
});

module.exports = router;
