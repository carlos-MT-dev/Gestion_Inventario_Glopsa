document.addEventListener("DOMContentLoaded", () => {
  const btnRegistro = document.getElementById("btn-registrar");
  const formRegistro = document.getElementById("form-registro");

  if (!btnRegistro || !formRegistro) {
    console.error("El elemento no se encontró en el DOM");
    return;
  }

  btnRegistro.addEventListener("click", async () => {
    try {
      const txtCodigoObjeto = document.getElementById("Codigo_Objeto");
      const formData = new FormData(formRegistro);
      const jsonData = Object.fromEntries(formData);

      const res = await fetch("/registrar_prestamo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();

  
 
      if (data.ok) {
        alert("Registro exitoso");
        txtCodigoObjeto.readOnly= false;
        txtCodigoObjeto.value = "";
        location.reload();
      }
    } catch (error) {
      console.error(
        "Ocurrió un error en el evento click del botón registrar préstamo",
        error,
      );
    }
  });
});
