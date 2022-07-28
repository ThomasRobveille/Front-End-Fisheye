//Variable global
let mediaId, firstname, media;


//Système ouverture/fermeture de modal
function displayModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
}

async function displayLightbox(ElemId){
  const lightbox = document.getElementById('lightbox');
  lightbox.style.display = "flex";
  mediaId = ElemId;

  const photos = await getPhotos();
  const photo = photos.find(photo => photo.id == ElemId);
  console.log(photo)

  const photographers = await getPhotographers();
  const id = window.location.href.split('?')[1];
  const photographer = photographers.find(photographer => photographer.id == id);
  const name = photographer.name.split(' ')[0];
  firstname = name;

  const img = document.getElementById('imgDyn');
  const video = document.getElementById('vidDyn');

  if(photo.image){
    img.src = `assets/photographers/${firstname}/${photo.image}`;
    video.style.display = "none";
  } else if (photo.video) {
    console.log(`assets/photographers/${firstname}/${photo.video}`)
    video.src = `assets/photographers/${firstname}/${photo.video}`;
    img.style.display = "none";
  }

}


//Récupération du formulaire de contact sans rechargement
const buttonForm = document.getElementById('buttonForm');
buttonForm.addEventListener('click', function(e) {
  e.preventDefault();
  const InputForm = document.getElementById('name').value;
  console.log(InputForm);
  closeModal('contact_modal');
})

//fonction de passage de photo/vidéo 
async function previousImg() {
  const img = document.getElementById('imgDyn');
  const id = window.location.href.split('?')[1];
  const photos = await getPhotos();
  const photographePhotos = photos.filter(photo => photo.photographerId == id);
  let imgId;
  for(i = 0; i < photographePhotos.length; i++) {
    if(photographePhotos[i].id == mediaId) {
      if(i == 0) {
        img.src = `assets/photographers/${firstname}/${photographePhotos[photographePhotos.length - 1].image}`;
        imgId = photographePhotos[photographePhotos.length - 1].id;
      } else {
        img.src = `assets/photographers/${firstname}/${photographePhotos[i-1].image}`;
        imgId = photographePhotos[i-1].id;
      }
    }
  }
  mediaId = imgId;
}

async function nextImg() {
  const img = document.getElementById('imgDyn');
  const id = window.location.href.split('?')[1];
  const photos = await getPhotos();
  const photographePhotos = photos.filter(photo => photo.photographerId == id);
  let imgId;
  for(i = 0; i < photographePhotos.length; i++) {
    if(photographePhotos[i].id == photoId) {
      if(i == photographePhotos.length - 1) {
        img.src = `assets/photographers/${firstname}/${photographePhotos[0].image}`;
        imgId = photographePhotos[0].id;
      } else {
        img.src = `assets/photographers/${firstname}/${photographePhotos[i+1].image}`;
        imgId = photographePhotos[i+1].id;
      }
    }
  }
  mediaId = imgId;
}


// function initModals() {
//   const contact = document.querySelector('.contact_button');
//   const previous = document.querySelector('.previous');
//   const next = document.querySelector('.next');

//   contact.onclick = () => { displayModal('contact_modal') };
//   previous.onclick = () => { previousPhoto() };
//   next.onclick = () => { nextPhoto() };
//   document.querySelectorAll('.modal').forEach(modal => {
//       const parent = modal.parentElement;
//       const close = modal.querySelector('.close');
//       close.onclick = () => { closeModal(parent) };
//   })
// }


// function displayModal(name) {
//   const modal = document.querySelector(`#${name}`);
//   const bgtransp = document.querySelector('.bgtransp');
//   modal.style.display = 'flex';
//   bgtransp.style.display = 'block';
// }

// function closeModal(parent) {
//   const bgtransp = document.querySelector('.bgtransp');
//   bgtransp.style.display = 'none';
//   parent.style.display = 'none';
// }

// function previousPhoto() {
//   const photo = document.querySelector('#photo_modal .photo');
//   const h3 = document.querySelector('#photo_modal h3');
//   const id = photos.indexOf(photos.filter(photo => photo.image == selectedMedia)[0]);

//   if (id > 0) {
//       const newMedia = photos[id - 1];
//       const media = newMedia.image ? 'image' : 'video';
//       photo.src = `assets/photos/${firstname}/${newMedia[media]}`;
//       h3.innerText = newMedia.title;
//       selectedMedia = newMedia[media];
//   }
// }

// function nextPhoto() {
//   const photo = document.querySelector('#photo_modal .photo');
//   const h3 = document.querySelector('#photo_modal h3');
//   const id = photos.indexOf(photos.filter(photo => photo.image == selectedMedia)[0]);

//   if (id < photos.length - 1) {
//       const newMedia = photos[id + 1];
//       const media = newMedia.image ? 'image' : 'video';
//       photo.src = `assets/photos/${firstname}/${newMedia[media]}`;
//       h3.innerText = newMedia.title;
//       selectedMedia = newMedia[media];
//   }
// }

// initModals(); 



// function start() {
//   let photos = document.querySelectorAll('.photos-picture');
//   console.log(photos);


//   // photos.forEach(e => {
//   //   e.onclick = (item) => {
//   //     const idPhoto = item.id;
//   //     console.log(idPhoto);
//   //   }
//   // });

//   // photo.onclick = (e) => {
//   //   //openModal();
//   //   const idPhoto = e.getAttribute('id');
//   //   console.log(idPhoto)
//   // }
// } 


// //Ouverture/Fermeture modal
// function openModal() {
//   document.getElementById("modal").style.display = "flex";
// }

// function closeModal() {
//   document.getElementById("modal").style.display = "none";
// }

// start();

