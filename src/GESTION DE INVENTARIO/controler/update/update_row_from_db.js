document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-actualizar");
  const form = document.getElementById("form-registro");

  if (!btn || !form) {
    console.error("No se encontró el botón o el formulario");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const idObjeto = document
        .getElementById("btn-actualizar")
        .getAttribute("ID_objeto_btn_actualizar");

      if (!idObjeto) {
        alert("ID del objeto no encontrado");
        return;
      }

      const formData = new FormData(form);

      const res = await fetch(`/actualizar/equipo/${idObjeto}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }

      const data = await res.json();
      console.log("Respuesta servidor:", data);

      if (data.ok) {
        alert("Equipo actualizado correctamente");
        location.reload();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  });
});
