

document.addEventListener("DOMContentLoaded", async () => {
    

  //llamamos al txt codigo objeto
  const txtCodigoObjeto = document.getElementById("Codigo_Objeto");


  //obtengo la id que se almaceno previamente en el local storage
  const codigo = localStorage.getItem("idObjeto");

  console.log("Datos obtenidos del localStorage:", {
    codigo
  });

  //seteamos el valor en el txt

    txtCodigoObjeto.value = codigo;

  //convertimo el txt en un readonly
  if (txtCodigoObjeto.value) {
    txtCodigoObjeto.readOnly = true;
  } else {
    txtCodigoObjeto.readOnly = false;
  }
});

