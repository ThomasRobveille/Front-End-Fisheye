function photographerFactory(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement( 'a' );
        link.href = id;
        article.appendChild(link)
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        link.appendChild(img);
        link.appendChild(h2);
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