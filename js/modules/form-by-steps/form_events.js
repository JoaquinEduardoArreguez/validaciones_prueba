export default class Form_Events {
  constructor() {
    this.initPrevNextButtons();
    this.initChildrenData();
  }

  initChildrenData(){
    let $childrenData = $("div.childrenData");  // Children data to show later, depending on "select#childGroupSelectUnder18"
    $("div.childrenData").remove();//Remove all existing children data inputs
    let $selectedChildNumber;  // Children number selected, default = 0.
    // Add event listener to get selected number of childrens.
    $(document).ready(


      function(){

        $("select#childGroupSelectUnder18").change(
          function(){

            $selectedChildNumber = $(this).children("option:selected").val();
            alert('HAVE '+ $selectedChildNumber +" CHILDREN");

            $("div.childrenData").remove();//Remove all existing children data inputs

            for(let i=0;i<$selectedChildNumber;i++){
              $childrenData.clone(true).appendTo("div.childrenDataContainer");
            }
          }
        );
      }
    );       

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
  /*
    goToStep(step, direction = 'next') {
        // 2) Simplifica esta función para que sean menos líneas.
        let currentStep = step.replace(/^step\-/, '');
        let goToStep = '.step-';
        switch (currentStep) {
            case '1':
                goToStep += '2';
                break;
            case '2':
                if ('prev' === direction) {
                    goToStep += '1';
                } else {
                    goToStep += '3';
                }
                break;
            case '3':
                goToStep += '2';
                break;
            default:
                break;
        }
        return goToStep;
    }
    */
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
    let currentStep = +step.replace(/^step\-/, "");
    let goToStep = ".step-";
    let nextStep;
    if (direction === "next") nextStep = currentStep + 1;
    else nextStep = currentStep - 1;
    goToStep += nextStep;
    this.progressBar(Math.round(nextStep * 33.33));
    return goToStep;
  }

  /*
    previousAction(evt) {
        let $current = $(evt.currentTarget);
        let $formStep = $current.parents('.form-step');
        
        $formStep.addClass('d-none');

        let $prevStep = $(this.goToStep($formStep[0].classList[1], 'prev'));
        $prevStep.removeClass('d-none');
    }

    nextAction(evt) {
        // 3) ¿Se puede evitar repetir mismas líneas que en previousAction?
        let $current = $(evt.currentTarget);
        let $formStep = $current.parents('.form-step');
        
        $formStep.addClass('d-none');

        let $nextStep = $(this.goToStep($formStep[0].classList[1]));
        $nextStep.removeClass('d-none');
    }
    */

  // 3) ¿Se puede evitar repetir mismas líneas que en previousAction?
  // input : event , direction : dictates if the change is previous or next ('prev' or ''/'next' ).

  preventDefault(event){
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
