const conn = require("../../../shared/database/conexion");

async function getAreaList() {
  const [rows] = await conn.query(`SELECT ID_area, Area FROM area`);
  return rows;
}

async function getSedeList() {
  const [rows] = await conn.query(`SELECT ID_sede, Sede FROM sede`);
  return rows;
}

async function getMarcaList() {
  const [rows] = await conn.query(`SELECT ID_marca, Marca, ID_categoria FROM marca`);
  return rows;
}

async function getItemList() {
  const [rows] = await conn.query(`SELECT ID_item, Item, ID_categoria FROM item`);
  return rows;
}
async function getCategoriaList() {
  const [rows] = await conn.query(`SELECT ID_categoria, categoria FROM categoria`);
  return rows;
}
async function getModeloList() {
  const [rows] = await conn.query(`SELECT ID_modelo, modelo, ID_categoria FROM modelo`);
  return rows;
}

async function getMedidaList() {
  const [rows] = await conn.query(`SELECT ID_medida, Medida FROM medida`);
  return rows;
}

async function getEstadoObjList() {
  const [rows] = await conn.query(`SELECT ID_Estado ,estado FROM estado`);
  return rows;
}

//FALTA DISPONIBILIDAD
async function getDisponibilidadList() {
  const [rows] = await conn.query(`SELECT ID_DisponibilidadObj, Disponibilidad FROM disponibilidad`);
  return rows;
}
//FALTA CONDICION
async function getCondicionList() {
  const [rows] = await conn.query(`SELECT ID_CondicionObj, Condicion FROM condicion`);
  return rows;
}
//FALTA SECCION
async function getSeccionList() {
  const [rows] = await conn.query(`SELECT ID_seccion, Seccion FROM seccion`);
  return rows;
}
module.exports = {
  getAreaList,
  getSedeList,
  getMarcaList,
  getItemList,
  getCategoriaList,
  getModeloList,
  getMedidaList,
  getEstadoObjList,
  getDisponibilidadList,
  getCondicionList
  ,getSeccionList
};
