const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.render("index")
})

routes.get('/form', (req, res) => {
    res.render("form")
})

routes.get('/tumbnails', (req, res) => {
    res.render("tumbnails")
})

routes.get('/yt-Video', (req, res) => {
    res.render("yt-Video")
})

module.exports = routes;
