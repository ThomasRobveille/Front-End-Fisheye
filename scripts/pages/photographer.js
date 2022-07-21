//Mettre le code JavaScript lié à la page photographer.html
function getPhotographers() {
  const photographers = fetch('./data/photographers.json')
                          .then(data => data.json())
                          .then(data => data.photographers)
                          .catch(error => console.log("Problème de récupération des photographes", error ));
  return photographers;
}

async function displayData(photographer) {
  const header = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.setPhotographerPage();
  header.appendChild(photographHeader);
}

async function getPhotographeData() {
  const photographers = await getPhotographers();
  const id = window.location.href.split('?')[1];
  const photographer = photographers.filter(photographer => photographer.id == id)[0];
  displayData(photographer);
};

getPhotographeData();