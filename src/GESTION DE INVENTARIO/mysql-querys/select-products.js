const conn = require("../conexion/conexion");

async function cargarProductos() {
  const sql = `
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

ORDER BY o.ID_objeto DESC
LIMIT 100
;
  `;
  const [rows] = await conn.query(sql);
  return rows;
}

module.exports = cargarProductos;
