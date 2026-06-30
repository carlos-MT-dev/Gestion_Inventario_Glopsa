const conn = require("../../../shared/database/conexion");

// CONSULTAS PARA TRAER LOS DATOS DE LOS COMBOS DE LOS FORMULARIOS

async function getMovimiento() {
  try {
    const query = "SELECT * FROM movimiento";
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.log("Error al obtener los datos demovimientos:", err);
  }
}

async function getArea() {
  try {
    const query = "SELECT * FROM area";
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.log("Error al obtener los datos de areas:", err);
  }
}

async function getSedeOrigen() {
  try {
    const query = "SELECT * FROM sede";
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.log("Error al obtener los datos de sedes origen:", err);
  }
}

async function getSedeDestino() {
  try {
     const query = "SELECT * FROM sede";
     const [rows] = await conn.query(query);
     return rows;
  } catch (err) {
    console.log("Error al obtener los datos de sedes destino:", err);
  }
}

async function getDuracion(){
   try {
     const query = "SELECT * FROM duracion";
     const [rows] = await conn.query(query);
     return rows;
   } catch (err) {
     console.log("Error al obtener los datos de sedes destino:", err);
   }
}

async function getEstado(){
  try {
    const query = "SELECT * FROM estado";
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.log("Error al obtener los datos de sedes destino:", err);
  }
}

async function getEncargadoPrestamo() {
     try {
       const query = "SELECT * FROM usuario WHERE ID_rol = 1";
       const [rows] = await conn.query(query);
       return rows;
     } catch (err) {
       console.log("Error al obtener los datos de encargado prestamo:", err);
     }
}

async function getRecepcionista() {
  try {
    const query = "SELECT * FROM usuario WHERE ID_rol = 1";
    const [rows] = await conn.query(query);
    return rows;
  } catch (err) {
    console.log("Error al obtener los datos de recepcionista:", err);
  }
}

module.exports = {
  getMovimiento,
  getArea,
  getSedeOrigen,
  getSedeDestino,
  getDuracion,
  getEstado,
  getRecepcionista,
  getEncargadoPrestamo,
};
