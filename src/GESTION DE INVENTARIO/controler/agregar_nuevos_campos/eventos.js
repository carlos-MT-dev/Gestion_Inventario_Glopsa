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
ELIMINAR REGISTROS DE CAMPOS

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

  tabla.addEventListener("click", async (event) => {
    const boton = event.target.closest("[data-accion]");

    if (!boton) return;

    const accion = boton.dataset.accion;
    const id = boton.dataset.id;
    const tipo = boton.dataset.tipo;
    const nombre = boton.dataset.nombre;
    const nomTabla = boton.dataset.tabla;
    const categoria = boton.dataset.categoria;
    const estado = boton.dataset.estado;
    const descripcion = boton.dataset.descripcion;

    if (accion === "editar") {
      idCampo.value = id;
      nombreCampo.value = nombre;
      tablaCampo.value;
      categoriaCampo.value = categoria;
      estadoCampo.value = estado;
      descripcionCampo.value = descripcion;
    } else if (accion === "eliminar") {
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
        location.reload();
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
