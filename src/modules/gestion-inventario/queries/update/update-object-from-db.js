const conn = require("../../../../shared/database/conexion");

//aqui recibo la data del formulario y tambien
// el valor del id del objeto a actualizar en gestion

async function actualizarObjeto(data, idObjeto) {
  // (tabla, campoId, campoNombre, valor);
  const idArea = data.ID_area;
  const idSede = data.ID_sede;
  const idMarca = data.ID_marca;
  //objeto no porque se envia a travez de la url
  const idCategoria = data.ID_categoria;
  const idModelo = data.ID_modelo;
  const idMedida = data.ID_medida;
  const unidadesReg = data.Unidad_txt;


  const idEstado = data.ID_Estado;
  const idDisponibilidad = data.ID_Disponibilidad;
  const idCondicion = data.ID_Condicion;
  const idSeccion = data.ID_seccion;
  const idItem = data.ID_objeto;
  
 
  //AQUI ME QUEDE PORQUE FUI A ARREGLAR EL BOTON DE SELECCIONAR EN LA PARTICION DE REGISTRO DE OBJETO
  const fechaCompra = 0;
  //descripcion
  const Codigo = tranformarCodigo(data);

  const sql = `
  UPDATE objeto
  SET

    ID_modelo = ?,
    Fecha_compra = ?,
    ID_seccion = ?,
    ID_area = ?,
    ID_marca = ?,
    Descripcion = ?,
    Stock = ?,
    ID_medida = ?,
    ID_Estado = ?,
    ID_DisponibilidadObj = ?,
    ID_CondicionObj = ?,
    ID_sede = ?,
    ID_categoria = ?,
    ID_item = ?         
  
  WHERE ID_objeto = ?
`;

  const valores = [
    idModelo,
    data.Fecha_compra || null,

    idSeccion,
    idArea,
    idMarca,
    data.Descripcion || null,
    unidadesReg || 0,
    idMedida,
    idEstado,
    idDisponibilidad,
    idCondicion,
    idSede,
    idCategoria,
    idItem,
    idObjeto,
  ];

  console.log("VALORES UPDATE sql:", valores);

  try {
    const [result] = await conn.query(sql, valores);
    return result;
  } catch (err) {
    throw err;
  }
}

module.exports = actualizarObjeto;

//SECCION DE FUNCIONES AUXILIARES

function tranformarCodigo(data) {
 
   let areaAbrev = "";
   let sedeAbrev = "";
   // se asignan los valores de las abreviaciones
   areaAbrev = validarArea(data.ID_area);
   sedeAbrev = validarSede(data.ID_sede);

   const Codigo = `${sedeAbrev}-${areaAbrev}-${Date.now()}`; //aqui agregar el id unico de la bd
   return Codigo;
}

//funcion para validar la sede

function validarArea(dataArea) {
  let areaId = "";

  switch (dataArea) {
    case "SOPORTE":
      areaId = "SO";
      return areaId;
    case "RRHH":
      areaId = "RH";
      return areaId;
    case "BACKOFFICE":
      areaId = "BO";
      return areaId;
    case "MANTENIMIENTO":
      areaId = "MA";
      return areaId;
    case "GERENCIA":
      areaId = "GE";
      return areaId;
    case "OPERACIONES":
      areaId = "OP";
      return areaId;
  }
}

function validarSede(dataSede) {
  let sedeId = "";

  switch (dataSede) {
    case "JBG OPERATOR":
      sedeId = "JBG";
      return sedeId;
    case "IMFCA CONTACTO":
      sedeId = "IMF";
      return sedeId;
    case "BROKERS NORTE":
      sedeId = "BKN";
      return sedeId;
  }
}
