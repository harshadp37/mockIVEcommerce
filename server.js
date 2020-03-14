const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

//Database connection
mongoose.connect(db.url + db.database, db.options, (err) => {
    if (err)
        console.log("Error connecting to Database.")
    console.log('Successfully connected to Database : ' + db.database);
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log('Server listening on PORT ' + port);
})