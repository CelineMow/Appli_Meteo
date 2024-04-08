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

function showDate() {
    let now = new Date();
    let data = weatherData;
    conditionOutPut.innerHTML = data.weather[0].description;

    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');

    dateOutPut.innerHTML = `${jourDeLaSemaine(now.getDay(), now.getMonth() + 1, now.getFullYear())} ${now.getDate()} ${getMonthName(now.getMonth())} ${now.getFullYear()}`;
    heureOutPut.innerHTML = `${hours} : ${minutes}`;
    nomVilleOutPut.innerHTML = data.name;
}


function afficherMeteoByCoords() {
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

setInterval(() => {
    showDate();
}, 1000);

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

setInterval(() => {
    showDate();
}, 1000);