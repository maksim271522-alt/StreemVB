document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const posterUrl = params.get('poster');
    const title = params.get('title');

    const movieHero = document.querySelector('.movie-hero');
    if (!movieHero) return;

    if (posterUrl) {
        movieHero.style.backgroundImage = `linear-gradient(180deg, rgba(20, 20, 20, 0) 30%, #141414 100%), url('${posterUrl}')`;
    }

    if (title) {
        const heading = movieHero.querySelector('h1');
        if (heading) heading.textContent = title;
    }
});