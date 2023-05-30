## To run the backend server:
Prereq: Ensure node and mongo installations.
1. Clone the server repository: `git clone https://github.com/Helpout-G12/Server'
2. Open the Server directory in terminal: `cd Server`
3. Setup the AI server using below instructions.
4. Launch the server using `npm start`

## To setup the AI server:

1. Clone `https://github.com/ggerganov/llama.cpp
2. Navigate to lamma.cpp: `cd llama.cpp` 
3. Follow the instructions in the Readme.md for llama.cpp to setup llama.cpp
4. Download the `ggml-alpaca-7b-q4.bin` for alpaca model weights.
5. Download the llama `tokenizer.model` for llama.
6. Use the convert script as directed in the Readme.md for llama.cpp: `python convert.py ggml-alpaca-7b-q4.bin`
7. Your AI model should be ready. (Run the main executable to test)
8. Add the path to the main executable and model to generate.js
9. Run generate.js with `node generate.js`
