function jourDeLaSemaine(jour, mois, annee) {
    const jourSemaine = [
        "Dimanche",
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi"
    ];
    return jourSemaine[new Date(`${annee}-${mois}-${jour}`).getDay()];
}

function getMonthName(monthNumber) {
    const months = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    return months[monthNumber];
}

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
}

function fetchDonneesMeteo() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${villeInput}&appid=015b55e1c669b4fcb83d93a285b92ab1&units=metric`)

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
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // Utiliser les coordonnées pour récupérer les données météorologiques
    fetchDonneesMeteoByCoords(latitude, longitude);
}

function showError(error) {
    console.error("Erreur lors de la récupération de la position :", error);
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("L'utilisateur a refusé la demande de géolocalisation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("L'emplacement de l'utilisateur n'est pas disponible.");
            break;
        case error.TIMEOUT:
            alert("La demande de géolocalisation de l'utilisateur a expiré.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Une erreur inconnue s'est produite lors de la récupération de la géolocalisation.");
            break;
    }
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
fetchDonneesMeteoByCoords();
app.style.opacity = "1";

const btnLocation = document.querySelector('.btn-location');
if (btnLocation) {
    btnLocation.addEventListener('click', getPosition);
}

//fin de fonction pour localiser position