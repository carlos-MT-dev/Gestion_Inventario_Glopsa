document.addEventListener("click", ()=>{
//  llamamos al boton
const btnBorrarCampos = document.getElementById("btn-reset");

//logica para actualizar la pagina entera al presionar el boton  reset

btnBorrarCampos.addEventListener("click", ()=>{
    

    document.getElementById("form-registro").reset();
    document.getElementById("Codigo_Objeto").readOnly = false;
    document.getElementById("Codigo_prestamo").readOnly = true;
    ;
  
      // const hoy = new Date();
      
      // const dia = String(hoy.getDate()).padStart(2, "0");
      // const mes = String(hoy.getMonth() + 1).padStart(2, "0");
      // const anio = String(hoy.getFullYear()).slice(-2);
      
      // const fechaFormateada = `${dia}-${mes}-${anio}`;
  
      // document.getElementById("Fecha_prestamo").value = fechaFormateada;

});


})