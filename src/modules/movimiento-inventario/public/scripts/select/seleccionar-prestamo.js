document.addEventListener("click", (e) => {
  if (e.target.classList.contains("select-btn")) {
    cargarFormulario(e.target);
  }
});

function cargarFormulario(btn) {
  
  document.getElementById("Codigo_prestamo").value = btn.dataset.id_prestamo;
  document.getElementById("Codigo_Objeto").value = btn.dataset.id_objeto;
  document.getElementById("ID_movimiento").value = btn.dataset.movimiento;
  document.getElementById("ID_sede_origen").value = btn.dataset.sede_origen;
  document.getElementById("ID_area").value = btn.dataset.area_origen;
  document.getElementById("ID_sede_destino").value = btn.dataset.sede_destino;
  document.getElementById("ID_area_destino").value = btn.dataset.area_destino;
  document.getElementById("Duracion_prestamo").value = btn.dataset.duracion;
  document.getElementById("ID_encargado_prestamo").value =btn.dataset.usuario_origen;
  document.getElementById("ID_recepcionista").value =btn.dataset.usuario_destino;
  document.getElementById("ID_estado").value = btn.dataset.estado;
  document.getElementById("Fecha_prestamo").value = btn.dataset.fecha_prestamo;
  document.getElementById("Fecha_retorno").value = btn.dataset.fecha_retorno;
  document.getElementById("Descripcion").value = btn.dataset.descripcion;

 // para volver ineditable el txt de codigo del prestamo y el codigo del objeto
  document.getElementById("Codigo_prestamo").readOnly = true;
  document.getElementById("Codigo_Objeto").readOnly = true;

  //setear el valor de la id del prestamo en los botones eliminar y actualizar

  document
    .getElementById("btn-actualizar")
    .setAttribute("ID_prestamo", btn.dataset.id_prestamo);
  document
    .getElementById("btn-buscar")
    .setAttribute("ID_prestamo", btn.dataset.id_prestamo);
     document
       .getElementById("btn-eliminar")
       .setAttribute("ID_prestamo", btn.dataset.id_prestamo);


}
  

