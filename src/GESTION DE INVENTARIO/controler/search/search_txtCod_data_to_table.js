import listarTabla from "../funciones-globales/listar-tabla.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-buscar").addEventListener("click", async () => {
    // SELECCIONAMOS EL CODIGO DE BUSQUEDA
    let codigoBusqueda = limpiarEspacios(
      document.getElementById("Codigo").value,
    );
    let AreaRegCbb = document.getElementById("ID_area").value;
    let SedeRegCbb = document.getElementById("ID_sede").value;
    let MarcaRegCbb = document.getElementById("ID_marca").value;
    let ObjetoRegCbb = document.getElementById("ID_objeto").value;
    let CategoriaRegCbb = document.getElementById("ID_categoria").value;
    let ModeloRegCbb = document.getElementById("ID_modelo").value;
    let UnidMedRegCbb = document.getElementById("ID_medida").value;
    let estadoRegCbb = document.getElementById("ID_Estado").value;
    let DisponibilidadRegCbb =
      document.getElementById("ID_Disponibilidad").value;
    let CondicionRegCbb = document.getElementById("ID_Condicion").value;
    let SeccionRegCbb = document.getElementById("ID_seccion").value;

    // GUARDAMOS TODOS LOS VALORES EN UN ARREGLO PARA DESÚES SER EVALUADOS SI VIENEN CON CONTENIDO
    const parametros = {};

    //condicionales para poder verificar

    if (codigoBusqueda) {
      parametros.codigo = codigoBusqueda;
    } else {
      console.log("no hay datos en codigo");
    }

    if (AreaRegCbb) {
      parametros.area = AreaRegCbb;
    } else {
      console.log("no hay datos en area");
    }

    if (SedeRegCbb) {
      parametros.sede = SedeRegCbb;
    } else {
      console.log("no hay datos en sede");
    }

    if (MarcaRegCbb) {
      parametros.marca = MarcaRegCbb;
    } else {
      console.log("no hay datos en marca");
    }

    if (ObjetoRegCbb) {
      parametros.objeto = ObjetoRegCbb;
    } else {
      console.log("no hay datos en objeto");
    }

    if (CategoriaRegCbb) {
      parametros.categoria = CategoriaRegCbb;
    } else {
      console.log("no hay datos en categoria");
    }

    if (ModeloRegCbb) {
      parametros.modelo = ModeloRegCbb;
    } else {
      console.log("no hay datos en modelo");
    }

    if (UnidMedRegCbb) {
      parametros.unidad = UnidMedRegCbb;
    } else {
      console.log("no hay datos en unidad");
    }

    if (estadoRegCbb) {
      parametros.estado = estadoRegCbb;
    } else {
      console.log("no hay datos en estado");
    }

    if (DisponibilidadRegCbb) {
      parametros.disponibilidad = DisponibilidadRegCbb;
    } else {
      console.log("no hay datos en disponibilidad");
    }

    if (CondicionRegCbb) {
      parametros.condicion = CondicionRegCbb;
    } else {
      console.log("no hay datos en condicion");
    }

    if (SeccionRegCbb) {
      parametros.seccion = SeccionRegCbb;
    } else {
      console.log("no hay datos en seccion");
    }

    // imprimimos los datos que llegan
    console.log("los datos que se enviaran para la busqueda son:", parametros);

    try {
      const res = await fetch("/data/buscar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parametros),
      });

      if (!res.ok) {
        throw new Error("Error al traer los datos de la busqeuda del objeto");
      } else {

        console.log("los datos llegados de la query son correctos", res);
        
      }
      const data = await res.json();

        console.log("este es el resultado de la busqueda multiple:", data);

      listarTabla(data, "tbody-objetos");
    } catch (err) {
      console.error(err);
    }
  });

  //FUNCIONES GENERALES PARA EL TRATAMIENTO DE DATOS EN LA TABLA
  function limpiarEspacios(string) {
    string = string.trim().replace(/\s+/g, "");
    return string;
  }
});
