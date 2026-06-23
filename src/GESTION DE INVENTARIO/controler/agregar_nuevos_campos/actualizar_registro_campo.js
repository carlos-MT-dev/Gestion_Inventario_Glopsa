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
