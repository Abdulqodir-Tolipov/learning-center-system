console.clear();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const cookie = require('cookie-parser');
const { PORT } = require('./config/server.js');
const app = express();

// setting template engine
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// load middlewares
const middleware = require('./middlewares/checkToken.js')

// third-party and build-in middlewares
app.use(cookie())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(middleware)

// load modules
const modules = require('./modules')

app.use(modules)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
