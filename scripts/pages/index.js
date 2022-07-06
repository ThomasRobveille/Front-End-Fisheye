function getPhotographers() {
    const photographers = fetch('./data/photographers.json')
        .then(data => data.json())
        .then(data => data.photographers)
        .catch(error => console.log("Problème de récupération des photographes", error ));

    return photographers;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    displayData(photographers);
};

init();
