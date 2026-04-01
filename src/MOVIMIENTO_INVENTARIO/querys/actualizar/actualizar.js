const conn = require("../../conexion/conexion_msqly_2");

async function obtenerId(tabla, campoId, campoNombre, valor) {
  const sql = `SELECT ${campoId} AS id FROM ${tabla} WHERE ${campoNombre} = ? LIMIT 1`;

  try {
    const [result] = await conn.query(sql, [valor]);
    return result[0]?.id || null;
  } catch (err) {
    throw err;
  }
}

// tabla, campoId, campoNombre, valor
async function actualizarObjeto(data, idObjeto) {
const movimiento = await obtenerId(
  "movimiento",
  "ID_movimiento",
  "movimiento",
  data.ID_movimiento, 
);

const idObjetos = data.Codigo_Objeto;


  const idSedeOrigen = await obtenerId(
    "sede",
    "ID_sede",
    "Sede",
    data.ID_sede_origen,
  );

  const idSedeDestino = await obtenerId(
    "sede",
    "ID_sede",
    "Sede",
    data.ID_sede_destino,
  );

  const idusuarioDest = await obtenerId(
    "usuario",
    "ID_usuario",
    "Nombre",
    data.ID_recepcionista,
  );

  const idEstado = await obtenerId(
    "estado",
    "ID_Estado",
    "Estado",
    data.ID_estado,
  );

  const idusuarioOrig = await obtenerId(
    "usuario",
    "ID_usuario",
    "Nombre",
    data.ID_encargado_prestamo,
  );

  const idDuracion = await obtenerId(
    "duracion",
    "ID_duracion",
    "Duracion",
    data.Duracion_prestamo,
  );

  const idAreaOrigen = await obtenerId("area", "ID_area", "Area", data.ID_area);

  const idAreaDestino = await obtenerId(
    "area",
    "ID_area",
    "Area",
    data.ID_area_destino,
  );

  const sql = `
    UPDATE prestamo
    SET
      movimiento = ?,
      ID_objeto = ?,
      Sede_origen = ?,
      Sede_destino = ?,
      usuario_destino = ?,
      Estado = ?,
      usuario_origen = ?,
      duracion = ?,
      Area_origen = ?,
      Area_destino = ?
    WHERE ID_prestamo = ?
  `;

  const valores = [
    movimiento, // movimiento
    idObjetos, // ID_objeto
    idSedeOrigen, // Sede_origen
    idSedeDestino, // Sede_destino
    idusuarioDest, // usuario_destino
    idEstado, // Estado
    idusuarioOrig, // usuario_origen
    idDuracion, // duracion
    idAreaOrigen, // Area_origen
    idAreaDestino, // Area_destino
    idObjeto, // WHERE ID_prestamo
  ];

  console.log("VALORES UPDATE controlador:", valores);

  try {
    const [result] = await conn.query(sql, valores);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = actualizarObjeto;
