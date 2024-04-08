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
let listeVille = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Ajoutez une ville dans la barre de recherche');
    } else {
        villeInput = search.value;
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
    };
});

function fetchDonneesMeteo() {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeInput}&appid=015b55e1c669b4fcb83d93a285b92ab1&units=metric`)

        .then(response => response.json())
        .then(data => {
            weatherData = data;
            afficherMeteo();
            const villeExistante = listeVille.includes(villeInput);
            if (!villeExistante) {
                // Ajouter la nouvelle ville à la liste et mettre à jour le local storage
                listeVille.push(villeInput);
                localStorage.setItem('ville', JSON.stringify(listeVille));
                afficherVilles();
            };
        });
};

fetchDonneesMeteo();
app.style.opacity = "1";

window.addEventListener('load', () => {
    let villesStockees = localStorage.getItem('ville');
    if (villesStockees) {
        listeVille = JSON.parse(villesStockees);
    } else {
        listeVille = [];
    }
    afficherVilles();
});

function afficherVilles() {
    const listeVillesElement = document.querySelector('.ville');
    listeVillesElement.innerHTML = '';
    listeVille.forEach(ville => {
        const villeNomCapitalized = ville.charAt(0).toUpperCase() + ville.slice(1);
        const villeElement = document.createElement('li');
        villeElement.textContent = villeNomCapitalized; // Utiliser villeNomCapitalized au lieu de ville
        villeElement.addEventListener('click', () => {
            // Appeler la fonction pour afficher les données météorologiques pour cette ville
            villeInput = ville;
            fetchDonneesMeteo();
        });
        boutonSuppression(villeElement, ville);

        listeVillesElement.appendChild(villeElement);
    });
}

function boutonSuppression(villeElement, villeASupprimer) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Empêcher la propagation de l'événement de clic à l'élément de la ville
        const index = listeVille.indexOf(villeASupprimer);
        if (index !== -1) {
            listeVille.splice(index, 1);
            localStorage.setItem('ville', JSON.stringify(listeVille));
            // Mettre à jour la liste des villes affichées sur la page
            afficherVilles();
        }
    });
    villeElement.appendChild(deleteButton); // Ajouter le bouton de suppression à l'élément de la ville
}

addEventListener('keypress', function (event) {
    if (event.key === "Enter") {
    }
})

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



