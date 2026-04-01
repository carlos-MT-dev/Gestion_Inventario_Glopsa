const conn = require("../../conexion/conexion");

async function eliminarFila(idObjeto) {
  console.log("Ejecutando DELETE con ID:", idObjeto, "Tipo:", typeof idObjeto);
  const query = `DELETE FROM objeto WHERE ID_objeto = ?`;

  try {
    const [result] = await conn.query(query, [idObjeto]);
    console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query DELETE:", err);
    throw err;
  }
}

module.exports = eliminarFila;