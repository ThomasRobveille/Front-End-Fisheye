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

        const h1 = document.createElement('h1');
        const adresse = document.createElement('address');
        const citation = document.createElement('blockquote');
        const img = document.createElement('img');

        h1.innerText = name;
        adresse.innerText = `${city}, ${country}`;
        citation.innerText = `${tagline}`;
        img.src = picture;

        header.insertBefore(citation, header.firstElementChild);
        header.insertBefore(adresse, header.firstElementChild);
        header.insertBefore(h1, header.firstElementChild);
        header.appendChild(img);
    }

    return { getUserCardDOM, setPhotographerPage };
}
