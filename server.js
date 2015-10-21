
import microbe from 'microbe.js'
const app = microbe(__dirname)
const port = process.env.PORT || 3000

app.set('publicFolder', 'dist');

app.route({
  method: 'GET',
  path: '/',
  handler: duplex => duplex.static('index.html')
})

app.start(port, function() {
  console.log(`Started app on port ${port}`)
})
