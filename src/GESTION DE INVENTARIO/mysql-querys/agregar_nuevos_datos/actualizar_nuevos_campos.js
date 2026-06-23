const conn = require("../../conexion/conexion");

const tablasPermitidas = ["item", "modelo", "marca"];

const cabeceraModelo = [
  "ID_modelo",
  "modelo",
  "ID_Estado",
  "ID_categoria",
  "descripcion",
];

const cabeceraMarca = [
  "ID_marca",
  "Marca",
  "ID_Estado",
  "ID_categoria",
  "descripcion",
];

const cabeceraItem = [
  "ID_item",
  "Item",
  "ID_Estado",
  "ID_categoria",
  "descripcion",
];

function validaTablas(tablaNameEntrante) {
  return tablasPermitidas.includes(tablaNameEntrante);
}

async function actualizarNuevosCampos(
  idcampo,
  tabla,
  nombre,
  estado,
  categoria,
  descripcion,
) {
  let nombreTabla;
  let arrayCabecerasAux;

  const tablaValida = validaTablas(tabla);

  // Validar tabla permitida
  if (!tablaValida) {
    throw new Error("Tabla no permitida");
  }

  nombreTabla = tabla;

  // Obtener cabeceras según la tabla
  const cabeceras = {
    item: cabeceraItem,
    modelo: cabeceraModelo,
    marca: cabeceraMarca,
  };

  arrayCabecerasAux = cabeceras[nombreTabla];

  if (!arrayCabecerasAux) {
    throw new Error("Cabeceras no encontradas");
  }

  const sql = `
    UPDATE ${nombreTabla}
    SET
      ${arrayCabecerasAux[1]} = ?,
      ${arrayCabecerasAux[2]} = ?,
      ${arrayCabecerasAux[3]} = ?,
      ${arrayCabecerasAux[4]} = ?
    WHERE
      ${arrayCabecerasAux[0]} = ?;
  `;

  const valores = [nombre, estado, categoria, descripcion, idcampo];

  const [result] = await conn.query(sql, valores);

  return result;
}

module.exports =  actualizarNuevosCampos ;
