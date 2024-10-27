document.getElementById('searchForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const searchValue = document.getElementById('searchValue').value;
    const searchType = document.getElementById('searchType').value;
  
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchValue, searchType })
      });
      const data = await response.json();
  
      displayResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  
  function displayResults(results) {
    const resultsTable = document.getElementById('resultsTable');
    let html = `
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th><th>Branch Type</th><th>Delivery Status</th><th>District</th><th>Region</th><th>State</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
    `;
  
    results.forEach(result => {
      html += `
        <tr>
          <td>${result.Name}</td>
          <td>${result.BranchType}</td>
          <td>${result.DeliveryStatus}</td>
          <td>${result.District}</td>
          <td>${result.Region}</td>
          <td>${result.State}</td>
          <td><button class="btn btn-secondary" onclick="addFavorite('${result.Name}', '${result.BranchType}', '${result.DeliveryStatus}', '${result.District}', '${result.Region}', '${result.State}')">Favorite</button></td>
        </tr>
      `;
    });
  
    html += '</tbody></table>';
    resultsTable.innerHTML = html;
  }
  
  async function addFavorite(name, branchType, deliveryStatus, district, region, state) {
    try {
      await fetch('/api/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, branchType, deliveryStatus, district, region, state })
      });
      alert('Added to favorites!');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  }
  