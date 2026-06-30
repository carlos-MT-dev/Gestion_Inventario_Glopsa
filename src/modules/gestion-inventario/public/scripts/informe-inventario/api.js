
document.addEventListener("DOMContentLoaded",async()=>{
//  TRAEMOS LAS CAJAS  DE TEXTO DONDE SE LLENARAN LOS CAMPOS



try {


     const res = await fetch("/api/form");
     const data = await res.json();

       llenarSelectEspeciales(
         "ID_categoria_informe_inventario",
         data.categoria,
         "categoria",
         "ID_categoria",
       );

    llenarSelectEspeciales(
      "ID_objeto_informe_inventario",
      data.item,
      "Item",
      "ID_item",
    );

      llenarSelectEspeciales(
        "ID_marca_informe_inventario",
        data.marca,
        "Marca",
        "ID_marca",
      );
    
      llenarSelectEspeciales(
        "ID_modelo_informe_inventario",
        data.modelo,
        "modelo",
        "ID_modelo",
      );

     llenarSelectEspeciales(
       "ID_Condicion_informe_inventario",
       data.condicion,
       "Condicion",
       "ID_CondicionObj",
     );

    llenarSelectEspeciales(
      "ID_sede_informe_inventario",
      data.sede,
      "Sede",
      "ID_sede",
    );

} catch (error) {
    console.log("error en:" + error);
};
   
});


// ("ID_area", data.area, "Area", "ID_area");
// function llenarSelect(idSelect, lista, campo, id) {
//   const select = document.getElementById(idSelect);

//   if (!select) {
//     console.warn(`Elemento #${idSelect} no encontrado`);
//     return;
//   }

//   // LIMPIAR SELECT
//   select.innerHTML = `<option value="">SELECCIONAR</option>`;

//   // Insertar las opciones
//   lista.forEach((item) => {
//     const opt = document.createElement("option");
//     let pos = 0;
//     opt.value = item[id];
//     opt.textContent = item[campo];
//     select.appendChild(opt);
//   });
// }


//FUNCION LLENAR SELECT CAMPOS ESPECIALES
function llenarSelectEspeciales(idSelect, lista, campo, id) {
  const select = document.getElementById(idSelect);

  if (!select) {
    console.warn(`Elemento #${idSelect} no encontrado`);
    return;
  }

  // Limpiar
  select.innerHTML = `<option value="">SELECCIONAR</option>`;

  // Llenar opciones
  lista.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item[id];
    opt.textContent = item[campo].toLowerCase();

   

    select.appendChild(opt);
  });

  //  Inicializar Select2
  $(`#${idSelect}`).select2({
    placeholder: "Buscar...",
    allowClear: true,
    width: "100%",
  });
}
