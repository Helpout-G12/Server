outputs = 'clean-output.txt'
dataset = 'clean-dataset.txt'

with open(outputs) as f:
    outputs = f.read()
with open(dataset) as f:
    dataset = f.read().strip()

outputs = outputs.split('\n\n')
dataset = dataset.split('\n\n')

print(len(outputs), len(dataset))

outputs = [output.split('\n') for output in outputs]
dataset = [data.split('\n') for data in dataset]
#a = "answer: stuff"

outputs = {q:a[8:] for q,a in outputs}
dataset = {q:a[8:] for q,a in dataset}

merged = [f'{q}\ndataset: {dataset[q]}\nchatbot: {outputs[q]}' for q in outputs.keys() if q]

print(*merged, sep='\n\n', file=open('merged.txt','w+'))

import dotenv
import os
import openai
dotenv.load_dotenv("../.env")
openai.api_key = os.getenv("OPENAI_API_KEY")


prompt='Compare the following two answers to the same question and give a score from 0(worst) to 10(best) for all three responses as "[dataset:score, chatbot:score]<end>"\n'
for entry in merged:
    print(openai.ChatCompletion.create(
        messages = [{
            'role': 'system',
            'content': prompt
        },{
            'role': 'user',
            'content': entry
        }],
        model="gpt-4",
        max_tokens=150,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        stop=["<end>"]
    ), end=',', file=open('comparison_results.txt','a+'))