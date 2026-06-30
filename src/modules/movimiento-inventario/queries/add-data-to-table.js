const conn = require("../../../shared/database/conexion");


async function cargarListaMovimientos(){

    const sql = `
    SELECT 
    p.ID_prestamo AS ID_prestamo,
    m.movimiento AS Movimiento,
    p.ID_objeto AS ID_objeto,
    so.Sede AS Sede_origen,
    sd.Sede AS Sede_destino,
    p.Fecha_prestamo AS Fecha_prestamo,
    p.Fecha_retorno AS Fecha_retorno,
    uso.Nombre AS Usuario_origen,
    usd.Nombre AS Usuario_destino,
    p.Descripcion AS Descripcion,
    e.Estado AS Estado,
    d.Duracion AS Duracion,
    aro.Area AS Area_origen,
    ard.Area AS Area_destino


    FROM prestamo p
    LEFT JOIN movimiento m ON p.movimiento = m.ID_movimiento
    LEFT JOIN objeto o ON p.ID_objeto = o.ID_objeto
    LEFT JOIN sede so ON p.Sede_origen = so.ID_sede 
    LEFT JOIN sede sd ON p.Sede_destino = sd.ID_sede 
    LEFT JOIN usuario uso ON p.usuario_origen = uso.ID_usuario
    LEFT JOIN usuario usd ON p.usuario_destino = usd.ID_usuario
    LEFT JOIN estado e ON p.estado = e.ID_Estado
    LEFT JOIN duracion d ON p.duracion = d.ID_duracion
    LEFT JOIN area aro ON p.Area_origen = aro.ID_area
    LEFT JOIN area ard ON p.Area_destino = ard.ID_area

    ORDER BY p.ID_prestamo DESC;  
    `;

     const [rows] = await conn.query(sql);
     return rows;

     
}

module.exports = cargarListaMovimientos;



