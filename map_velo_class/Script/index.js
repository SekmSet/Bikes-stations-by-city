const buttonValider = document.getElementById('buttonValider')

const buttonQuitter = document.getElementById('buttonQuitter')
const reserverVelo = document.getElementById('reserver')

const valideSlider = document.getElementById("valideSlider")
const arrowLeft = document.getElementById("arrowLeft")
const arrowRight = document.getElementById("arrowRight")

const slider = document.getElementById("slider")
// const img_slider = document.getElementById("img_slider");
// const etape = document.getElementById('etape')

// CONTAINER 1

const storage = new Storage()
const map = new Map(storage)
const canvas = new Canvas("canvas", storage)
const page1 = new Page1(map, storage)
const page2 = new Page2(storage, canvas, map)
const slide = new Slider("img_slider", "etape")


buttonValider.addEventListener('click', async () => {
    const nom = document.getElementById('nom')
    const prenom = document.getElementById('prenom')
    const ville = document.getElementById('ville')

    storage.initStorages(nom.value, prenom.value, ville.value);
    await page1.validateForm(nom, prenom, ville, 'error', 'fullName',"content_1", "content_2");
})

// CONTAINER 2

buttonQuitter.addEventListener('click', () => {
    page2.quitter('content_1', 'content_2')
})

closeCard.addEventListener('click',  () => {
    page2.closeCard('card')
})

reserverVelo.addEventListener('click',  () => {
    const jourResa = document.getElementById('jourResa')
    const heureResa = document.getElementById('heureResa')

    page2.reserverVelo(jourResa, heureResa, 'card')
})

// SLIDER

arrowLeft.addEventListener('click', () => {
    slide.leftSlider()
})

arrowRight.addEventListener('click', () => {
    slide.rightSlider()
})

valideSlider.addEventListener('click', () => {
    Page1.changeDisplay(slider, "none")
})

valideSignature.addEventListener('click', () => {
    canvas.valideSignature(signature)
})