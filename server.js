
import microbe from 'microbe.js'
const app = microbe()

app.set('publicFolder', 'dist');

app.route('/', (req, res) => {
  res.static('index.html')
})

var port = process.env.PORT || 3000;

app.start(port, function() {
  console.log('Started on port %j', port);
})
