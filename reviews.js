// Fetch reviews from JSON Server and render them on the page
async function fetchReviews() {
    try {
        const response = await fetch('http://localhost:3000/reviews');
        const reviews = await response.json();

        const container = document.getElementById('reviews-container');
        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.className = 'col-md-6 mb-4';
            reviewCard.innerHTML = `
                <div class="card p-3 shadow">
                    <h5>${review.author}</h5>
                    <p class="text-muted">Оцінка: ${review.rating} / 5</p>
                    <p>${review.comment}</p>
                    <small class="text-muted">${review.date}</small>
                </div>
            `;
            container.appendChild(reviewCard);
        });
    } catch (error) {
        console.error('Помилка при завантаженні відгуків:', error);
    }
}

// Run the function on page load
document.addEventListener('DOMContentLoaded', fetchReviews);
