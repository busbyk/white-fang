const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Assign handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);


app.use('/bower_components', express.static('bower_components'));
app.use('/lib', express.static('lib'));
app.use(express.static('public'));

// Start express server
let server = app.listen(app.get('port'), () => {
	let port = server.address().port;
	console.log('listening on port %s', port);
});
