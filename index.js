const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const uri = 'mongodb://localhost:27017'

MongoClient.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(client => {

  const db = client.db('test')
  const moods = db.collection('moods')
  const thoughts = db.collection('thoughts')
  const journals = db.collection('journals')

  app.get('/moods', async (req, res) => {
    console.log('GET /moods', req.body)
    const moods = await moods.find().toArray()
    res.json(moods)
  })

  app.post('/moods', async (req, res) => {
    const { mood } = req.body
    console.log('POST /moods', mood)
    await moods.insertOne({ mood })
    res.json({ message: 'Mood saved!' })
  })

  app.get('/thoughts', async (req, res) => {
    console.log('GET /thoughts', req.body)
    const thoughts = await thoughts.find().toArray()
    res.json(thoughts)
  })

  app.post('/thoughts', async (req, res) => {
    const { thought } = req.body
    console.log('POST /thoughts', thought)
    await thoughts.insertOne({ thought })
    res.json({ message: 'Thought saved!' })
  })

  app.get('journal', async (req, res) => {
    console.log('GET /journal', req.body)
    const journal = await journals.find().toArray()
    res.json(journal)
  })

  app.post('/journal', async (req, res) => {
    const { journal } = req.body
    console.log('POST /journal', journal)
    await journals.insertOne({ journal })
    res.json({ message: 'Journal saved!' })
  })

  app.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)
  })
})