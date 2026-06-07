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

    const reviewPages = [
        [
            {
                name: 'Aniket Roy',
                origin: 'From India',
                rating: 4.5,
                body: 'This movie was recommended to me by a very dear friend who went for the movie by himself. I went to the cinema to watch out load a bucket of popcorn as I couldn\'t watch it...',
            },
            {
                name: 'Swaraj',
                origin: 'From India',
                rating: 5,
                body: 'A mysterious compromise his lands to the local tribes in exchange of a storm (Panjurli), a deity of Sacred Villagers wherein for trials science and powers of mind...',
            },
        ],
        [
            {
                name: 'Aisha Khan',
                origin: 'From Pakistan',
                rating: 4.7,
                body: 'The soundtrack and scenery were breathtaking, and the characters felt very real and grounded in their world.',
            },
            {
                name: 'Miguel Santos',
                origin: 'From Brazil',
                rating: 4.3,
                body: 'A strong drama with cultural depth and emotional payoff, making it a memorable watch from start to finish.',
            },
        ],
        [
            {
                name: 'Lina Chen',
                origin: 'From China',
                rating: 4.9,
                body: 'Powerful storytelling, terrific performances, and a memorable climax make this one of the best films I saw this year.',
            },
            {
                name: 'Noah Smith',
                origin: 'From USA',
                rating: 4.6,
                body: 'I loved how the film blended tradition, tension, and humanity into a compelling experience.',
            },
        ],
    ];

    const reviewsGrid = document.querySelector('.content-card .reviews-grid');
    const paginationContainer = document.querySelector('.content-card .pagination-container');
    const dots = paginationContainer ? Array.from(paginationContainer.querySelectorAll('.dot')) : [];
    let currentPage = 0;

    function renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalf = rating % 1 >= 0.5;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i += 1) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        }
        if (hasHalf) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        }

        return starsHtml;
    }

    function updateReviewCards(pageIndex) {
        if (!reviewsGrid || pageIndex < 0 || pageIndex >= reviewPages.length) return;

        const page = reviewPages[pageIndex];
        reviewsGrid.innerHTML = page.map(review => {
            return `
                <div class="review-box">
                    <div class="review-top">
                        <div class="user-info">
                            <h4>${review.name}</h4>
                            <span>${review.origin}</span>
                        </div>
                        <div class="rating-badge">
                            <div class="stars">
                                ${renderStars(review.rating)}
                            </div>
                            <span class="rating-num">${review.rating}</span>
                        </div>
                    </div>
                    <p class="review-body">${review.body}</p>
                </div>
            `;
        }).join('');

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === pageIndex);
        });
        currentPage = pageIndex;
    }

    function changePage(delta) {
        const nextPage = (currentPage + delta + reviewPages.length) % reviewPages.length;
        updateReviewCards(nextPage);
    }

    if (paginationContainer) {
        const arrowButtons = paginationContainer.querySelectorAll('.arrow-btn');
        if (arrowButtons.length >= 2) {
            arrowButtons[0].addEventListener('click', () => changePage(-1));
            arrowButtons[1].addEventListener('click', () => changePage(1));
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => updateReviewCards(index));
        });
    }

    updateReviewCards(currentPage);
});