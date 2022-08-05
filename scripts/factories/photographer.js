function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );

        //Ajout de l'id du photographe au lien pour photographers.html
        link.href = `./photographer.html?` + id;
        article.appendChild(link)

        // Photo
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", "nom du photographe");

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        //Ajout à la balise <a>
        link.appendChild(img);
        link.appendChild(h2);

        //Bloc info du photographe
        const adresse = document.createElement('div');
        adresse.innerText = `${city}, ${country}`;
        const citation = document.createElement('div');
        citation.innerText = `${tagline}`;
        const prix = document.createElement('div');
        prix.innerText = `${price}€`;

        const elements = [link, adresse, citation, prix];
        elements.forEach(element => article.appendChild(element));
        
        return (article);
    }

    function setPhotographerPage() {
        const header = document.querySelector('.photograph-header');

        const h2 = document.createElement('h2');
        const info = document.createElement('div');
        const adresse = document.createElement('div');
        const citation = document.createElement('div');
        const img = document.createElement('img');

        h2.innerText = name;
        adresse.innerText = `${city}, ${country}`;
        adresse.className = "photograph-adresse";
        citation.innerText = `${tagline}`;
        img.src = picture;
        img.className = "photograph-picture";
        img.alt = "photo du photographe";

        info.insertBefore(citation, info.firstElementChild);
        info.insertBefore(adresse, info.firstElementChild);        
        info.insertBefore(h2, info.firstElementChild);
        header.insertBefore(info, header.firstElementChild);
        header.appendChild(img);
    }

    return { getUserCardDOM, setPhotographerPage };
}
