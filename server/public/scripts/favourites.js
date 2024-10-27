// Fetch and display favorites when the page loads
document.addEventListener('DOMContentLoaded', async function () {
    try {
      const response = await fetch('/api/favorites');
      const favorites = await response.json();
      displayFavorites(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  });
  
  function displayFavorites(favorites) {
    const favoritesTable = document.getElementById('favoritesTable');
    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Branch Type</th><th>Delivery Status</th><th>District</th><th>Region</th><th>State</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    favorites.forEach(fav => {
      html += `
        <tr>
          <td>${fav.name}</td>
          <td>${fav.branch_type}</td>
          <td>${fav.delivery_status}</td>
          <td>${fav.district}</td>
          <td>${fav.region}</td>
          <td>${fav.state}</td>
        </tr>
      `;
    });
  
    html += '</tbody></table>';
    favoritesTable.innerHTML = html;
  }
  