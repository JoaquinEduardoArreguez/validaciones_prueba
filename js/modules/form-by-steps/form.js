import FormEvents from "./form_events.js";
import FormValidation from "./form_validation.js";

export default class Form {
  constructor() {
    this.formEvents = new FormEvents();
    this.initSendFormAction();

    console.log("inside");

    this.formValidation = new FormValidation();
  }

  initSendFormAction() {
    this.formEvents.initSendFormEvent(this.sendForm.bind(this));
  }

  sendForm() {
    console.log("Sending form data...");
    // Escribir aquí el código para enviar todos los datos del formulario.
    // enviar a https://reqres.in/api/users (Esta web sirve para realizar pruebas REST API, por lo tanto NO ENVIAR DATOS REALES)
    // la API retorna un JSON con el id del usuario creado y la info guardada.
    // Para mas info ver en https://reqres.in
    /*
        console.log('-------------------------------------');
        //console.log(JSON.stringify($("#formulario").serializeArray()));
        console.log($("#formulario").serializeArray());
        console.log('-------------------------------------');
        */
/*
    let data = {
      name: "morpheus",
      job: "leader",
    };
    */

    //body: JSON.stringify($("#formulario").serializeArray()),

    /*
        let formData = {};
        $('.form').serializeArray().forEach(
            element =>
                formData[element.name]=element.value
        )

        formData = JSON.stringify(formData);

        console.log(formData);
        */

    let formData = {};

    $("#formulario")
      .serializeArray()
      .forEach((element) => (formData[element.name] = element.value));

    //formData = JSON.stringify(formData); fetch en body da error de sintaxis si ejecuto stringify antes.
    // quizá la definición de formData no es correcta, pero funciona por contener el resultado de stringify.

    fetch("https://reqres.in/api/users", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      console.log(resp.json().then((rp) => console.log(rp)));
      //debugger;
    });
  }
}
