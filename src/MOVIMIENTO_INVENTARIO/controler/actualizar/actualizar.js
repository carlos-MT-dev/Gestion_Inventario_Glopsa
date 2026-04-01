document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-actualizar");
  const form = document.getElementById("form-registro");

  if (!btn || !form) {
    console.error("No se encontró el botón o el formulario");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const idPrestamo = document.getElementById("Codigo_prestamo").value;
       

      if (!idPrestamo) {
        alert("ID del prestamo no encontrado");
        return;
      }

      const formData = new FormData(form);

      const res = await fetch(`/actualizar/prestamo/${idPrestamo}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error HTTP: " + res.status);
      }

      const data = await res.json();
      console.log("Respuesta servidor:", data);

      if (data.ok) {
        alert("Prestamo actualizado correctamente");
        location.reload();
      }
    } catch (error) {
      console.error("Error al enviar las actualizaciones del prestamo:", error);
    }
  });
});
