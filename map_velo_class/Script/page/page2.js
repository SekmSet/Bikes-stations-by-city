class Page2 {
    constructor(storage, canvas, map) {
        this.storage = storage;
        this.canvas = canvas;
        this.map = map
    }

    quitter (content_1_id, content_2_id) {
        this.storage.clear();

        const content_1 = document.getElementById(content_1_id)
        const content_2 = document.getElementById(content_2_id)

        Page1.changeDisplay(content_1, "flex");
        Page1.changeDisplay(content_2, "none");
    }

    closeCard (card_id) {
        const marker = this.storage.get("markerNumero")
        const card = document.getElementById(card_id)

        this.map.clearAnimationMarkers()
        this.map.zoom(this.map.markers[marker], 13)
        Page1.changeDisplay(card, "none");
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

        Page1.changeDisplay(card,"none")

        this.canvas.initCanvas()

        this.map.zoom(this.map.markers[marker], 13)
    }
}