// index.js
const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection Pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Enter your MySQL root password if set
  database: 'pincode_db',
  connectionLimit: 10
});

// Routes
// Serve the main search page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the favorites page
app.get('/favourites', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'favourites.html'));
});

// API to search pincode
app.post('/api/search', async (req, res) => {
  const { searchValue, searchType } = req.body;
  const searchURL = `http://www.postalpincode.in/api/${searchType}/${searchValue}`;
  try {
    const response = await axios.get(searchURL);
    const results = response.data?.PostOffice || [];
    res.json(results);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// API to add favorite
app.post('/api/favorite', async (req, res) => {
  const { name, branchType, deliveryStatus, district, region, state } = req.body;
  try {
    await pool.query(
      `INSERT INTO favorites (name, branch_type, delivery_status, district, region, state) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, branchType, deliveryStatus, district, region, state]
    );
    res.json({ message: 'Favorite added successfully' });
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ error: 'Error saving favorite' });
  }
});

// API to retrieve favorites
app.get('/api/favorites', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM favorites`);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

// Start Server
const port = 3000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
