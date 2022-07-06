function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
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

    return { name, picture, getUserCardDOM }
}