# Post-Office-App

Post-Office-App/
├── server/
│   ├── node_modules/
│   ├── public/
│   │   ├── css/
│   │   │   └── bootstrap.min.css
│   │   ├── scripts/
│   │   │   ├── main.js
│   │   │   └── favorites.js
│   │   └── index.html
│   ├── views/
│   │   └── favourites.html
│   ├── package.json
│   ├── package-lock.json
│   └── index.js

# Post Office App

## 📌 Overview

The **Post Office App** allows users to search for Indian post/pin code locations using either the code or the name. The application enables users to mark their favorite locations for quick access.

## ⚙️ Technologies Used

- **Node.js**: Backend runtime environment
- **MySQL (XAMPP)**: Database management system
- **Bootstrap 5**: UI framework for responsive design

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) - Download and install the latest version.
- [XAMPP](https://www.apachefriends.org/index.html) - Download and install XAMPP for MySQL.

## 🛠️ Setup Instructions

### Step 1: Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/Deepak-Gangwani/Post-Office-App

cd Post-Office-App/server

npm install

## Create database pincode_db
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    branch_type VARCHAR(255),
    delivery_status VARCHAR(255),
    district VARCHAR(255),
    region VARCHAR(255),
    state VARCHAR(255)
);

node index.js


Contribution
If you'd like to contribute to this project, please fork the repository and create a pull request.
