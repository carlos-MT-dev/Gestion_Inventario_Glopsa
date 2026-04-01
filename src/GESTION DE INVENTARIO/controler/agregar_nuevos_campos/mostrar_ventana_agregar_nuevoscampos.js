document.addEventListener("DOMContentLoaded", () => {
  const btnAgregarCampos = document.getElementById("btn_agregar_nuevos_campos");

  btnAgregarCampos.addEventListener("click", () => {
    document.getElementById("registro_nuevos_campos").style.display = "block";
  });

  const cerrar = document.getElementById("cerrar_ventana_agregarCampos");

  cerrar.addEventListener("click", () => {
   document.getElementById("registro_nuevos_campos").style.display = "none";
  });
});
