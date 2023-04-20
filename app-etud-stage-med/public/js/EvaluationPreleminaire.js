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