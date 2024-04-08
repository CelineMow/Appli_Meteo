const app = document.querySelector('.application-meteo');
const temperature = document.querySelector('.temperature');
const dateOutPut = document.querySelector('.date');
const heureOutPut = document.querySelector('.heure');
const conditionOutPut = document.querySelector('.condition');
const nomVilleOutPut = document.querySelector('.nomVille');
const icone = document.querySelector('.icone');
const cloudOutPut = document.querySelector('.nuage');
const humidityOutPut = document.querySelector('.humidite');
const windOutPut = document.querySelector('.vent');
const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const ville = document.querySelectorAll('.ville');

let latitude = 0;
let longitude = 0;
let weatherData;

let villeInput = 'Londres';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Ajoutez une ville dans la barre de recherche');
    } else {
        villeInput = search.value;
        const nouvelleVille = search.value;
        fetchDonneesMeteo();
        search.value = "";
        app.style.opacity = "0";

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=015b55e1c669b4fcb83d93a285b92ab1&units=metric`)
            .then(response => response.json())
            .then(data => {
                let offset = data.gmtOffset;
                let localTime = new Date(new Date().getTime() + offset * 1000);
                let heure = localTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                heureOutPut.innerHTML = heure;
            })
            .catch(error => {
                console.error('Erreur lors de la récupération du fuseau horaire :', error);
            });
    }
});


function fetchDonneesMeteo() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeInput}&appid=015b55e1c669b4fcb83d93a285b92ab1&units=metric`)

        .then(response => response.json())
        .then(data => {
            weatherData = data;
            afficherMeteo();
        });
}

fetchDonneesMeteo();
app.style.opacity = "1";

// Fonction pour localiser position

function getPosition() {
    console.log("Bouton de localisation cliqué.");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

function showPosition(position) {
    console.log("Position récupérée avec succès :", position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // Utiliser les coordonnées pour récupérer les données météorologiques
    fetchDonneesMeteoByCoords(latitude, longitude);
}

function fetchDonneesMeteoByCoords(latitude, longitude) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=015b55e1c669b4fcb83d93a285b92ab1&units=metric`)

        .then(response => response.json())
        .then(data => {
            weatherData = data;
            afficherMeteoByCoords();
        });
}

fetchDonneesMeteoByCoords(latitude, longitude);
app.style.opacity = "1";

const btnLocation = document.querySelector('.btn-location');
if (btnLocation) {
    btnLocation.addEventListener('click', getPosition);
}

//fin de fonction pour localiser position



