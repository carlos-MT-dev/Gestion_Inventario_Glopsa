const conn = require("../../../../shared/database/conexion");
const {
  actualizarSedeObjeto,
  actualizarEstadoObjeto

} = require("../send/actualizar-objeto-prestamo");

async function obtenerId(tabla, campoId, ColumnaNombre, valor) {
  const sql = `SELECT ${campoId} AS id FROM ${tabla} WHERE LOWER(${ColumnaNombre}) = LOWER(?) LIMIT 1`;
  try {
    const [result] = await conn.query(sql, [valor]);
    return result[0]?.id || null;
  } catch (err) {
    throw err;
  }
}

//(tabla, campoId, ColumnaNombre, valor);

async function obtenerIdPorCodigo(dataexterna) {
  const idMovimiento = await obtenerId(
    "movimiento",
    "ID_movimiento",
    "Movimiento",
    dataexterna.ID_movimiento,
  );
  const idObjeto = await obtenerId(
    "objeto",
    "Codigo",
    "Codigo",
    dataexterna.Codigo_Objeto,
  );
  const idSedeOrigen = await obtenerId(
    "sede",
    "ID_sede",
    "Sede",
    dataexterna.ID_sede_origen,
  );
  const idSedeDestino = await obtenerId(
    "sede",
    "ID_sede",
    "Sede",
    dataexterna.ID_sede_destino,
  );
  const idAreaOrigen = await obtenerId(
    "area",
    "ID_area",
    "Area",
    dataexterna.ID_area,
  );
  const idAreaDestino = await obtenerId(
    "area",
    "ID_area",
    "Area",
    dataexterna.ID_area_destino,
  );
  //(tabla, campoId, ColumnaNombre, valor);
  const idUsuarioOrigen = await obtenerId(
    "usuario",
    "ID_usuario",
    "Nombre",
    dataexterna.ID_encargado_prestamo,
  );

  const idUsuarioDestino = await obtenerId(
    "usuario",
    "ID_usuario",
    "Nombre",
    dataexterna.ID_recepcionista,
  );
  const IDEstado = await obtenerId(
    "estado",
    "ID_estado",
    "Estado",
    dataexterna.ID_estado,
  );
  const IDDuracion = await obtenerId(
    "duracion",
    "ID_duracion",
    "Duracion",
    dataexterna.Duracion_prestamo,
  );

  // obtener los otros datos
  const fechaRetiro = dataexterna.Fecha_prestamo;
  const fechaRetorno = dataexterna.Fecha_retorno;
  const descripcion = dataexterna.Descripcion || "";

  const values = {
    idMovimiento,
    idObjeto,
    idSedeOrigen,
    idSedeDestino,
    fechaRetiro,
    fechaRetorno,
    idUsuarioDestino,
    descripcion,
    IDEstado,
    idUsuarioOrigen,
    IDDuracion,
    idAreaOrigen,
    idAreaDestino,
  };

  return values;
}

async function insertarObjeto(data) {
  try {
    // Obtener los IDs necesarios
    const values = await obtenerIdPorCodigo(data);

    if (!values)
      throw new Error(
        "No se pudieron obtener los IDs necesarios para poder registrar el prestamo",
      );
    //consulta para enviar los datos a la tabla prestamo
    const sql = `INSERT INTO prestamo (
  movimiento, ID_objeto, Sede_origen, Sede_destino, Fecha_prestamo, Fecha_retorno, usuario_destino, Descripcion, Estado, usuario_origen, duracion, Area_origen, Area_destino
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    if (values.idMovimiento === null)
      throw new Error("Movimiento no encontrado");
    if (values.idObjeto === null) throw new Error("Objeto no encontrado");
    if (values.idSedeOrigen === null)
      throw new Error("Sede origen no encontrada");
    if (values.idSedeDestino === null)
      throw new Error("Sede destino no encontrada");
    if (values.idAreaOrigen === null)
      throw new Error("Area origen no encontrada");
    if (values.idAreaDestino === null)
      throw new Error("Area destino no encontrada");
    if (values.idUsuarioOrigen === null)
      throw new Error("Usuario origen no encontrado");
    if (values.idUsuarioDestino === null)
      throw new Error("Usuario destino no encontrado");
    if (values.IDEstado === null) throw new Error("Estado no encontrado");
    if (values.IDDuracion === null) throw new Error("Duración no encontrada");
    if (!values.fechaRetiro)
      throw new Error("Fecha de retiro no proporcionada");
    if (!values.fechaRetorno)
      throw new Error("Fecha de retorno no proporcionada");

    const params = [
      values.idMovimiento,
      values.idObjeto,
      values.idSedeOrigen,
      values.idSedeDestino,
      values.fechaRetiro,
      values.fechaRetorno,
      values.idUsuarioDestino,
      values.descripcion,
      values.IDEstado,
      values.idUsuarioOrigen,
      values.IDDuracion,
      values.idAreaOrigen,
      values.idAreaDestino,
    ];

    const [result] = await conn.query(sql, params);
    return result;
  } catch (err) {
    throw err;
  }
}

// (idObjeto, idSede);
 //ESTAS FUNCIONES ACTUALIZAN EL ESTADO DEL OBJETO CUANDO SE REALIZA UN PRESTAMO

async function actualizaSedeObjetoPrestado(data){
   try {
    let values = await obtenerIdPorCodigo(data);
    await actualizarSedeObjeto(values.idSedeDestino, values.idObjeto);
   } catch (error) {
    
   }
}
async function actualizaEstadoObjetoPrestado(data) {
  try {
    let values = await obtenerIdPorCodigo(data);
    await actualizarEstadoObjeto(values.IDEstado, values.idObjeto);
  } catch (error) {}
}


module.exports = {
  insertarObjeto,
  actualizaSedeObjetoPrestado,
  actualizaEstadoObjetoPrestado,
  
};
