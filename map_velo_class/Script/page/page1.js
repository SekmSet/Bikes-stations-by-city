class Page1 {
    constructor(map, storage) {
        this.map = map;
        this.storage = storage;
    }

    async validateForm (elemNom, elemPrenom, elemVille, errorId, elementId, content_1_id, content_2_id) {
        const error = document.getElementById(errorId)

        const nom = elemNom.value;
        const prenom = elemPrenom.value;
        const ville = elemVille.value;

        if(nom === "" || prenom === "" || ville === "") {
            Page1.setTextContent(error,  "La recherche n'a pas pu aboutir. Merci de réessayer.")
            return
        }

        this.storage.update("prenom", prenom)
        this.storage.update("nom", nom)
        this.storage.update("ville", ville)

        const isOk = await this.map.getSationsByContracts()

        if(!isOk) {
            Page1.setTextContent(error,  "La recherche n'a pas pu aboutir. Merci de réessayer.")
            return
        }

        const element = document.getElementById(elementId)
        const content_1 = document.getElementById(content_1_id)
        const content_2 = document.getElementById(content_2_id)

        Page1.setTextContent(element,  `Bonjour ${nom} ${prenom} ! Tu recherches une station vélo à ${ville}`)

        Page1.clearInput(elemNom);
        Page1.clearInput(elemPrenom);
        Page1.clearInput(elemVille);
        Page1.clearInput(error);

        Page1.changeDisplay(content_1, "none")
        Page1.changeDisplay(content_2, "block")
    }

    static clearInput(input) {
        input.value = ""
    }

    static setTextContent (element, text) {
        element.textContent = text
    }

    static setInnerHtml (element, text) {
        console.log(text, element)
        element.innerHTML = text
    }

    static changeDisplay(element, display) {
        element.style.display = display;
    }
}