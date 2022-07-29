//Variable global
let mediaId, firstname, media, lightboxUp;


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
  lightboxUp = true;
  mediaId = ElemId;

  const photos = await getPhotos();
  const photo = photos.find(photo => photo.id == ElemId);

  const photographers = await getPhotographers();
  const id = window.location.href.split('?')[1];
  const photographer = photographers.find(photographer => photographer.id == id);
  const name = photographer.name.split(' ')[0];
  firstname = name;

  const img = document.getElementById('imgDyn');
  const video = document.getElementById('vidDyn');

  if(photo.image){
    img.src = `assets/photographers/${firstname}/${photo.image}`;
    img.style.display = "block";
    video.style.display = "none";
  } else if (photo.video) {
    video.src = `assets/photographers/${firstname}/${photo.video}`;
    video.style.display = "block";
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
  const vid = document.getElementById('vidDyn');
  const id = window.location.href.split('?')[1];
  const medias = await getPhotos();
  const photographeMedias = medias.filter(media => media.photographerId == id);
  let imgId;
  for(i = 0; i < photographeMedias.length; i++) {
    if(photographeMedias[i].id == mediaId) {
      if(i == 0) {
        if(photographeMedias[photographeMedias.length - 1].image) {
          img.src = `assets/photographers/${firstname}/${photographeMedias[photographeMedias.length - 1].image}`;
          img.style.display = "block";
          vid.style.display = "none";
          imgId = photographeMedias[photographeMedias.length - 1].id;
        } else {
          vid.src = `assets/photographers/${firstname}/${photographeMedias[photographeMedias.length - 1].video}`;
          vid.style.display = "block";
          img.style.display = "none";
          imgId = photographeMedias[photographeMedias.length - 1].id;
        }
      } else {
        if(photographeMedias[i-1].image) {
          img.src = `assets/photographers/${firstname}/${photographeMedias[i-1].image}`;
          img.style.display = "block";
          vid.style.display = "none";
          imgId = photographeMedias[i-1].id;
        } else {
          vid.src = `assets/photographers/${firstname}/${photographeMedias[i-1].video}`;
          vid.style.display = "block";
          img.style.display = "none";
          imgId = photographeMedias[i-1].id;
        }
      }
    }
  }
  mediaId = imgId;
}

async function nextImg() {
  const img = document.getElementById('imgDyn');
  const vid = document.getElementById('vidDyn');
  const id = window.location.href.split('?')[1];
  const medias = await getPhotos();
  const photographeMedias = medias.filter(media => media.photographerId == id);
  let imgId;
  for(i = 0; i < photographeMedias.length; i++) {
    if(photographeMedias[i].id == mediaId) {
      if(i == photographeMedias.length - 1) {        
        if(photographeMedias[0].image) {
          img.src = `assets/photographers/${firstname}/${photographeMedias[0].image}`;
          img.style.display = "block";
          vid.style.display = "none";
          imgId = photographeMedias[0].id;
        } else {
          vid.src = `assets/photographers/${firstname}/${photographeMedias[0].video}`;
          vid.style.display = "block";
          img.style.display = "none";
          imgId = photographeMedias[0].id;
        }
      } else {
        if(photographeMedias[i+1].image) {        
          img.src = `assets/photographers/${firstname}/${photographeMedias[i+1].image}`;
          img.style.display = "block";
          vid.style.display = "none";
          imgId = photographeMedias[i+1].id;
        } else {
          vid.src = `assets/photographers/${firstname}/${photographeMedias[i+1].video}`;
          vid.style.display = "block";
          img.style.display = "none";
          imgId = photographeMedias[i+1].id;
        }
      }
    }
  }
  mediaId = imgId;
}

document.addEventListener('keyup', function(target) {
  if(target.code == "ArrowRight" && lightboxUp == true){
    nextImg();
  } else if (target.code == "ArrowLeft" && lightboxUp == true) {
    previousImg();
  }
})

//Ajout des likes
async function addLike(ElemId){
  const photos = await getPhotos();
  const photo = photos.find(photo => photo.id == ElemId);
  photo.likes = photo.likes + 1;
  const note = document.getElementById(`note${ElemId}`)
  note.innerText = photo.likes;

  const like = document.createElement('img');
  like.src = 'assets/icons/favIcon.png';
  like.classList.add('like');
  like.alt = 'like'; 

  note.appendChild(like);
}

async function sumLike(){
  const medias = await getPhotos();
  const id = window.location.href.split('?')[1];
  const photographeMedias = medias.filter(media => media.photographerId == id);
  
  let sumLike = 0;
  photographeMedias.forEach(element => {
    sumLike = sumLike + element.likes;
  });

  const likeImg = document.createElement('img');
  likeImg.src = 'assets/icons/favIcon.png';
  likeImg.classList.add('like');
  likeImg.alt = 'like'; 

  const photographer = await getPhotographers();
  const photographe = photographer.find(photographe => photographe.id == id);

  const divTotalLike = document.getElementById('totalLike');
  const div = document.createElement('div');
  const p = document.createElement('p');
  p.innerText = `${sumLike}`;

  const prix = document.createElement('p');
  prix.innerText = `${photographe.price}€/jour`;

  div.appendChild(p);
  div.appendChild(likeImg);
  divTotalLike.appendChild(div);
  divTotalLike.appendChild(prix);

}

sumLike();