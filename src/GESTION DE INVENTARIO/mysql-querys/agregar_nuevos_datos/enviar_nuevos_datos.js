const conn = require("../../conexion/conexion");


//txt_nuevo_objeto: 'TRAPOS', agregar_categoria_objeto: '2'
async function insertItem(data) {
  const sql = `INSERT INTO item (Item , ID_categoria) VALUES (?,?)`;

  try {
    const [result] = await conn.query(sql, [
      data.txt_nuevo_objeto,
      data.agregar_categoria_objeto,
    ]);

    return result.insertId || null;
  } catch (error) {
    throw new Error(`Error al insertar item: ${error.message}`);
  }
}


async function insertMarca(data) {
  const sql = `INSERT INTO marca (Marca, ID_categoria) VALUES (?,?)`;

  try {
    const [result] = await conn.query(sql, [
      data.txt_nueva_marca,
      data.agregar_categoria_marca,
    ]);

    return result.insertId || null;
  } catch (error) {
    throw new Error(`Error al insertar marca: ${error.message}`);
  }
}




async function insertModelo(data) {
  const sql = `INSERT INTO modelo (modelo, ID_categoria) VALUES (?,?)`;

  try {
    const [result] = await conn.query(sql, [
      data.txt_nuevo_modelo,
      data.agregar_categoria_modelo,
    ]);
    return result[0]?.id || null;
  } catch (error) {
    throw new Error(`Error al insertar modelo: ${error.message}`);
  }
}


module.exports = {
    insertItem,
    insertMarca,
    insertModelo
}