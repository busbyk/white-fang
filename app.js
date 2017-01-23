const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// Initialize express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Assign handlebars as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

// Make a bunch of folders public for including scripts via html
app.use('/bower_components', express.static('bower_components'));
app.use('/lib', express.static('lib'));
app.use(express.static('public'));

app.use('/decreaseWhiteFang', (req, res) => {
	console.log('should decrease white fang\'s health');

	eventEmitter.emit('nomad-publish-event', {
		event: 'decrease-white-fang'
	});

	res.send('successful');
});

// Start express server
let server = app.listen(app.get('port'), () => {
	let port = server.address().port;
	console.log('listening on port %s', port);
});

// set up nomad
// const Nomad = require('nomad-stream');
// const nomad = new Nomad();

// nomad.subscribe('QmezyLTWQJKjnK2qXwQDgmTwP5LBjayrVkqzUwmV5Sfr1o', obj => {
// 	console.log('got nomad message: ' + JSON.stringify(obj));
//
// 	if(obj.message) {
// 		obj.message = JSON.parse(obj.message); //parse json
// 		if(obj.message.event == 'device_on_off') {
// 			if(obj.message.data) { // device is on, decrease white fang
// 				console.log('emitting decrease-white-fang');
// 				eventEmitter.emit('nomad-publish-event', {
// 					event: 'decrease-white-fang'
// 				});
// 			} else {
// 				console.log('emitting complete-task');
// 				eventEmitter.emit('nomad-publish-event', {
// 					event: 'complete-task',
// 					data: 'TV'
// 				}); //default to the device being the TV for the purpose of demo...
// 			}
// 		}
// 	}
// });

// set up socket.io
const io = require('socket.io')(server);

io.on('connection', socket => {
	console.log('connected to client');
})

eventEmitter.on('nomad-publish-event', function(obj) {
	console.log('emitting socket.io event. Object looks like this: ' + JSON.stringify(obj));
	if(obj.data){
		io.emit(obj.event, obj.data);
	} else {
		io.emit(obj.event);
	}
})
