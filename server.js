var microbe = require('microbe.js');
var app = microbe();

app.set('publicFolder', 'dist');

app.route('/', function(req, res) {
  res.static('index.html');
})

var port = process.env.PORT || 3000;

app.start(port, function() {
  console.log('Started on port %j', port);
})
