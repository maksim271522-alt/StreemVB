document.addEventListener("DOMContentLoaded", () => {
    // Находим абсолютно все карточки фильмов на главной странице
    const movieCards = document.querySelectorAll('.card');

    movieCards.forEach(card => {
        // Делаем карточки кликабельными (добавляем иконку пальца при наведении)
        card.style.cursor = "pointer";

        // Вешаем событие клика
        card.addEventListener('click', () => {
            // Перенаправляем пользователя на страницу деталей
            window.location.href = 'movie-details.html';
        });
    });
});