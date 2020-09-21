let paletaCores = document.getElementById('div#paletaCores')
let outputRed = document.querySelector('input#textRed')
let outputGreen = document.querySelector('input#textGreen')
let outputBlue = document.querySelector('input#textBlue')
let sliderRed = document.querySelector('input#red')
let sliderGreen = document.querySelector('input#green')
let sliderBlue = document.querySelector('input#blue')

sliderRed.oninput = function () {
    outputRed.value = this.value
}

sliderGreen.oninput = function () {
    outputGreen.value = this.value
}

sliderBlue.oninput = function () {
    outputBlue.value = this.value
}

function mudarPaleta() {
    let red = document.querySelector('input.red').value;
    let green = document.querySelector('input.green').value;
    let blue = document.querySelector('input.blue').value;
    let paleta = document.querySelector('div.paletaCores');
    let cor = `rgb(${red}, ${green}, ${blue})`;

    paleta.style.backgroundColor = cor;
}

sliderRed.addEventListener('input', mudarPaleta);
sliderGreen.addEventListener('input', mudarPaleta);
sliderBlue.addEventListener('input', mudarPaleta);




