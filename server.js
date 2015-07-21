var microbe = require('microbe.js');
var app = microbe();

app.set('publicFolder','dist');

app.route('/', function(req, res) {
  res.static('index.html');
})

app.start(3000, function(){
  console.log('Started on port 3000');
})
