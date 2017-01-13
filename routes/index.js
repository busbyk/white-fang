const express = require('express');
const router = express.Router();

// serves a very simplistic UI
router.get('/', function(req, res) {
	console.log('Request for landing page');
	res.render('index');
});

module.exports = router;
