    const form = document.getElementById('contactForm'); // Obtenemos la referencia al formulario

    if(form){ // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
      form.addEventListener('submit', contactForm); // Al momento de enviar el formulario, ejecuta la función "contactform"
    }

    function contactForm(event) {
      event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
      const name = document.getElementById('name'); // Obtenemos la referencia a cada uno de nuestros elementos del formulario
      const email = document.getElementById('email');
      const message = document.getElementById("message");
      const data = {
        'name': name.value,
        'email': email.value,
        'message': message.value
      }; // Creamos un objecto con todos los elementos de nuestro formulario.
      saveContactForm(data); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
      form.reset(); // borramos todos los campos. 
    }

  function saveContactForm(data) {
    firebase.database().ref('contact').push(data) // Hacemos referencia al método database de el SDK y hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function(){
        Swal.fire({
          title: "Exitoso",
          text: "Su mensaje se ha enviado correctamente",
          icon: "succes",
          confirmButtonText: "Ok",
          footer:"¿Desea seguir navegando?"
        });// Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
      .catch(function(){
        Swal.fire({
          title: "Error!",
          text: "Hubo un error al enviar el formulario",
          icon: "warning",
          confirmButtonText: "Ok",
          footer:"¿Desea volver a intentarlo?"
        }); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
      });
  };
