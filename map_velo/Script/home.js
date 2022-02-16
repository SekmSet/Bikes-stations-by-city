const keyApi = "36ff5bac8b7d69f48c2c981584e08d5c3693911f"
const defaultZoom = 13
const customZoom = 19

// INPUT
const nom = document.getElementById('nom')
const prenom = document.getElementById('prenom')
const ville = document.getElementById('ville')
const jourResa = document.getElementById('jourResa')
const heureResa = document.getElementById('heureResa')

// SPAN
const fullName = document.getElementById('fullName')
const error = document.getElementById('error')

// BUTTON
const buttonValider = document.getElementById('buttonValider')
const buttonQuitter = document.getElementById('buttonQuitter')
const reserverVelo = document.getElementById('reserver')
const closeCard = document.getElementById('closeCard')

// DIV
const content_1 = document.getElementById('content_1')
const content_2 = document.getElementById('content_2')

const card = document.getElementById('card')

const stationName = document.getElementById('stationName')
const stationAdress = document.getElementById('stationAdress')
const stationStatus = document.getElementById('stationStatus')
const stationBikes = document.getElementById('stationBikes')
const stationStands = document.getElementById('stationStands')
const stationElectricalBikes = document.getElementById('stationElectricalBikes')
const stationMechanicalBikes = document.getElementById('stationMechanicalBikes')

// GOOGLE MAP
let markers = [];
let map;

function clearAnimationMarkers() {
    markers.forEach(marker => marker.setAnimation(null))
}

function setStorage(prenom, nom, ville) {
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('ville', ville);
    localStorage.setItem('selectStation', "");
    localStorage.setItem('maReservation', "");
    localStorage.setItem('markerNumero', "");
    localStorage.setItem('signature', "");
}

function clearInput() {
    nom.value = ""
    prenom.value = ""
    ville.value = ""
    error.textContent = ""
}

buttonValider.addEventListener('click', async function () {
    if(nom.value === "" || prenom.value === "" || ville.value === "") {
        error.textContent = "La recherche n'a pas pu aboutir. Merci de réessayer."
        return
    }
    setStorage(prenom.value, nom.value, ville.value);

    const isOk = await getSationsByContracts()

    if(!isOk) {
        error.textContent = "La recherche n'a pas pu aboutir. Merci de réessayer."
        return
    }

    fullName.textContent = `Bonjour ${nom.value} ${prenom.value} ! Tu recherches une satation vélo à ${ville.value}`
    clearInput();

    content_1.style.display="none";
    content_2.style.display="block";
})

buttonQuitter.addEventListener('click', function() {
    localStorage.clear();

    content_1.style.display="flex";
    content_2.style.display="none";
})

closeCard.addEventListener('click', function () {
    clearAnimationMarkers()
    
    const marker = localStorage.getItem("markerNumero")
    map.setZoom(defaultZoom);
    map.panTo(markers[marker].position);

    card.style.display = "none"
})

reserverVelo.addEventListener('click', function () {
    const veloType = document.querySelector('input[name="velo"]:checked').value;
    const marker = localStorage.getItem("markerNumero")

    if(!jourResa.value || !heureResa.value || !veloType) {
        return
    }

    localStorage.setItem("maReservation", JSON.stringify({
        ville: localStorage.getItem("ville"),
        station: localStorage.getItem("selectStation"),
        jour: jourResa.value,
        heure: heureResa.value,
        velo: veloType
    }))

    card.style.display="none";
    initCanvas()

    map.setZoom(defaultZoom);
    map.panTo(markers[marker].position);
})

const getPositionsAndDrop = (result) => {
    initMap({
        latitude : result[1]?.position?.latitude,
        longitude: result[1]?.position?.longitude,
    })

    for(let i= 0; i < result.length; i++) {
        drop({
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
            id: i
        })
    }
}

const getSationsByContracts = async () => {
    const ville = localStorage.getItem('ville');

    const url = `https://api.jcdecaux.com/vls/v3/stations?contract=${ville}&apiKey=${keyApi}`;
    const result = await fetch(url);

    if(result.ok === false) {
        return false
    }

    const resultJson = await result.json()
    getPositionsAndDrop(resultJson)

    return true;
}

function initMap ({latitude, longitude}) {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: defaultZoom,
        center: { lat: latitude, lng: longitude },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
}

function drop ({
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
   id
}) {
    const marker = new google.maps.Marker({
        position: positions,
        map,
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

        clearAnimationMarkers()
        map.panTo(marker.position);
        map.setZoom(customZoom);
        marker.setAnimation(google.maps.Animation.BOUNCE);


        card.style.display = "block"
        localStorage.setItem("selectStation", marker.data.numero)

        stationName.textContent = `${marker.data.name}`
        stationAdress.textContent = marker.data.address || "NR"
        stationStatus.textContent = marker.data.status,
        stationBikes.innerHTML = `<span class="strong">Nombre de vélo : </span>${marker.data.bikes}`,
        stationStands.innerHTML = `<span class="strong">Nombre de stands : </span> ${marker.data.stands}`,
        stationElectricalBikes.innerHTML = `<span class="strong">Nombre de vélo éléctrique : </span>${marker.data.electricalBikes}`,
        stationMechanicalBikes.innerHTML = `<span class="strong">Nombre de vélo classique : </span> ${marker.data.mechanicalBikes}`
        document.querySelector(".stationNum").innerHTML = `${marker.data.numero}`
        localStorage.setItem("markerNumero", id)
    });

    markers.push(marker)
}
