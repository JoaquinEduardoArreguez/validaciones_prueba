import FormEvents from "./form_events.js";
import FormValidation from "./form_validation.js";
//import FormScript from "../../script";

export default class Form {
  constructor() {
    this.formEvents = new FormEvents();
    this.initSendFormAction();
    this.formValidation = new FormValidation();

    this.invalidInputsMessageShow = false;

    console.log("form init");
  }

  initSendFormAction() {
    this.formEvents.initSendFormEvent(this.sendForm.bind(this));
  }

  sendForm() {
    // Escribir aquí el código para enviar todos los datos del formulario.
    // enviar a https://reqres.in/api/users (Esta web sirve para realizar pruebas REST API, por lo tanto NO ENVIAR DATOS REALES)
    // la API retorna un JSON con el id del usuario creado y la info guardada.
    // Para mas info ver en https://reqres.in

    // Get all forms to check validation. Cant send form if not validated.
    let forms = document.getElementsByClassName("needs-validation");
    let invalidInputsNumber = 0;
    //var invalidInputsMessageShow = false;
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function (form) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        invalidInputsNumber++;
      }
      form.classList.add("was-validated");
    });

    // let $validationWarning = `<div id="validationWarningAlert" class="alert alert-warning" role="alert">
    //   Check data highlighted in <strong class="text-danger">red</strong>.
    // </div>`;

    // if (this.invalidInputsMessageShow == false) {
    //   $("#finalDialog").append($validationWarning);
    //   this.invalidInputsMessageShow = true;
    // }

    let $validationWarningString = `<div id="validationWarningAlert" class="alert alert-warning" role="alert">
      Check data highlighted in <strong class="text-danger">red</strong>.
    </div>`;

    if (invalidInputsNumber === 0) {

      $('#validationWarningAlert').remove();  //Remove if previous existing.
      
      $("#finalDialog").append($validationWarningString);

      $('#validationWarningAlert').removeClass('alert-warning').addClass('alert-success').text('Information complete, ready to send!');

      let delayInMilliseconds = 1000; //1 second

setTimeout(function() {}, delayInMilliseconds);

      
/*
      if (this.invalidInputsMessageShow == true) {
        $("#finalDialog").append($validationWarning);
        this.invalidInputsMessageShow = true;
      }
      */

      //$('#validationWarningAlert').removeClass('alert-warning').addClass('alert-success').text('Sent! Press F12 to see response.');

      let formData = {};

      $("#formulario")
        .serializeArray()
        .forEach((element) => (formData[element.name] = element.value));

      //formData = JSON.stringify(formData); fetch en body da error de sintaxis si ejecuto stringify antes.
      // quizá la definición de formData no es correcta, pero funciona por contener el resultado de stringify.

      console.log("Sending form data...");

      fetch("https://reqres.in/api/users", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        console.log(resp.json().then(
          //(rp) => console.log(rp)
          (rp) => {
            console.log(rp);
            
          }
          ));
      });
    }else{
      $('#validationWarningAlert').remove();  //Remove if previous existing.
      //$('#validationWarningAlert').removeClass('alert-success').addClass('alert-warning').text('Information complete, ready to send!');
      $("#finalDialog").append($validationWarningString);
    }



  }
}
