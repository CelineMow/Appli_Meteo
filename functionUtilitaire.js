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