document.addEventListener("click", (e) => {
  const boton = e.target.closest(".btn-mover-item-class");

  if (!boton) return;

  moverCodigoId(boton);

});

async function moverCodigoId(btn) {

  const id = btn.dataset.codigo;
  // guardar en localStorage
  localStorage.setItem("idObjeto", id);

  // redirigir
  window.location.href = "/MOVIMIENTO_INVENTARIO/view/prestamo.html";
}
