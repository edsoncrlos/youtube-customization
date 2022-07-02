const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.sendFile(__dirname+"/views/index.html")
})

routes.get('/form', (req, res) => {
    res.sendFile(__dirname+"/views/form.html")
})

routes.get('/tumbnails', (req, res) => {
    res.sendFile(__dirname+"/views/tumbnails.html")
})

routes.get('/yt-Video', (req, res) => {
    res.sendFile(__dirname+"/views/yt-Video.html")
})

module.exports = routes;
