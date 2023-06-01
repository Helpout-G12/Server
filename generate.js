const express = require('express')
const cors = require('cors')
const { spawn } = require('child_process')

const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

//cd ~/ai/llama.cpp
//"./main -m ./models/ggml-alpaca-7b-q4.bin"

const executable = './llama.cpp/main'
const model = './llama.cpp/models/ggml-model-q4_0.bin'

app.use(cors())
app.use(express.json())

app.post('/chat', (req, res) => {
    let flag = true
    const messages = req.body

    console.log('POST /chat', messages)

    const instruction = "The following is a conversation between a patient and a therapist. The therapist is a polite, calm, compassionate listener, and aims to help the patient open up and share their struggles and feelings. "

    const prompt = instruction + messages.map(m => `${m.role}: ${m.content}`).join('\n') + ' Therapist: '

    // const response = spawn(`${executable} -m ${model} --prompt "${prompt}" --temperature 0.9 --max_tokens 150 --top_p 1 --frequency_penalty 0.0 --presence_penalty 0.0 --stop "Patient:"`, { capture: true })
    const proc = spawn(executable, ['-m', model, '-p', prompt, '--temp', '0.9', '-n', '-1', '--keep', '-1', '-r', 'Patient:'])

    const message = {
        role: 'Therapist',
        content: ''
    }

    proc.stdout.on('data', (data) => {
        if (flag) {
            flag = false
            return
        } // skip first line
        console.log(`stdout: ${data}`)
        message.content += data.toString()
        if (message.content.endsWith('Patient:')) {
            message.content = message.content.slice(0, -9)
            proc.kill()
        }
    })

    proc.stderr.on('data', (data) => {
        if (data == '.') return
        console.error(`stderr: ${data}`)
    })

    proc.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
        console.log(message)
        res.send(message)
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
