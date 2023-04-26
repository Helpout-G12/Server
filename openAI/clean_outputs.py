import os
import re

output_files = sorted(os.listdir('outputs'), key=lambda x: int(x.split('.')[0]))
output = []

for file in output_files:
    with open('outputs/' + file) as f:
        try:
            line = f.readlines()[0].strip()
        except:
            continue
        try:
            question, answer = re.match(r'.*?{"user": "(.*?)", "therapist": "(.*?)"?[})]?.*', line).groups()
        except:
            print(line)
            continue
        output.append((question, answer))

print(output, file=open('clean-output.txt', 'w'))

