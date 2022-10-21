const express = require('express');
const server = express();
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

server.set('view engine', 'ejs');

server.set('views', __dirname+'/views');

server.use(express.static('public'));

server.use(routes);

server.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});
