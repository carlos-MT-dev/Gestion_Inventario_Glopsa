const conn = require("../../conexion/conexion");

async function getListaNuevosItems() {
  const query = `
SELECT
    i.ID_item,
    i.Item,
    c.Categoria,
    i.Estado,
    i.descripcion
FROM item i
LEFT JOIN categoria c
    ON i.ID_categoria = c.ID_categoria
ORDER BY i.ID_item DESC;
  `;

  try {
    const [result] = await conn.query(query);
    console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query get item:", err);
    throw err;
  }
}

async function getListaNuevosMarca() {
  const query = `
  SELECT
    m.ID_marca,
    m.Marca,
    a.Area,
    c.Categoria,
    m.Estado,
    m.descripcion
FROM marca m
LEFT JOIN area a
    ON m.ID_area = a.ID_area
LEFT JOIN categoria c
    ON m.ID_categoria = c.ID_categoria
ORDER BY m.ID_marca DESC;
  `;

  try {
    const [result] = await conn.query(query);
    console.log("Resultado de query:", result);
    return result;
  } catch (err) {
    console.error("Error en query get marcas:", err);
    throw err;
  }
}

async function getListaNuevosModelo() {
  const query = `
   SELECT
    mo.ID_modelo,
    mo.modelo,
    c.Categoria,
    mo.Estado,
    mo.descripcion
FROM modelo mo
   
LEFT JOIN categoria c
    ON mo.ID_categoria = c.ID_categoria
ORDER BY mo.ID_modelo DESC;
  `;

  try {
    const [result] = await conn.query(query);
    console.log("Resultado de query:", result);
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
