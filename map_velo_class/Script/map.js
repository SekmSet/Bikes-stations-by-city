class Map {
    keyApi = "36ff5bac8b7d69f48c2c981584e08d5c3693911f"
    markers = [];
    map = null;
    defaultZoom = 13

    constructor(storage) {
        this.storage = storage;
    }

    initMap ({latitude, longitude}) {
        this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: this.defaultZoom,
            center: { lat: latitude, lng: longitude },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }

    addMarker() {

    }

    drop ({
       positions,
       title,
       name,
       address,
       status,
       bikes,
       stands,
       electricalBikes,
       mechanicalBikes,
       numero,
       id,
       cardElem
   }) {
        const marker = new google.maps.Marker({
            position: positions,
            map : this.map,
            animation: google.maps.Animation.DROP,
            title: title,
            data: {
                numero,
                name,
                address,
                status,
                bikes,
                stands,
                electricalBikes,
                mechanicalBikes,
            }
        })

        marker.addListener("click", () => {
            this.clearAnimationMarkers()
            this.zoom(marker, 19)
            this.addAnimation(marker)

            Utils.changeDisplay(cardElem, "block")
            this.storage.update('selectStation', marker.data.numero)

            const stationName = document.getElementById('stationName')
            const stationAdress = document.getElementById('stationAdress')
            const stationStatus = document.getElementById('stationStatus')
            const stationBikes = document.getElementById('stationBikes')
            const stationStands = document.getElementById('stationStands')
            const stationElectricalBikes = document.getElementById('stationElectricalBikes')
            const stationMechanicalBikes = document.getElementById('stationMechanicalBikes')

            Utils.setTextContent(stationName, `${marker.data.name}`)
            Utils.setTextContent(stationAdress, `${marker.data.address}`)
            Utils.setTextContent(stationStatus, `${marker.data.status}`)
            Utils.setInnerHtml(stationBikes, `<span class="strong">Nombre de vélo : </span>${marker.data.bikes}`)
            Utils.setInnerHtml(stationStands, `<span class="strong">Nombre de stands : </span> ${marker.data.stands}`)
            Utils.setInnerHtml(stationElectricalBikes, `<span class="strong">Nombre de vélo éléctrique : </span>${marker.data.electricalBikes}`)
            Utils.setInnerHtml(stationMechanicalBikes, `<span class="strong">Nombre de vélo classique : </span> ${marker.data.mechanicalBikes}`)
            Utils.setInnerHtml(document.querySelector(".stationNum"), `${marker.data.numero}`)

            console.log(marker.data.mechanicalBikes, marker.data.electricalBikes)
            this.storage.update('markerNumero', id)
        });

        this.markers.push(marker)
    }

   getPositionsAndDrop = (result) => {
        this.initMap({
            latitude : result[1]?.position?.latitude,
            longitude: result[1]?.position?.longitude,
        })

        for(let i= 0; i < result.length; i++) {
            this.drop({
                positions: {
                    lat: result[i]?.position.latitude,
                    lng: result[i]?.position.longitude
                },
                title: result[i]?.name,
                name : result[i]?.name,
                numero : result[i]?.number,
                address: result[i]?.address,
                status: result[i]?.status,
                bikes: result[i]?.totalStands.availabilities.bikes,
                stands: result[i]?.totalStands.availabilities.stands,
                mechanicalBikes: result[i]?.totalStands.availabilities.mechanicalBikes,
                electricalBikes: result[i]?.totalStands.availabilities.electricalBikes,
                id: i,
                cardElem: document.getElementById('card')
            })
        }
    }

    getSationsByContracts = async () => {
        const ville = this.storage.get('ville')

        const url = `https://api.jcdecaux.com/vls/v3/stations?contract=${ville}&apiKey=${this.keyApi}`;
        const result = await fetch(url);

        if(result.ok === false) {
            return false
        }

        const resultJson = await result.json()
        this.getPositionsAndDrop(resultJson)

        return true;
    }

   zoom(marker, value) {
        this.map.panTo(marker.position);
        this.map.setZoom(value);
   }

    addAnimation(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    clearAnimationMarkers() {
        this.markers.forEach(marker => marker.setAnimation(null))
    }
}