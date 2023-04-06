const express = require('express')
const cors = require('cors')
const { MongoClient, Db } = require('mongodb')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const uri = 'mongodb://localhost:27017'

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

app.get('/moods', async (req, res) => {
  console.log('GET /moods', req.body)
  const moods = await withdb(({ moods }) => moods.find().toArray())
  res.json(moods)
})

app.post('/moods', async (req, res) => {
  const { mood } = req.body
  console.log('POST /moods', mood)
  await withdb(({ moods }) => moods.insertOne({ mood }))
  res.json({ message: 'Mood saved!' })
})

app.get('/thoughts', async (req, res) => {
  console.log('GET /thoughts', req.body)
  const thoughts = await withdb(({ thoughts }) => thoughts.find().toArray())
  res.json(thoughts)
})

app.post('/thoughts', async (req, res) => {
  const { thought } = req.body
  console.log('POST /thoughts', thought)
  await withdb(({ thoughts }) => thoughts.insertOne({ thought }))
  res.json({ message: 'Thought saved!' })
})

app.get('journal', async (req, res) => {
  console.log('GET /journal', req.body)
  const journal = await withdb(({ journal }) => journal.find().toArray())
  res.json(journal)
})

app.post('/journal', async (req, res) => {
  const { journal } = req.body
  console.log('POST /journal', journal)
  await withdb(({ journal }) => journal.insertOne({ journal }))
  res.json({ message: 'Journal saved!' })
})

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`)
})