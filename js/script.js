import Form from './modules/form-by-steps/form.js';

class Main extends Form {

    constructor() {
        super();
        console.log('change childs init');
        this.initChildrenData();
    }
    
    // En el paso 2 al seleccionar los hijos menores de 18 años debe mostrar
    // los datos a completar de los hijos según el número de los mismos, por
    // lo tanto se deberia copiar la fila Child #1 y generar para los demás,
    // si se cambia nuevamente el número de hijos éste debe cambiar también por
    // lo que si selecciona None o al inicio no debe mostrar dicha fila Child #1

    initChildrenData(){
        let $childrenData = $("div.childrenData").clone(true);  // Children data to show later, depending on "select#childGroupSelectUnder18"
        $("div.childrenData").remove();//Remove all existing children data inputs
        let $selectedChildNumber;  // Children number selected, default = 0.
        // Add event listener to get selected number of childrens.
        $(document).ready(
    
    
          function(){
    
            $("select#childGroupSelectUnder18").change(
              function(){
    
                $selectedChildNumber = $(this).children("option:selected").val();
                //alert('HAVE '+ $selectedChildNumber +" CHILDREN");
    
                $("div.childrenData").remove();//Remove all existing children data inputs
    
                for(let i=0;i<$selectedChildNumber;i++){
    
                  let auxChildrenData = $childrenData.clone(true);

                  auxChildrenData.find('#childName').attr('id','childName'+i).attr('name','childName'+i);
                  auxChildrenData.find('#childLastName').attr('id','childLastName'+i).attr('name','childLastName'+i);
                  auxChildrenData.find('#childBirthdate').attr('id','childBirthdate'+i).attr('name','childBirthdate'+i);
                  
    
    
    
                  auxChildrenData.appendTo("div.childrenDataContainer");
                  //$childrenData.clone(true).appendTo("div.childrenDataContainer");
                }
              }
            );
          }
        );       
    
      }

}

let main = new Main();