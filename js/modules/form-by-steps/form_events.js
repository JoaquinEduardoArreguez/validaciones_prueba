export default class Form_Events {
  constructor() {
    this.initPrevNextButtons();
  }

  initPrevNextButtons() {
    const $prevButton = $(".js-previous");
    const $nextButton = $(".js-next");
    const $finishButton = $(".js-finish");

    //let $childGroupSelectUnder18 = $("select#childGroupSelectUnder18");

    $prevButton.click(this.previousAction.bind(this));
    $nextButton.click(this.nextAction.bind(this));
    $finishButton.click(this.preventDefault);
  }

  initSendFormEvent(callback) {
    let $sendForm = $(".js-sendForm");
    $sendForm.click(callback);
  }

  /**
   * 2) Simplifica esta función para que sean menos líneas.
   *
   * (1 <= nextStep <= 3) es una condición que se asegura
   * porque los botones 'prev' y 'next' aparecen en el formulario
   * sólo cuadno son posibles, osea, en el step 1 el formulario
   * sólo muestra el boton 'next', asegurando que nextStep nunc puede ser
   * menor a 1.De igual forma está seteado el límite superior del valor.
   */

  goToStep(step, direction = "next") {
    const currentStep = +step.replace(/^step\-/, "");
    let goToStep = ".step-";
    const nextStep = direction == "next" ? currentStep + 1 : currentStep - 1;
    this.progressBar(Math.round(nextStep * 33.33));
    return (goToStep += nextStep);
  }

  // 3) ¿Se puede evitar repetir mismas líneas que en previousAction?
  // input : event , direction : dictates if the change is previous or next ('prev' or ''/'next' ).

  preventDefault(event) {
    event.preventDefault();
  }

  changeAction(evt, direction = "next") {
    this.preventDefault(evt);

    let $current = $(evt.currentTarget);
    let $formStep = $current.parents(".form-step");

    $formStep.addClass("d-none");

    let $step = $(this.goToStep($formStep[0].classList[1], direction));
    $step.removeClass("d-none");
  }

  previousAction(evt) {
    this.changeAction(evt, "prev");
  }

  nextAction(evt) {
    this.changeAction(evt);
  }

  progressBar(percent) {
    // 1) Escribir aqui como sería la lógica para incrementar la barra de porcentaje.
    let $progressBar = $(".progress-bar");
    $progressBar.css("width", percent + "%");
    $progressBar.html(percent + "%");
  }
}
