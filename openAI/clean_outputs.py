import os
import re

output_files = sorted(os.listdir('outputs'), key=lambda x: int(x.split('.')[0]))
output = ""

for file in output_files:
  with open('outputs/' + file) as f:
    line = f.readline().strip()
    if not line: continue
    line = line.split('"user": "')[1].strip()
    try:
        question, answer, *_ = line.split('", "therapist": ')
        if answer[0] == '"': answer = answer[1:]
    except:
        print(file, line)
    output+="question: " + question + '\n' + "answer: "+ answer + '\n\n'

print(output, file=open('clean-output.txt', 'w+')) 