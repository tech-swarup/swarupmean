const path = require("path");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

// Database
const db = "mongodb+srv://techswarup:qwerty@1@cluster0.g6lll.mongodb.net/payroll?retryWrites=true&w=majority";

mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    function(err) {
        if (err) {
            console.error('Error')
        } else {
            console.log('Connect Live MongoDB')
        }
    });

const postRoutes = require('./routes/app');
const userRoutes = require('./routes/user');

// De-structing User Input
app.use(express.json());

//This middleware will allow file to be read/GET when performed select Query
app.use("/images", express.static(path.join("images")));

app.use(userRoutes);
app.use(postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}.`);
});