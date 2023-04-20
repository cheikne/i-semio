var script = document.currentScript;

var id_competence = script.getAttribute('id_competence');
document.getElementById(id_competence).style.backgroundColor  = ' #0099a2';
document.getElementById(id_competence).style.color  = 'black';

function calculTotalItemsClicked(idCheckbox , idTotalItems){
    var checkBox = document.getElementById(idCheckbox);
    var totalAppris = document.getElementById(idTotalItems);
    if (checkBox.checked == true){
        totalAppris.innerHTML = parseInt(totalAppris.innerHTML,10) + 1;
    }else{
        totalAppris.innerHTML = parseInt(totalAppris.innerHTML,10) - 1;
    }
}

//Calcule la valeur de la barre de progression 
function calculerValueProgressBarForEvaluationFinal(idRange , idPourcentage){
    const rangeSlider = document.getElementById(idRange);
    const sliderHandle = document.getElementById(idPourcentage);
    var rangeSliderValue = rangeSlider.value;
    sliderHandle.innerHTML = rangeSliderValue;
}

function calculerValueProgressBarForEvaluationInit(idRange , idPourcentage){
    const rangeSlider = document.getElementById(idRange);
    const sliderHandle = document.getElementById(idPourcentage);
    var rangeSliderValue = rangeSlider.value;
    sliderHandle.innerHTML = rangeSliderValue;
}

// Exemple de soumission des donnees de la competence Hematologique dans la base de donnnees
function submitHematologique(event , jsonAllId) {
    event.preventDefault();
    var all = [];
    var appris = null, vu_faire = null , fait = null , acquis = null;
    for (const key in jsonAllId) {
        const element = jsonAllId[key];
        console.log("test "+element["vu_faire"]);
        appris = document.getElementById(element["appris"]).checked == true ? true : false;
        vu_faire = document.getElementById(element["vu_faire"]).checked == true ? true : false;
        fait = document.getElementById(element["fait"]).checked == true? true : false;
        acquis = document.getElementById(element["acquis"]).checked == true ? true : false;
        all.push([appris , vu_faire , fait , acquis]);
    }

    $.ajax({
        type: 'POST',
        url: '/competences/semio_hematologique',
        data: {
          'mydata': JSON.stringify(all)
        },
        success: function(response) {
            alert("Coucou : tous s'est bien passé !");
        },
        error: function(xhr, status, error) {
            alert("Ooopsss : Quelque chose ne va pas !");
        }
      });
}

function chercherByItems() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("input_bar_recherche_by_items");
    filter = input.value.toUpperCase();
    table = document.getElementById("table_a_filtrer_by_items");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
}

function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const is_mobile = /iphone|ipod|ipad|android/.test(userAgent);
    return is_mobile ? 'mobile' : 'desktop';
  }
  
  // Utilisation :
  const device_type = detectDevice();
  if (device_type === 'mobile') {
    document.getElementById("device_mobile").style.display = "block";
    document.getElementById("device_desktop").innerHTML = "";
  } else {
    document.getElementById("device_desktop").style.display = "block";
    document.getElementById("device_mobile").innerHTML = "";
}
  