const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//templating for all pages
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//using built-in middleware - reference files for server


//middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance',
        message: 'Please check back later!'
    });
});

app.use(express.static(__dirname + '/public')); 

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (textToScream) => {
    return textToScream.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Page!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        message: 'ERROR'
    });
});


app.listen(3000, () => {
    console.log('server up on port 3000');
});