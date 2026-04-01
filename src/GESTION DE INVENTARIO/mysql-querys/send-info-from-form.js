const conn = require("../conexion/conexion");

async function insertarObjeto(data) {
  const idModelo = data.ID_modelo;
  const Codigo = await tranformarCodigo(data);

  // Fecha de registro: usar hora del servidor formateada a MySQL
  const fechaRegistro = data.fecha_registro
    ? new Date(data.fecha_registro)
    : new Date();

  const idSeccion = data.ID_seccion;
  if (!idSeccion) {
    throw new Error(`Sección no encontrada para: ${data.ID_seccion}`);
  }

  const idArea = data.ID_area;
  const idMarca = data.ID_marca;
  const idMedida = data.ID_medida;
  const idEstado = data.ID_Estado;
  const idDisponibilidad = data.ID_Disponibilidad;
  const idCondicion = data.ID_Condicion;
  const idSede = data.ID_sede;
  const idItem = data.ID_objeto;
  const idCategoria = data.ID_categoria;

  const sql = `
    INSERT INTO objeto
    ( ID_modelo, fecha_registro, Fecha_compra, Codigo, ID_seccion, ID_area, ID_marca, Descripcion, Stock, ID_medida, ID_Estado, ID_DisponibilidadObj, ID_CondicionObj, ID_sede, ID_categoria, ID_item)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valores = [
    idModelo,
    fechaRegistro || null,
    data.Fecha_Compra || null,
    Codigo,
    idSeccion || null,
    idArea,
    idMarca,
    data.Descripcion || null,
    data.Unidad_txt || 0,
    idMedida,
    idEstado,
    idDisponibilidad,
    idCondicion,
    idSede,
    idCategoria,
    idItem,
  ];

  console.log("VALORES FINALES:", valores, data.ID_area, data.ID_sede);
  console.log("el valor de item es:", idItem);

  try {
    const [result] = await conn.query(sql, valores);
    console.log(result);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = insertarObjeto;


async function tranformarCodigo(data) {
  let areaAbrev = "";
  let sedeAbrev = "";
  // se asignan los valores de las abreviaciones
  areaAbrev = await validarArea(data.ID_area);
  sedeAbrev = await validarSede(data.ID_sede);
  console.log("Abreviatura de área:", areaAbrev, " y abreviatura de sede:", sedeAbrev);
  const Codigo = `${sedeAbrev}-${areaAbrev}-${Date.now()}`; //aqui agregar el id unico de la bd
  return Codigo;
}

//funcion para validar la sede

async function validarArea(dataArea) {
  let areaId = "";

  switch (dataArea) {
    case "4":
      areaId = "SO";
      return areaId;
    case "5":
      areaId = "RH";
      return areaId;
    case "6":
      areaId = "BO";
      return areaId;
    case "7":
      areaId = "MA";
      return areaId;
    case "8":
      areaId = "GE";
      return areaId;
    case "9":
      areaId = "OP";
      return areaId;
  }
}

async function validarSede(dataSede) {
  let sedeId = "";

  switch (dataSede) {
    case "2":
      sedeId = "JBG";
      return sedeId;
    case "3":
      sedeId = "IMF";
      return sedeId;
    case "1":
      sedeId = "BKN";
      return sedeId;
  }
}
