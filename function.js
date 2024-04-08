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

document.addEventListener('DOMContentLoaded', function () {
    let panel = document.getElementById('panel');

    panel.addEventListener('click', function (event) {
        console.log(event.target, 'toto')

    });

});

let villeInput = 'Londres';

function showDate() {
    let date = new Date()
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    if (h < 10) { h = '0' + h; }
    if (m < 10) { m = '0' + m; }
    if (s < 10) { s = '0' + s; }
    let time = h + ':' + m //+ ':' + s
    heureOutPut.innerHTML = time;
    return time;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (search.value.length == 0) {
        alert('Ajoutez une ville dans la barre de recherche');
    } else {
        villeInput = search.value;
        const nouvelleVille = search.value;
        let villeStockees = JSON.parse(window.localStorage.getItem("ville")) || []; // Récupérer les villes déjà stockées
        villeStockees.push(nouvelleVille); // Ajouter la nouvelle ville à la liste
        window.localStorage.setItem("ville", JSON.stringify(villeStockees)); // Enregistrer la liste mise à jour dans le localStorage
        addCity(nouvelleVille);
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

function afficherMeteo() {
    let data = weatherData;
    temperature.innerHTML = `${Math.floor(data.main.temp)} °C`;
    if (icone !== null) {
        icone.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

    if (cloudOutPut) {
        cloudOutPut.innerHTML = data.clouds.all + "%";
    } else {
        console.error("L'élément cloudOutPut est null");
    }

    if (humidityOutPut) {
        humidityOutPut.innerHTML = data.main.humidity + "%";
    } else {
        console.error("L'élément humidityOutPut est null");
    }

    if (windOutPut) {
        windOutPut.innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h";
    } else {
        console.error("L'élément windOutPut est null");
    }

    const code = data.weather[0].id;
    let heureDuJour = "jour";

    if (code == 800) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/clear.jpg)`;

    } else if (code >= 200 && code < 300) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/storm.jpg)`;

    } else if (code >= 300 && code < 600) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/rain.jpg)`;

    } else if (code >= 600 && code < 700) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/snow.jpg)`;

    } else if (code >= 700 && code < 800) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/mist.jpg)`;

    } else if (code >= 801 && code <= 804) {
        app.style.backgroundImage = `url(./images/${heureDuJour}/cloudy.jpg)`;
    }

    app.style.opacity = "1";
}

function showDate() {
    let now = new Date();
    let data = weatherData;
    conditionOutPut.innerHTML = data.weather[0].description;

    dateOutPut.innerHTML = `${jourDeLaSemaine(now.getDay(), now.getMonth() + 1, now.getFullYear())} ${now.getDate()} ${getMonthName(now.getMonth())} ${now.getFullYear()}`;
    heureOutPut.innerHTML = `${now.getHours()} : ${now.getMinutes()} : ${now.getSeconds()}`;
    nomVilleOutPut.innerHTML = data.name;
}

setInterval(() => {
    showDate();
}, 1000);

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
            console.log(data);
            temperature.innerHTML = `${Math.floor(data.main.temp)} °C`;
            conditionOutPut.innerHTML = data.weather[0].description;
            let date = new Date(data.dt * 1000);
            let a = date.getFullYear();
            let m = date.getMonth() + 1;
            let j = date.getDate();
            let heure = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

            dateOutPut.innerHTML = `${jourDeLaSemaine(j, m + 1, a)} ${j} ${getMonthName(m)} ${a}`;
            heureOutPut.innerHTML = heure;
            nomVilleOutPut.innerHTML = data.name;
            if (icone !== null) {
                icone.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }

            if (cloudOutPut) {
                cloudOutPut.innerHTML = data.clouds.all + "%";
            } else {
                console.error("L'élément cloudOutPut est null");
            }

            if (humidityOutPut) {
                humidityOutPut.innerHTML = data.main.humidity + "%";
            } else {
                console.error("L'élément humidityOutPut est null");
            }

            if (windOutPut) {
                windOutPut.innerHTML = (data.wind.speed * 3.6).toFixed(2) + " km/h";
            } else {
                console.error("L'élément windOutPut est null");
            }

            const code = data.weather[0].id;
            let heureDuJour = "jour";

            if (code == 800) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/clear.jpg)`;

            } else if (code >= 200 && code < 300) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/storm.jpg)`;

            } else if (code >= 300 && code < 600) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/rain.jpg)`;

            } else if (code >= 600 && code < 700) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/snow.jpg)`;

            } else if (code >= 700 && code < 800) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/mist.jpg)`;

            } else if (code >= 801 && code <= 804) {
                app.style.backgroundImage = `url(./images/${heureDuJour}/cloudy.jpg)`;
            }

            app.style.opacity = "1";
        })
    setInterval(showDate, 1000);
}
fetchDonneesMeteoByCoords(latitude, longitude);
app.style.opacity = "1";

const btnLocation = document.querySelector('.btn-location');
if (btnLocation) {
    btnLocation.addEventListener('click', getPosition);
}

//fin de fonction pour localiser position

function addCity(cityName) {
    console.log("Ajout de la ville :", cityName);
    const cityList = document.getElementById('cityList');
    const cityElement = document.createElement('li');

    cityElement.innerHTML = cityName
    cityElement.classList.add('ville');
    // cityElement.textContent = cityName;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteCity(cityName));

    cityElement.appendChild(deleteBtn);
    cityList.appendChild(cityElement);
}

// Fonction pour supprimer une ville
function deleteCity(cityName) {
    const cityList = document.getElementById('cityList');
    const cityElement = cityList.querySelector(`li.ville:contains(${cityName})`);
    cityElement.removeItem();

    // Mettre à jour le stockage local en retirant la ville
    const cities = JSON.parse(window.localStorage.getItem('ville')) || [];
    const updatedCities = cities.filter(city => city !== cityName);
    window.localStorage.setItem('ville', JSON.stringify(updatedCities));
}

// Associer le bouton "Ajouter" à la fonction pour ajouter une ville
const addCityBtn = document.getElementById('addCityBtn');
addCityBtn.addEventListener('click', () => {
    const addCityInput = document.getElementById('addCityInput');
    const cityName = addCityInput.value.trim();
    if (cityName !== '') {
        addCity(cityName);
        addCityInput.value = ''; // Effacer le champ de saisie après l'ajout
    }
});

// Charger les villes sauvegardées dans le stockage local au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    const cities = JSON.parse(window.localStorage.getItem('ville')) || [];
    console.log("Ville récupérées depuis le stockage local :", cities);
    cities.forEach(city => addCity(city));
});


