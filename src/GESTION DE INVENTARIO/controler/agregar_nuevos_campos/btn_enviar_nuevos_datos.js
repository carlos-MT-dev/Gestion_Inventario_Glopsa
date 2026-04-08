
document.addEventListener("DOMContentLoaded", () => {
  const form1 = document.getElementById("form_nuevos_registros_objeto");
  const form2 = document.getElementById("form_nuevos_registros_marca");
  const form3 = document.getElementById("form_nuevos_registros_modelo");

  const btn_registrar_objeto = document.getElementById("btn_registrar_objeto");
  const btn_registrar_marca = document.getElementById("btn_registrar_marca");
  const btn_registrar_modelo = document.getElementById("btn_registrar_modelo");

  let txt_nuevo_objeto= document.getElementById("txt_nuevo_objeto");
  let txt_nueva_marca= document.getElementById("txt_nueva_marca");
  let txt_nuevo_modelo= document.getElementById("txt_nuevo_modelo");

 

  async function enviarFormulario(form, cajadetexto) {
    try {
      const formData = new FormData(form);
      const jsonData = Object.fromEntries(formData);

      const res = await fetch("/registrar_nuevos_datos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      const contentType = res.headers.get("content-type");
      let data;

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        console.error("Respuesta no es JSON:", res.status, res.statusText);
        alert("Tu sesión ha expirado. Por favor inicia sesión nuevamente.");
        window.location.href = "/login";
        return;
      }

      if (data.ok) {
        const nombreElemento = Object.values(data.datos)[0];

        cajadetexto.value = "";
        document.getElementById("registro_nuevos_campos").style.display =
        "none";
        alert(`Se agregó correctamente el elemento ${nombreElemento}`);
        location.reload();
      } else {
        alert("No se pudo registrar el elemento");
      }
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("Error al registrar el elemento");
    }
  }

  btn_registrar_objeto.addEventListener("click", () => enviarFormulario(form1, txt_nuevo_objeto));
  btn_registrar_marca.addEventListener("click", () => enviarFormulario(form2, txt_nueva_marca));
  btn_registrar_modelo.addEventListener("click", () => enviarFormulario(form3, txt_nuevo_modelo));
});