document.addEventListener("DOMContentLoaded", () => {
  const btnDelete = document.querySelector(".btn.remove");

  if (!btnDelete) {
    console.error("No se encontró el botón de eliminar");
    return;
  }

  btnDelete.addEventListener("click", async () => {
    const id = document
      .getElementById("btn-eliminar")
      .getAttribute("id_prestamo");

    //validaciones
    console.log("el id  que se eliminara es :",id)

    if (!id) {
      alert("Por favor, selecciona un objeto de la tabla primero.");
      return;
    }

    if (!confirm("¿Estás seguro de que quieres eliminar este objeto?")) {
      return;
    }


    //Inicio de llamdo al fecth
    try {
      //metodo fetch para enviar datos a express
      const res = await fetch("/api/delete/prestamo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });

      
      if (res.ok) {
        const data = await res.json();
        alert(data.message || "Objeto eliminado correctamente");
         location.reload();
        // Recargar la tabla
        // if (window.cargarTabla) {
        //   window.cargarTabla();
        // } else {
        //   location.reload();
        // }
      } else {
        try {
          const errorData = await res.json();
          alert("Error al eliminar: " + (errorData.message || errorData.error || "Error desconocido"));
        } catch (e) {
          alert("Error al eliminar: " + res.status + " " + res.statusText);
        }
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error de conexión al eliminar el objeto");
    }
  });
});