const conn = require("../../../../shared/database/conexion");


// la sede OK

async function actualizarSedeObjeto(idSede, idObjeto) {
  const sql = `UPDATE objeto SET ID_sede = ? WHERE Codigo = ?`;

  try {
    const [result] = await conn.query(sql, [idSede, idObjeto]);
    return result;
  } catch (error) {
    console.log(error);
  }
}


async function actualizarEstadoObjeto(idEstado, idObjeto) {
  const sql = `UPDATE objeto SET ID_Estado = ? WHERE Codigo = ?`;

  try {
    const [result] = await conn.query(sql, [idEstado, idObjeto]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function actualizarCondicionObjeto(idCondicion, idObjeto) {
  const sql = `UPDATE objeto SET ID_CondicionObj = ? WHERE Codigo = ?`;

  try {
    const [result] = await conn.query(sql, [idCondicion, idObjeto]);
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    actualizarSedeObjeto,
    actualizarEstadoObjeto,
   
}
