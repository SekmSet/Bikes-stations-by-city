class Storage {
    constructor() {

    }

    initStorages(nom, prenom, ville) {
        localStorage.setItem('nom', nom);
        localStorage.setItem('prenom', prenom);
        localStorage.setItem('ville', ville);
        localStorage.setItem('selectStation', "");
        localStorage.setItem('maReservation', "");
        localStorage.setItem('markerNumero', "");
        localStorage.setItem('signature', "");
    }

    update (key, value) {
        localStorage.setItem(key, value);
    }

    get (key) {
        return localStorage.getItem(key)
    }

    clear () {
        localStorage.clear();
    }
}