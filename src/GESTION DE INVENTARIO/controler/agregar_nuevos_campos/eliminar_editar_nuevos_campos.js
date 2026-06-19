document.addEventListener("DOMContentLoaded", async () => {
  //id de la tabla
  const tabla = document.getElementById("tbody_tabla_lista_campos");

  //id de las cajas de texto y cbb

  const nombreCampo = document.getElementById("txt_agregar_nombre_campos");
  const areaCampo = document.getElementById("cbb_agregar_area_campos");
  console.log(areaCampo);
  const categoriaCampo = document.getElementById(
    "cbb_agregar_categoria_campos",
  );
  const estadoCampo = document.getElementById("cbb_agregar_estado_campos");

  tabla.addEventListener("click", async (event) => {
    const boton = event.target.closest("[data-accion]");

    // Si el click no fue sobre un botón de acción, ignoramos el evento
    if (!boton) return;

    const accion = boton.dataset.accion;
    const id = boton.dataset.id;
    const tipo = boton.dataset.tipo;
    const nombre = boton.dataset.nombre;
    const categoria = boton.dataset.categoria;
    const estado = boton.dataset.estado;

    if (accion === "editar") {
      nombreCampo.value = nombre;
      
    }

    if (accion === "eliminar") {
      const res = await fetch("/eliminar_nuevos_elementos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tipo, id }),
      });

      if (res.ok) {
        location.reload();
      }
    }
  });
});
