document.addEventListener("click", function (e) {

  const btn = e.target.closest(".btn-codigo-item-class");

  if (!btn) return;

  const codigo = btn.dataset.codigo;

  // console.log("Código:", codigo);

  generarYDescargar(codigo);

});

function generarYDescargar(codigo) {
  const canvas = document.createElement("canvas");

  JsBarcode(canvas, codigo, {
    format: "CODE128",
    width: 2,
    height: 80,
    displayValue: true,
  });

  const url = canvas.toDataURL("image/png");

  const a = document.createElement("a");
  a.href = url;
  a.download = `${codigo}.png`;
  a.click();
}
