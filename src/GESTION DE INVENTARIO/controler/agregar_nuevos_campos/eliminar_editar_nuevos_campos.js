document.addEventListener("DOMContentLoaded", async () => {
  const tabla = document.getElementById("tbody_tabla_lista_campos");
  const idCampo = document.getElementById("txt_id_campos");
  const nombreCampo = document.getElementById("txt_agregar_nombre_campos");

  const tablaCampo = document.getElementById("cbb_agregar_tabla_campos");
  const categoriaCampo = document.getElementById("cbb_agregar_categoria_campos");
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
      tablaCampo.value ;
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
