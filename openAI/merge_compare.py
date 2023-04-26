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



