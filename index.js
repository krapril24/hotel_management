const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET,    
    resave: false,                
    saveUninitialized: true,      
    cookie: {
        secure: false,              
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

// Dynamically load routes from the /routes folder
const routesPath = path.join(__dirname,'routes');
fs.readdirSync(routesPath).forEach((file) => { 
  if (file.endsWith('.js')) { 
    const route = require(path.join(routesPath, file));
    const routePath = '/' + file.replace('.js', ''); 
    app.use(routePath, route);
  }else{
    console.log("file does not exist");
  }
});

// Define the port to listen on

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
