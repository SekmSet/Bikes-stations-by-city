const valideSlider = document.getElementById('valideSlider')
const arrowLeft = document.getElementById('arrowLeft')
const arrowRight = document.getElementById('arrowRight')
const slider = document.getElementById('slider')
const etape = document.getElementById('etape')

const images =  [
    "../Public/img/1-home.png",
    "../Public/img/2-map.png",
    "../Public/img/3-form.png",
    "../Public/img/4-signature.png"
];

let current = 0;

setInterval(() => {
    slide(+1)
}, 5000)

arrowLeft.addEventListener('click', () => {
    slide(-1)
})

arrowRight.addEventListener('click', () => {
    slide(+1)
})

function slide (sens) {
    current = current + sens;

    if (current < 0) {
        current = images.length - 1;
    }
    if (current > images.length - 1) {
        current = 0;
    }

    switch (current) {
        case 0:
            etape.textContent = "Je renseigne mon prénom, mon nom et la ville"
            break;
        case 1:
            etape.textContent = "Je sélectionne une station"
            break;
        case 2:
            etape.textContent = "Je renseigne le jour, l'heure de la réservation et le type de vélo"
            break;
        case 3:
            etape.textContent = "Je signe pour valider ma réservation"
            break;
    }
    document.getElementById("img_slider").src = images[current];
}

valideSlider.addEventListener('click', () => {
    slider.style.display="none"
})