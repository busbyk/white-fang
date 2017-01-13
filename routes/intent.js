const express = require('express');
const router = express.Router();

router.post('/intent', intent);

function intent(req, res) {
    let data = {
        code: "no text to analyze"
    };

    if(req.body) {
        console.log(req.body);

        if(req.body.text) {
            let input = req.body.text;

            data.code = input;
        }
    }

    res.render('index', data);
}

module.exports = router;
