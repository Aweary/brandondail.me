
import microbe from 'microbe.js'
const app = microbe(__dirname)

app.set('publicFolder', 'dist');

app.route({
  method: 'GET',
  path: '/',
  handler: duplex => duplex.static('index.html')
})

app.start(3000, function() {
  console.log('Started on port %j', 3000);
})
