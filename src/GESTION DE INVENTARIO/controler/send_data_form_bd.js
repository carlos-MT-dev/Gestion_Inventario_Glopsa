document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-registrar");
  const form = document.getElementById("form-registro");

  if (!btn || !form) {
    console.error("No se encontró el botón o el formulario");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData);

      const res = await fetch("/registrar_equipo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonData),
      });

      // Verificar si la respuesta es JSON válida
      const contentType = res.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await res.json();
      } else {
        // Si no es JSON, probablemente es una redirección HTML (sesión expirada)
        console.error("Respuesta no es JSON:", res.status, res.statusText);
        alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        window.location.href = '/login';
        return;
      }

      if (!res.ok) {
        console.error("Error en servidor:", data);
        alert(`Error (${res.status}): ${data.message || "No se pudo registrar el equipo"}`);
        return;
      }

     

      if (data.ok) {
        alert("Registro exitoso");
        location.reload();
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Ocurrió un error al enviar los datos. Verifica la consola para más detalles.");
    }
  });
});