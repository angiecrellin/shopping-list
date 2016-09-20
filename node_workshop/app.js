/**
    *@module app.js
 */


const express = require('express');
const homeController = require('./controllers/home');
const app = express();
app.set ('view engine', 'pug')

app.get('/', homeController.index);

app.get('/about', homeController.about);

app.get('/*', homeController.notFound);


app.listen(3000,function(){
    console.log('Your app is listening on port 3000!');
});

