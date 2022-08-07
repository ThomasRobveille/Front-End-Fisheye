//Mettre le code JavaScript lié à la page photographer.html
function getPhotographers() {
  const photographers = fetch('./data/photographers.json')
                          .then(data => data.json())
                          .then(data => data.photographers)
                          .catch(error => console.log("Problème de récupération des photographes", error ));
  return photographers;
}

function getPhotos() {
  const photos = fetch('./data/photographers.json')
                          .then(data => data.json())
                          .then(data => data.media)
                          .catch(error => console.log("Problème de récupération des photos", error ));
  return photos;
}

async function displayData(photographer) {
  const header = document.querySelector('.photograph-header');
  const photographerModel = photographerFactory(photographer);
  const photographHeader = photographerModel.setPhotographerPage();
  //header.insertAdjacentHTML('afterend', photographHeader);
}

function displayPhotos(name, photos) {
  const photosContainer = document.querySelector('#photos-container');
  photosContainer.innerHTML = '';

  photos.forEach(photo => {
    const photosModel = photosFactory(name, photo);
    const photosDOM = photosModel.getPhotoCardDOM();
    photosContainer.appendChild(photosDOM);
  });  
}

async function getPhotographeData() {
  const photographers = await getPhotographers();
  const id = window.location.href.split('?')[1];
  const photographer = photographers.filter(photographer => photographer.id == id)[0];
  displayData(photographer);

  const photos = await getPhotos();
  const photographePhotos = photos.filter(photo => photo.photographerId == id);
  const name = photographer.name;
  const photosContainer = document.querySelector('#photos-container');
  photosContainer.innerHTML = '';
  displayPhotos(name, photographePhotos);
};

getPhotographeData();