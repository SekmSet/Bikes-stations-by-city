class Slider {

    images =  [
        "Public/img/1-home.png",
        "Public/img/2-map.png",
        "Public/img/3-form.png",
        "Public/img/4-signature.png"
    ];

    current = 0;

    constructor(img_slider, etape) {
        this.img_slider = document.getElementById(img_slider)
        this.etape = document.getElementById(etape)
        this.autoSlider()
        this.handleClick()
    }

    slide (sens) {
        this.current = this.current + sens;

        if (this.current < 0) {
            this.current = this.images.length - 1;
        }
        if (this.current > this.images.length - 1) {
            this.current = 0;
        }

        switch (this.current) {
            case 0:
                this.etape.textContent = "Je renseigne mon prénom, mon nom et la ville"
                break;
            case 1:
                this.etape.textContent = "Je sélectionne une station"
                break;
            case 2:
                this.etape.textContent = "Je renseigne le jour, l'heure de la réservation et le type de vélo"
                break;
            case 3:
                this.etape.textContent = "Je signe pour valider ma réservation"
                break;
        }
       this.img_slider.src = this.images[this.current];
    }

    rightSlider () {
        this.slide(+1)
    }

    leftSlider () {
       this.slide(-1)
    }

    autoSlider () {
        setInterval(() => {
           this.slide(+1)
        }, 5000)
    }

    handleClick() {
        const arrowLeft = document.getElementById("arrowLeft")
        const arrowRight = document.getElementById("arrowRight")
        const valideSlider = document.getElementById("valideSlider")

        arrowLeft.addEventListener('click', () => {
            slide.leftSlider()
        })

        arrowRight.addEventListener('click', () => {
            slide.rightSlider()
        })

        valideSlider.addEventListener('click', () => {
            Utils.changeDisplay(slider, "none")
        })
    }
}