const express = require('express');
// const expressLayouts = require('express-ejs-layouts')
const dotenv = require('dotenv').config()

const app = express();

// Ejs
app.use(express.static(__dirname + '/public'));
// app.use(expressLayouts)
app.set('view engine', 'ejs');

// Routes
const routes = require('./src/routes/index')
app.use('/' , routes)

const PORT = process.env.PORT || 3001;
app.listen(PORT , console.log(`Server started on port ${PORT}`))