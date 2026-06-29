const conn = require("../../conexion/conexion");
/**
 *
 * Este Scrip contiene todas las querys que se realizaron desde el apartado de listar
 * los elemntos que contiene la base datos
 */

/**
 * LISTAR TODOS LOS ELEMTOS REGISTRADOS POR UN ID_ITEM UNICO
 *
 * lista los items con un conteo unico del total registrado y la sumatoria de los registros realizados
 */

async function listaInventarioTotal() {
  let sql = `
   SELECT
    i.ID_item AS idItem,
    i.Item AS nombreObjeto,
    COUNT(o.ID_objeto) AS cantidadRegistros,
    SUM(o.Stock) AS stockTotal
    FROM objeto o
    INNER JOIN item i
    ON o.ID_item = i.ID_item
    GROUP BY i.ID_item, i.Item
    ORDER BY i.Item;
    `;

  const [result] = await conn.query(sql);
  return result;
}

module.exports = {
  listaInventarioTotal,
};


/**
 * 
 * BUSQUE CON FILTRO MULTIPLE
 * 
 * con este query se filtra el contenido que se listara en la tabla
 */
async function buscarFiltroMultiple({
  idCategoria,
  idObjeto,
  idMarca,
  idModelo,
  idSede,
  idCondicion,
}) {
  let sql = `
    SELECT
      i.ID_item AS idItem,
      i.Item AS nombreObjeto,
      COUNT(o.ID_objeto) AS cantidadRegistros,
      SUM(o.Stock) AS stockTotal
    FROM objeto o
    INNER JOIN item i ON o.ID_item = i.ID_item
  `;

  const condiciones = [];
  const valores = [];

  // Agregamos la columna, el operador '= ?' y empujamos el valor
  if (idCategoria) {
    condiciones.push("o.ID_categoria = ?"); // Nota: Asegúrate de qué tabla viene (o / i)
    valores.push(idCategoria);
  }
  if (idObjeto) {
    condiciones.push("o.ID_item = ?");
    valores.push(idObjeto);
  }
  if (idMarca) {
    condiciones.push("o.ID_marca = ?");
    valores.push(idMarca);
  }
  if (idCondicion) {
    condiciones.push("o.ID_CondicionObj = ?");
    valores.push(idCondicion);
  }
  if (idModelo) {
    condiciones.push("o.ID_modelo = ?");
    valores.push(idModelo);
  }
  if (idSede) {
    condiciones.push("o.ID_sede = ?");
    valores.push(idSede);
  }

  // Validamos por longitud del array para evitar un WHERE vacío
  if (condiciones.length > 0) {
    // Agregamos espacios y unimos con ' AND '
    sql += " WHERE " + condiciones.join(" AND ");
  }

  sql += `
    GROUP BY i.ID_item, i.Item
    ORDER BY i.Item;
  `;

  // IMPORTANTE: Pasamos 'valores' como segundo parámetro para evitar inyección SQL
  const [result] = await conn.query(sql, valores);
  return result;
}

module.exports = {
  listaInventarioTotal,
  buscarFiltroMultiple,
};
