const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/image", express.static("./image"));

// Import all routes
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');


// Use the routes
app.use('/api/user', userRoutes);
app.use('/api/transactions', transactionRoutes);


var password="DEFIServerpassword"
// Database connection
const url = "mongodb+srv://DEFIWebsite:DEFIWebsiteServer@cluster0.sgvdgj9.mongodb.net/?retryWrites=true&w=majority";
const port = 4000;
// DEFIWebsiteServer
// HAWebsite
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to the database');
    app.use("/",(req,res)=>{
        res.end('origin')
      })
    app.listen(port, () => {
      console.log(`Server is now running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// https://bank-backend-eo5m.onrender.com/api/transactions/transactions/:userId
