// const  listarTabla = require("../listar/listar-tabla");
import {listarTabla} from "../listar/listar-tabla.js";

document.getElementById("btn-buscar").addEventListener("click", async () => {
  //SELECCION DEL BOTON DESDE EL DOM  
  const codigoBusqueda = document.getElementById("Codigo_Objeto").value;
  //QUITAR LOS ESPACIOS EN BLANCO
  const codigoLimpio = limpiarEspacios(codigoBusqueda);

  //SE VALIDA SI EXISTE INFORMACION EN EL BOTON SELECCIONADO
  if (!codigoLimpio) {
    console.error("Código vacío");
    return;
  }

  //SE ENVIAN LOS DATOS POR MEDIO DEL METODO FETCH
  try {
    const res = await fetch(`/data/buscar/prestamo/${codigoLimpio}`);

    if (!res.ok) {
      throw new Error("Error al traer los datos de la busqueda del objeto para el apartado de prestamo");
    } else {
      console.log("los datos llegados de la query son correctos para el area de prestamos", res);
    }
    const data = await res.json();

    listarTabla(data);
  } catch (err) {
    console.error(err);
  }
});

//FUNCIONES GENERALES PARA EL TRATAMIENTO DE DATOS EN LA TABLA

function limpiarEspacios(string) {
  string = string.trim().replace(/\s+/g, "");
  return string;
}
