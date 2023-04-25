const express = require('express')
const cors = require('cors')
const sp = require('subprocess')

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/chat', (req, res) => {
    const messages = req.body

    console.log('GET /chat', messages)

    const instruction = "The following is a conversation between a patient and a therapist. The therapist is a polite, calm, compassionate listener, and aims to help the patient open up and share their struggles and feelings."

    const prompt = instruction + messages.map(m => `${m.role}: ${m.content}`).join('\n') + 'Therapist: '

    const response = sp.run(`${executable} -m ${model} --prompt "${prompt}" --temperature 0.9 --max_tokens 150 --top_p 1 --frequency_penalty 0.0 --presence_penalty 0.0 --stop "Patient:"`, { capture: true })

    const message = response.stdout.split('\n').slice(-2)[0].trim()

    console.log(message)

    res.json(message)

})