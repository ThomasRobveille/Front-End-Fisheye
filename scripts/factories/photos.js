function photosFactory(name, data) {
  const { id, photographId, title, image, video, likes, date, price } = data
  const firstname = name.split(' ')[0];
  const picture = `assets/photographers/${firstname}/${image}`;
  const src = `assets/photographers/${firstname}/${video}`;

  let media = image ? 'image' : 'video';

  function getPhotoCardDOM() {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const video = document.createElement('video');
    const source = document.createElement('source');
    const info = document.createElement('div');
    const h3 = document.createElement('h3');
    const note = document.createElement('div');

    const like = document.createElement('img');
    like.src = 'assets/icons/favIcon.png';
    like.classList.add('like');
    like.id = 'like' + id
    like.setAttribute('onclick', 'addLike(' + id + ')');
    like.alt = 'like';    

    if (media == 'image') {
      img.setAttribute('onclick', 'displayLightbox(' + id + ')');
      img.src = picture;
      img.className = "photo-picture";
      img.id = id;
      article.appendChild(img);
    } else if (media == 'video') {
      video.setAttribute('onclick', 'displayLightbox(' + id + ')');
      video.src = src;
      video.className = "photo-video";
      video.id = id;
      video.controls = true;
      article.appendChild(video);
    }

    h3.innerText = title;
    note.id = 'note' + id;
    note.innerText = `${likes}`;
    note.appendChild(like);
    info.className = "photo-info";

    
    info.appendChild(h3);
    info.appendChild(note);
    article.appendChild(info);
    return article;
  }

  return { getPhotoCardDOM };
}