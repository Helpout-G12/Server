const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const uri = 'mongodb://127.0.0.1:27017'

const withdb = async (cb) => {
  try {
    const client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const db = client.db('test')
    return cb({
      moods: db.collection('moods'),
      thoughts: db.collection('thoughts'),
      journal: db.collection('journal')
    })
  } catch (error) {
    console.log(error)
    return error
  }
}

app.get("/test", (req, res) => {
  console.log({ origin: req.headers.origin});
  res.json({ message: "Hello from server!" });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({
    message: `Hello sender! I got your POST request. This is what you sent me: ${req.body.post}`,
  });
});

app.get('/moods', async (req, res) => {
  console.log('GET /moods', req.body)
  const moods = await withdb(({ moods }) => moods.find().toArray())
  res.json(moods)
})

app.post('/moods', async (req, res) => {
  const mood = req.body
  console.log('POST /moods', mood)
  await withdb(({ moods }) => moods.insertOne(mood))
  res.json({ message: 'Mood saved!' })
})

app.get('/thoughts', async (req, res) => {
  console.log('GET /thoughts', req.body)
  const thoughts = await withdb(({ thoughts }) => thoughts.find().toArray())
  res.json(thoughts)
})

app.post('/thoughts', async (req, res) => {
  const thought = req.body
  console.log('POST /thoughts', thought)
  await withdb(({ thoughts }) => thoughts.insertOne(thought))
  res.json({ message: 'Thought saved!' })
})

app.get('journal', async (req, res) => {
  console.log('GET /journals', req.body)
  const journal = await withdb(({ journal }) => journal.find().toArray())
  res.json(journal)
})

app.post('/journal', async (req, res) => {
  const journal = req.body
  console.log('POST /journals', journal)
  await withdb(({ journal }) => journal.insertOne(journal))
  res.json({ message: 'Journal saved!' })
})

app.listen(port, () => {
  console.log(`server listening at http://0.0.0.0:${port}`)
})