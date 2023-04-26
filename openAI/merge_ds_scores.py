import json
import re
from hashlib import md5

data = open('merged.txt').read().strip().split('\n\n')
results = json.load(open('comparison.json'))
f = open('comparison_results.csv','w+')
print('question,dataset_score,chatbot_score', file=f)
f.close()

for i in range(len(data)):
    q,r1,r2 = data[i].split('\n')
    score = results[i]['choices'][0]['message']['content']
    s1,s2 = re.findall(r'[\d.]+', score)
    s1,s2 = float(s1), float(s2)
    print(f'{md5(q.encode()).hexdigest()},{s1},{s2}', file=open('comparison_results.csv','a+'))