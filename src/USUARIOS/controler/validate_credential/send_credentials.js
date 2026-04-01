document.addEventListener("DOMContentLoaded", () => {
  const btnIniciarSesion = document.getElementById("btn-login");
  const formLogin = document.getElementById("loginForm");

console.log("hola")

  btnIniciarSesion.addEventListener("click", async () => {


    const formData = new FormData(formLogin);
     const jsonData = Object.fromEntries(formData);

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({jsonData}),
      });

      const result = await response.json();

      if (result.ok) {
        alert("Login exitoso");
        window.location.href = "/registro";
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

});

