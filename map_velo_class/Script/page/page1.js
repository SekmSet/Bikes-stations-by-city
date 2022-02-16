class Page1 {
    constructor(map, storage) {
        this.map = map;
        this.storage = storage;

        this.handleClick()
    }

    async validateForm (elemNom, elemPrenom, elemVille, errorId, elementId, content_1_id, content_2_id) {
        const error = document.getElementById(errorId)

        const nom = elemNom.value;
        const prenom = elemPrenom.value;
        const ville = elemVille.value;

        if(nom === "" || prenom === "" || ville === "") {
            Utils.setTextContent(error,  "La recherche n'a pas pu aboutir. Merci de réessayer.")
            return
        }

        this.storage.update("prenom", prenom)
        this.storage.update("nom", nom)
        this.storage.update("ville", ville)

        const isOk = await this.map.getSationsByContracts()

        if(!isOk) {
            Utils.setTextContent(error,  "La recherche n'a pas pu aboutir. Merci de réessayer.")
            return
        }

        const element = document.getElementById(elementId)
        const content_1 = document.getElementById(content_1_id)
        const content_2 = document.getElementById(content_2_id)

        Utils.setTextContent(element,  `Bonjour ${nom} ${prenom} ! Tu recherches une station vélo à ${ville}`)

        Utils.clearInput(elemNom);
        Utils.clearInput(elemPrenom);
        Utils.clearInput(elemVille);
        Utils.clearInput(error);

        Utils.changeDisplay(content_1, "none")
        Utils.changeDisplay(content_2, "block")
    }

    handleClick() {
        const buttonValider = document.getElementById('buttonValider')
        buttonValider.addEventListener('click', async () => {
            const nom = document.getElementById('nom')
            const prenom = document.getElementById('prenom')
            const ville = document.getElementById('ville')

            this.storage.initStorages(nom.value, prenom.value, ville.value);
            await this.validateForm(nom, prenom, ville, 'error', 'fullName',"content_1", "content_2");
        })
    }
}