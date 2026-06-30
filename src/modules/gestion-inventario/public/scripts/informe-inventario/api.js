
document.addEventListener("DOMContentLoaded",async()=>{
//  TRAEMOS LAS CAJAS  DE TEXTO DONDE SE LLENARAN LOS CAMPOS



try {


     const res = await fetch("/api/form");
     const data = await res.json();

       llenarSelect(
      "ID_categoria_informe_inventario",
      data.categoria,
      "categoria",
      "ID_categoria",
    );

    llenarSelect(
      "ID_objeto_informe_inventario",
      data.item,
      "Item",
      "ID_item",
    );

      llenarSelect(
      "ID_marca_informe_inventario",
      data.marca,
      "Marca",
      "ID_marca",
    );
    
      llenarSelect(
      "ID_modelo_informe_inventario",
      data.modelo,
      "modelo",
      "ID_modelo",
    );

     llenarSelect(
      "ID_Condicion_informe_inventario",
      data.condicion,
      "Condicion",
      "ID_CondicionObj",
    );

    llenarSelect(
        "ID_sede_informe_inventario",
        data.sede,
        "Sede",
        "ID_sede"
    )

} catch (error) {
    console.log("error en:" + error);
};
   
});


// ("ID_area", data.area, "Area", "ID_area");
function llenarSelect(idSelect, lista, campo, id) {
  const select = document.getElementById(idSelect);

  if (!select) {
    console.warn(`Elemento #${idSelect} no encontrado`);
    return;
  }

  // LIMPIAR SELECT
  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  // Insertar las opciones
  lista.forEach((item) => {
    const opt = document.createElement("option");
    let pos = 0;
    opt.value = item[id];
    opt.textContent = item[campo];
    select.appendChild(opt);
  });
}