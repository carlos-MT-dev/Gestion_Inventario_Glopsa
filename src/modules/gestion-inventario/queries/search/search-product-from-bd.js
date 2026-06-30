const conn = require("../../../../shared/database/conexion");

async function obtenerId(Columnid, tabla, valorColumna, valorForm) {
  const sql = `SELECT ${Columnid} FROM ${tabla} WHERE ${valorColumna} = ? LIMIT 1`;
  try {
    const [result] = await conn.query(sql, [valorForm]);
    return result[0]?.[Columnid] || null;
  } catch (err) {
    throw err;
  }
}




async function cargarProductos(data) {

console.log("esta es la data que llega a la busqueda mutiple",data)

  let sql = `
 SELECT
  o.ID_objeto,
  o.ID_area,
  o.ID_sede,
  o.ID_item,
  o.ID_categoria,
  o.ID_marca,
  o.ID_modelo,
  o.ID_medida,
  o.ID_Estado,
  o.ID_DisponibilidadObj,
  o.ID_CondicionObj,
  o.ID_seccion,
  m.modelo AS Modelo,
  o.fecha_registro,
  o.Fecha_compra,
  o.Codigo,

  s.Seccion AS Seccion,
  a.Area AS Area,
  ma.Marca AS Marca,

  it.Item AS Item,

  o.Descripcion,
  o.Stock,

  med.Medida AS Medida,
  e.Estado AS Estado,
  d.Disponibilidad AS Disponibilidad,
  c.Condicion AS Condicion,
  se.Sede AS Sede,
  ca.Categoria AS Categoria


FROM objeto o
LEFT JOIN item it ON o.ID_item = it.ID_item
LEFT JOIN modelo m ON o.ID_modelo = m.ID_modelo
LEFT JOIN seccion s ON o.ID_seccion = s.ID_seccion
LEFT JOIN area a ON o.ID_area = a.ID_area
LEFT JOIN marca ma ON o.ID_marca = ma.ID_marca
LEFT JOIN medida med ON o.ID_medida = med.ID_medida
LEFT JOIN estado e ON o.ID_Estado = e.ID_Estado
LEFT JOIN disponibilidad d ON o.ID_DisponibilidadObj = d.ID_DisponibilidadObj
LEFT JOIN condicion c ON o.ID_CondicionObj = c.ID_CondicionObj
LEFT JOIN sede se ON o.ID_sede = se.ID_sede
LEFT JOIN categoria ca ON o.ID_categoria = ca.ID_categoria


`;

  const condiciones = [];
  const valores = [];

  // obtenerId(id, tabla, valorColumna, valorForm)

  if (data.codigo) {
    condiciones.push("o.Codigo = ?");
    valores.push(data.codigo);
  }
  if (data.area) {
    condiciones.push("o.ID_area = ?");
    const auxArea = await obtenerId("ID_area", "area", "Area", data.area);
    valores.push(auxArea);
  }
  if (data.sede) {
    condiciones.push("o.ID_sede = ?");
    const auxSede = await obtenerId("ID_sede", "sede", "Sede", data.sede);
    valores.push(auxSede);
    console.log(auxSede);
  }
  if (data.marca) {
    condiciones.push("o.ID_marca = ?");
    valores.push(data.marca);
  }
  if (data.objeto) {
    condiciones.push("o.ID_Item = ?");
    valores.push(data.objeto);
  }
  if (data.categoria) {
    condiciones.push("o.ID_categoria = ?");
    valores.push(data.categoria);
  }
  if (data.modelo) {
    condiciones.push("o.ID_modelo = ?");
    valores.push(data.modelo);
  }
  if (data.unidad) {
    condiciones.push("o.ID_medida = ?");
    valores.push(data.unidad);
  }
  if (data.disponibilidad) {
    condiciones.push("o.ID_DisponibilidadObj = ?");
    valores.push(data.disponibilidad);
  }
  if (data.condicion) {
    condiciones.push("o.ID_CondicionObj = ?");
    valores.push(data.condicion);
  }
  if (data.seccion) {
    condiciones.push("o.ID_seccion = ?");
    valores.push(data.seccion);
  }

  if (condiciones.length > 0) {
    sql += " WHERE " + condiciones.join(" AND ");
  }

  sql += " ORDER BY o.ID_objeto DESC";

  const [rows] = await conn.query(sql, valores);
  console.log(condiciones);
  console.log(valores);
  console.log(rows);
  return rows;
}

module.exports = cargarProductos;
