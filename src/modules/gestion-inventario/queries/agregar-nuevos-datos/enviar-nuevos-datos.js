const conn = require("../../../../shared/database/conexion");

const tablasPermitidas = [
  "item",
   "modelo", 
   "marca"
  ];

const cabeceraModelo = [
  "modelo", 
  "ID_Estado", 
  "ID_categoria", 
  "descripcion"
];

const cabeceraMarca = [
  "Marca", 
  "ID_Estado", 
  "ID_categoria", 
  "descripcion"
];

const cabeceraItem = [
  "Item", 
  "ID_Estado", 
  "ID_categoria", 
  "descripcion"
];

async function validaTablas(tablaNameEntrante) {
  return tablasPermitidas.includes(tablaNameEntrante);
}

async function enviarNuevosCampos(
  tabla,
  nombre,
  categoria,
  estado,
  descripcion,
) {
  const tablaValida = await validaTablas(tabla);

  if (!tablaValida) {
    throw new Error("Tabla no permitida");
  }

  let cabecerasAux = "";

  if (tabla === "modelo") {
    cabecerasAux = cabeceraModelo.join(",");
  } else if (tabla === "marca") {
    cabecerasAux = cabeceraMarca.join(",");
  } else if (tabla === "item") {
    cabecerasAux = cabeceraItem.join(",");
  }

  const sql = `
    INSERT INTO ${tabla}
    (${cabecerasAux})
    VALUES (?,?,?,?)
  `;

  console.log(sql);

  const [result] = await conn.query(sql, [
    nombre,
    estado,
    categoria,
    descripcion,
  ]);

  return result;
}

module.exports = { enviarNuevosCampos };
