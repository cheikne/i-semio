document.getElementById("semio_hematologique").style.backgroundColor  = ' #0099a2';
document.getElementById("semio_hematologique").style.color  = 'black';

function calculTotalItemsClicked(idCheckbox , idTotalItems){
    var checkBox = document.getElementById(idCheckbox);
    var totalAppris = document.getElementById(idTotalItems);
    if (checkBox.checked == true){
        totalAppris.innerHTML = parseInt(totalAppris.innerHTML,10) + 1;
    }else{
        totalAppris.innerHTML = parseInt(totalAppris.innerHTML,10) - 1;
    }
}

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
        url: '/semio_hematologique',
        data: {
          'mydata': JSON.stringify(all)
        },
        success: function(response) {
        //    $('#footer-newsletter-address').prop('disabled', true);
        //    $('#footer-newsletter-address-button').prop('disabled', true);
        //    $('#footer-newsletter-address-button').text('Abonné!');*
            alert("Coucou : tous s'est bien passé !");
        },
        error: function(xhr, status, error) {
            // $('#footer-newsletter-address-button').text('Reéssayer!');
            alert("Ooopsss : Quelque chose ne va pas !");
        }
      });
}