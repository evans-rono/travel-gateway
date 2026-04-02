// public/javascripts/main.js

function searchTrips() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards  = document.querySelectorAll('.trip-card');

  cards.forEach(card => {
    const name = card.querySelector('.trip-name').textContent.toLowerCase();
    const resort = card.querySelector('.trip-details').textContent.toLowerCase();

    // Show card if search term matches name or resort
    if (name.includes(input) || resort.includes(input)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}