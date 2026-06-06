// Ждем, пока главная страница полностью загрузится
document.addEventListener("DOMContentLoaded", () => {
    
    // Находим абсолютно все карточки на странице (и фильмы, и сериалы, и жанры)
    const allCards = document.querySelectorAll('.card');

    allCards.forEach(card => {
        // Делаем так, чтобы при наведении на карточку курсор менялся на пальчик
        card.style.cursor = 'pointer';
        
        // Вешаем клик на каждую карточку
        card.addEventListener('click', (event) => {
            event.preventDefault(); 

            const poster = card.querySelector('img.card__poster') || card.querySelector('img');
            const posterUrl = poster ? poster.src : '';
            const posterTitle = poster ? poster.alt : '';

            const params = new URLSearchParams();
            if (posterUrl) params.set('poster', posterUrl);
            if (posterTitle) params.set('title', posterTitle);

            const targetUrl = 'w3.html' + (params.toString() ? `?${params.toString()}` : '');
            window.location.href = targetUrl;
        });
    });
    
    console.log("Скрипт переходов успешно запущен! Найдено карточек: " + allCards.length);
});