const express = require('express');
var app = express();
var calcRate = require('./calcRate.js');

app.set('port', (process.env.PORT || 5000))
   .use(express.static(__dirname + '/public'))
   .set('views', __dirname + '/views')
   .set('view engine', 'ejs')
   .get('/getRate', calcRate.calcRate)
   .listen(app.get('port'), function() {
    console.log('Listening on port ', app.get('port'));
});