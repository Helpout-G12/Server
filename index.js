const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { MongoClient } = require('mongodb')

console.log('Starting server...')
require('dotenv').config()
console.log('process.env.OPENAI_API_KEY', process.env.OPENAI_API_KEY)


const { Configuration, OpenAIApi } = require('openai');
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

const dburi = 'mongodb://127.0.0.1:27017'
const app = express()
const port = 3000

app.use(cors())

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
  }
}))
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    "upgrade-insecure-requests": true,
    directives: {
      "default-src": [
        "'self'"
      ]
    }
  })
)
app.use(express.json())


const withdb = async (cb) => {
  try {
    const client = await MongoClient.connect(dburi, {
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/test", (req, res) => {
  console.log({ origin: req.headers.origin });
  res.json({ message: "Hello from the world!" });
});

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({
    message: `Hello sender! I got your POST request. This is what you sent me: ${req.body.post}`,
  });
});

app.get('/moods', async (req, res) => {
  console.log('GET /moods')
  const moods = await withdb(({ moods }) => moods.find().toArray())
  res.json(moods)
  console.log(moods)
})

app.post('/moods', async (req, res) => {
  const mood = req.body
  console.log('POST /moods', mood)
  await withdb(({ moods }) => moods.insertOne(mood))
  res.json({ message: 'Mood saved!' })
})

app.get('/thoughts', async (req, res) => {
  console.log('GET /thoughts')
  const thoughts = await withdb(({ thoughts }) => thoughts.find().toArray())
  res.json(thoughts)
  console.log(thoughts)
})

app.post('/thoughts', async (req, res) => {
  const thought = req.body
  console.log('POST /thoughts', thought)
  await withdb(({ thoughts }) => thoughts.insertOne(thought))
  res.json({ message: 'Thought saved!' })
})

app.get('journals', async (req, res) => {
  console.log('GET /journals')
  const journal = await withdb(({ journal }) => journal.find().toArray())
  res.json(journal)
  console.log(journal)
})

app.post('/journals', async (req, res) => {
  const journal = req.body
  console.log('POST /journals', journal)
  await withdb(({ journal }) => journal.insertOne(journal))
  res.json({ message: 'Journal saved!' })
})

app.post('/chat', async (req, res) => {
  const messages = req.body
  console.log('POST /chat', prompt)

  const response = await openai.createChatCompletion({
    // model: process.env.OPENAI_MODEL,
    model: 'gpt-3.5-turbo',
    messages: messages.map(m=> {return {role:m.role, content:m.content}})
  })
  res.json({text:response.data.choices[0].text.split('[')[0]})
})

app.route('/favicon.ico').get((req, res) => res.status(204));

app.listen(port, () => {
  console.log(`server listening at http://0.0.0.0:${port}`)
})