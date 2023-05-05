var filtre_global ="";
let competences = 
{
  "libelle": "",
  "dateEvaluation": "",
  "sousCompetences":[
      {
          "id":"",
          "libele":"",
          "items":{
              "appris":false,
              "vu_faire":false,
              "fait":false,
              "acquis":false,
              "lieu":"",
              "remarque":"",
              "difficulte":""
          }
      }
  ]
};
var script = document.currentScript;
var id_competence = script.getAttribute('id_competence');
if (document.getElementById(id_competence)) {
  document.getElementById(id_competence).style.backgroundColor  = ' #0099a2';
  document.getElementById(id_competence).style.color  = 'black';
}
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
function chercherByItemsMobile(){
  var input, filter, grille_mobile, span, div, i, txtValue;
  input = document.getElementById("input_bar_recherche_by_items");
  filter = input.value.toUpperCase();
  grille_mobile = document.getElementById("device_mobile");
  div = document.querySelectorAll(".filter_grille_mobile");
  for (i = 0; i < div.length; i++) {
    span = div[i].getElementsByTagName("span")[0];
    if (span) {
      txtValue = span.textContent || span.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        div[i].style.display = "";
      } else {
        div[i].style.display = "none";
      }
    }       
  }
}
function detectDevice() {
  const userAgent = navigator.userAgent.toLowerCase();
  const is_mobile = /iphone|ipod|ipad|android/.test(userAgent);
  return is_mobile ? 'mobile' : 'desktop';
}
  
  const device_type = detectDevice();
  if (device_type === 'mobile') {
    if(document.getElementById("device_mobile")){
      document.getElementById("device_mobile").style.display = "block";
      document.getElementById("device_desktop").innerHTML = "";
      document.getElementById("sidebarMenu").innerHTML="";
      filtre_global = "device_mobile";
    }
    if(document.querySelector(".progress")){
      var all_progress_bar = document.querySelectorAll(".progress");
      for(var i =0; i< all_progress_bar.length; i++)
        all_progress_bar[i].style.width = "100%";
    }
    document.getElementById("logo_uca").style.width = "60px";
    document.getElementById("ufr_medecine_text").style.display = "none";
  } else if(document.getElementById("device_desktop")) {
    document.getElementById("device_desktop").style.display = "block";
    document.getElementById("device_mobile").innerHTML = "";
    filtre_global = "device_desktop";
    // document.getElementById("side_bar_mobile").innerHTML = "";
    
}


// function ajusterTailleEcran(){
//   var nav_bar = document.getElementById("nav_bar");
//   var side_bar = document.getElementById("sidebarMenu");
//   var distance = parseInt(side_bar.offsetTop - (nav_bar.offsetTop + nav_bar.offsetHeight),10);
//   if(distance >= 0){
//     side_bar.style.marginTop = "48px";
//   }
//   else{
//     side_bar.style.marginTop = device_type == 'mobile' ? parseInt(-distance,10)+"px" : parseInt(48-distance,10);
//   }
// }

$(document).ready(function(){
	$(window).scroll(function () {
			if ($(this).scrollTop() > 50) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		$('#back-to-top').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 400);
			return false;
		});
});

$(function() {

  "use strict"; 
  
  //Loader    
  
  $(function preloaderLoad() {
  
  if($('.preloader').length){
    $('.preloader').delay(200).fadeOut(300);
  
  }
  
  $(".preloader_disabler").on('click', function() {
    $("#preloader").hide();
  
  });
  
  });

});

//Barre de recherche sur la nav bar pour faire une recherche globale
// $(document).ready(function(){
//   $("#search_input_global").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#"+filtre_global+"*").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });
function searchInputGlobal(search_input,id_displayer,semios){
  let data_filtered = filterJSON(document.getElementById(search_input).value,semios);
  for (let key in data_filtered) {
    const element = data_filtered[key];
    const element_li = document.createElement('li');
    element_li.classList.add('ist-group-item');
    element_li.textContent = data_filtered[key];
    document.getElementById(id_displayer).appendChild(element_li);
  }
}
function filterJSON(text, jsonData) {
  let filteredData = [];
  for (let key in jsonData) {
    if (jsonData[key].toLowerCase().indexOf(text.toLowerCase()) !== -1) {
      filteredData.push(jsonData[key]);
      break;
    }
  }
  for(let key in filteredData){
    const el = filteredData[key];
    console.log(el);
  }
  return filteredData;
}
