const conn = require("../../conexion/conexion");

async function eliminarRegistro(id, tipo) {

  
  const tablasPermitidas = ["marca", "modelo", "item"];

  if (!tablasPermitidas.includes(tipo)) {
    throw new Error(`Tabla no permitida con nombre ${tipo} e id: ${id} `);
  }

  const query = `
    DELETE FROM ${tipo}
    WHERE id_${tipo} = ?
  `;

  try {
    const [result] = await conn.query(query, [id]);

    

    return result;
  } catch (err) {
    console.error("Error al eliminar registro:", err);
    throw err;
  }
}


module.exports = eliminarRegistro;