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

routes.get('/yt-video', (req, res) => {
    res.render("yt-video")
})

module.exports = routes;
