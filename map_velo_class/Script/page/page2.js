class Page2 {
    constructor(storage, canvas, map) {
        this.storage = storage;
        this.canvas = canvas;
        this.map = map

        this.handleClick()
    }

    quitter (content_1_id, content_2_id) {
        this.storage.clear();

        const content_1 = document.getElementById(content_1_id)
        const content_2 = document.getElementById(content_2_id)

        Utils.changeDisplay(content_1, "flex");
        Utils.changeDisplay(content_2, "none");
    }

    closeCard (card_id) {
        const marker = this.storage.get("markerNumero")
        const card = document.getElementById(card_id)

        this.map.clearAnimationMarkers()
        this.map.zoom(this.map.markers[marker], 13)
        Utils.changeDisplay(card, "none");
    }

    reserverVelo (jourResa, heureResa, card_id ) {
        const marker = this.storage.get("markerNumero")
        const card = document.getElementById(card_id)

        const veloType = document.querySelector('input[name="velo"]:checked').value;

        if(!jourResa.value || !heureResa.value || !veloType) {
            return
        }

        this.storage.update("maReservation", JSON.stringify({
            ville: this.storage.get("ville"),
            station: this.storage.get("selectStation"),
            jour: jourResa.value,
            heure: heureResa.value,
            velo: veloType
        }))

        Utils.changeDisplay(card,"none")

        this.canvas.initCanvas()

        this.map.zoom(this.map.markers[marker], 13)
    }

    handleClick() {
        const buttonQuitter = document.getElementById('buttonQuitter')
        const closeCard = document.getElementById('closeCard')
        const reserverVelo = document.getElementById('reserver')

        buttonQuitter.addEventListener('click', () => {
            this.quitter('content_1', 'content_2')
        })

        closeCard.addEventListener('click',  () => {
            this.closeCard('card')
        })

        reserverVelo.addEventListener('click',  () => {
            const jourResa = document.getElementById('jourResa')
            const heureResa = document.getElementById('heureResa')

            this.reserverVelo(jourResa, heureResa, 'card')
        })
    }
}