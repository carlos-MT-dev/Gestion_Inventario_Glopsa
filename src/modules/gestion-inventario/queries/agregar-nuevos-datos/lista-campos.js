const conn = require("../../../../shared/database/conexion");

// FUNCION PARA OBTENER LA LISTA DE ITEMS REGISTRADOS
async function getListaNuevosItems() {
  const query = `
    SELECT
      i.ID_item,
      i.Item,
      c.Categoria,
      i.ID_categoria ,
      e.Estado,
      i.ID_Estado,
      i.descripcion
    FROM item i
    LEFT JOIN categoria c
      ON i.ID_categoria = c.ID_categoria
    LEFT JOIN estado e
      ON i.ID_Estado = e.ID_Estado
    ORDER BY i.ID_item DESC;
  `;

  try {
    const [result] = await conn.query(query);
    // console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query get item:", err);
    throw err;
  }
}

// FUNCION PARA PARA OBTENER LA LISTA DE MARCAS REGISTRADAS
async function getListaNuevosMarca() {
  const query = `
    SELECT
      m.ID_marca,
      m.Marca,
      c.Categoria,
      m.ID_categoria ,
      e.Estado,
      m.ID_Estado,
      m.descripcion
    FROM marca m
    LEFT JOIN categoria c
      ON m.ID_categoria = c.ID_categoria
    LEFT JOIN estado e
      ON m.ID_Estado = e.ID_Estado
    ORDER BY m.ID_marca DESC;
  `;

  try {
    const [result] = await conn.query(query);
    // console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query get marcas:", err);
    throw err;
  }
}

// FUNCION PARA LISTAR LOS MODELOS REGISTRADOS EN LA BASE DE DATOS
async function getListaNuevosModelo() {
  const query = `
    SELECT
      mo.ID_modelo,
      mo.modelo,
      c.Categoria,
      mo.ID_categoria,
      e.Estado,
      mo.ID_Estado,
      mo.descripcion
    FROM modelo mo
    LEFT JOIN categoria c
      ON mo.ID_categoria = c.ID_categoria
    LEFT JOIN estado e
      ON mo.ID_Estado = e.ID_Estado
    ORDER BY mo.ID_modelo DESC;
  `;

  try {
    const [result] = await conn.query(query);
    // console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query get modelo:", err);
    throw err;
  }
}

module.exports = {
  getListaNuevosItems,
  getListaNuevosMarca,
  getListaNuevosModelo,
};
