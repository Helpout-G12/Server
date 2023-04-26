import subprocess as sp
source = "counselchat-data-clean_ft.txt"
output = "outputs.txt"

count = 0

with open(output, 'w+') as o:
    with open(source, 'r') as f:
        for line in f.readlines():
            count += 1
            if count > 10: break
            sp.call([
            './llama.cpp/main', 
            '-m',
            'llama.cpp/models/ggml-model-q4_0.bin', 
            '-p',
            line,
            '-n',
            512,
            '-t',
            0.8,
            ], stdout=o)

