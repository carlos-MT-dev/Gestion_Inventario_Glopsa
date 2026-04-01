const conn = require("../../conexion/conexion_msqly_2");

async function cargarProductosPrestamo(Codigo) {
 const sql = `
SELECT 
p.ID_prestamo, 
p.ID_objeto,
mov.movimiento AS movimiento,
sedOrg.Sede AS sedeOrigen,
sedDes.Sede AS sedeDestino,
areaOrg.Area AS areaOrg,
areaDes.Area AS areaDes,
usPres.Nombre AS userEmisor,
usRes.Nombre AS userReceptor,
dest.Duracion AS duracion,
est.Estado AS estado,
p.Fecha_prestamo,
p.Fecha_retorno,
p.Descripcion

FROM prestamo p
LEFT JOIN movimiento mov ON p.movimiento = mov.ID_movimiento        
LEFT JOIN sede sedOrg ON p.Sede_origen = sedOrg.ID_sede
LEFT JOIN area areaOrg ON p.Area_origen = areaOrg.ID_area
LEFT JOIN sede sedDes ON p.Sede_destino = sedDes.ID_sede 
LEFT JOIN area areaDes ON p.Area_destino = areaDes.ID_area
LEFT JOIN usuario usPres ON p.usuario_origen = usPres.ID_usuario
LEFT JOIN usuario usRes ON p.usuario_destino = usRes.ID_usuario
LEFT JOIN duracion dest ON p.duracion = dest.ID_duracion
LEFT JOIN estado est ON p.Estado = est.ID_Estado

WHERE p.ID_objeto = ?
ORDER BY p.ID_prestamo DESC;
`;
  const [rows] = await conn.query(sql, [Codigo]);
  return rows;
}

module.exports = cargarProductosPrestamo;
