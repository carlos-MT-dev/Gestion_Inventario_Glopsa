/**
 * --------------------------------------
 * Este script reune todos los eventos añadidos al DOM
 */

/*
ACTUALIZAR LOS REGISTROS DE LOS CAMPOS

Esta funcion actualiza los datos de los registros previos de items (objetos, modelos, marcas) realizados a la base de datos del sistema
*/

document.addEventListener("DOMContentLoaded", () => {
  const btn_actualizar_campo = document.getElementById("btn_actualizar_campo");
  const form_nuevos_campos = document.getElementById("form_nuevos_campos");

  if (!btn_actualizar_campo || !form_nuevos_campos) {
    console.error("No se encontró el botón para actualizar campos");
    return;
  }

  btn_actualizar_campo.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData(form_nuevos_campos);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/actualizar_nuevos_datos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      // console.log("Resultado del envío:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar el formulario");
      }

      alert(result.message || "Campo agregado correctamente");
      form_nuevos_campos.reset();
      location.reload();
    } catch (error) {
      console.error("Error al enviar nuevos campos:", error);
      alert(error.message || "No se pudo enviar el formulario");
    }
  });
});

/*
ENVIAR LOS REGISTROS DE LOS CAMPOS

Esta funcion envia  datos de nuevos registros  de items (objetos, modelos, marcas) hacia la base de datos del sistema
*/

document.addEventListener("DOMContentLoaded", () => {
  const btn_agregar_campos = document.getElementById("btn_agregar_campos");
  const form_nuevos_campos = document.getElementById("form_nuevos_campos");

  if (!btn_agregar_campos || !form_nuevos_campos) {
    console.error("No se encontró el boton para enviar nuevos campos");
    return;
  }

  btn_agregar_campos.addEventListener("click", async (event) => {
    event.preventDefault();

    const formData = new FormData(form_nuevos_campos);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/registrar_nuevos_datos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const result = await response.json();
      //   console.log("Resultado del envío:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error al enviar el formulario");
      }

      alert(result.message || "Campo agregado correctamente");
      form_nuevos_campos.reset();
      location.reload();
    } catch (error) {
      console.error("Error al enviar nuevos campos:", error);
      alert(error.message || "No se pudo enviar el formulario");
    }
  });
});

/*
EDITAR Y/O ELIMINAR REGISTROS DE CAMPOS

Esta funcion elimina datos de items (objetos, modelos, marcas) en la base de datos del sistema
*/

document.addEventListener("DOMContentLoaded", async () => {

  const tabla = document.getElementById("tbody_tabla_lista_campos");
  const idCampo = document.getElementById("txt_id_campos");
  const nombreCampo = document.getElementById("txt_agregar_nombre_campos");

  const tablaCampo = document.getElementById("cbb_agregar_tabla_campos");
  const categoriaCampo = document.getElementById(
    "cbb_agregar_categoria_campos",
  );
  const estadoCampo = document.getElementById("cbb_agregar_estado_campos");
  const descripcionCampo = document.getElementById("txt_descripcion_campos");

  // Quitamos el parámetro 'e' que no existe, solo dejamos 'event'
  tabla.addEventListener("click", async (event) => {
    const boton = event.target.closest("[data-accion]");

    if (!boton) return;

    const accion = boton.dataset.accion;
    const id = boton.dataset.id;
    const tipo = boton.dataset.tipo;
    const nombre = boton.dataset.nombre;
    const nomTabla = boton.dataset.tablaorigen;
    const categoria = boton.dataset.categoria;
    const estado = boton.dataset.estado;
    const descripcion = boton.dataset.descripcion;

    if (accion === "editar") {
      idCampo.value = id;
      nombreCampo.value = nombre;

      if (tablaCampo) {
        console.log("si esta el cbb");
        $("#cbb_agregar_tabla_campos").val(nomTabla).trigger("change");
      } else {
        console.log("no esta el cbb listar tabla");
      }
      $("#cbb_agregar_categoria_campos").val(categoria).trigger("change");
      $("#cbb_agregar_estado_campos").val(estado).trigger("change");

      descripcionCampo.value = descripcion;
    } else if (accion === "eliminar") {
      // 1. Usamos 'event' que es el objeto real del click para prevenir comportamientos raros
      if (event) event.preventDefault();

      // 2. Corregido a 'window.confirm'
      const usuarioConfirma = window.confirm(
        "¿Estás seguro que deseas eliminar este campo?",
      );

      if (usuarioConfirma) {
        try {
          const res = await fetch("/eliminar_nuevos_elementos", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tipo,
              id,
            }),
          });

          if (res.ok) {
            location.reload(); // Solo recarga si el servidor respondió OK
          } else {
            alert("No se pudo eliminar el campo correctamente.");
          }
        } catch (error) {
          console.error("A wrong happened: " + error);
        }
      }
  
    }
  });
});



/*
MOSTRAR VENTANA DE REGISTROS DE ARTICULOS U OBJETOS (PANTALLA PRINCIPAL DE REGISTRO)

Esta funcion redirige de la pestaña de registro de nuevos datos de items  ---> hacia la ventana de registro de registro de articulos
*/

document.addEventListener("DOMContentLoaded", () => {
  const btnretornar = document.getElementById("btn_retornar_registro");

  btnretornar.addEventListener("click", () => {
    window.location.href = "/registro";
  });
});

/*
MOSTRAR VENTANA DE REGISTROS DE INFORME DE INVENTARIO

Esta funcion redirige de la pestaña de registro de nuevos datos de items  ---> hacia la ventana de registro de registro de articulos
*/

document.addEventListener("DOMContentLoaded", () => {
  const btn_reporte = document.getElementById("btn_reporte");

  btn_reporte.addEventListener("click", () => {
    window.location.href = "/informe_inventario";
  });
});
