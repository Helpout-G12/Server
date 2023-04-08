import pandas as pd
import re

df = pd.read_csv('./counselchat-data.csv')
df = df.dropna()

keep = ['topics', 'questionText', 'answerText']
df = df[keep]

df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'<[^>]*>', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'\\n', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'\\r', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'\\t', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'\n\s', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r'\n', ' ', x))
df['answerText'] = df['answerText'].apply(lambda x: re.sub(r' +', ' ', x))

df['questionText'] = df['questionText'].apply(lambda x: re.sub(r'<[^>]*>', ' ', x))
df['questionText'] = df['questionText'].apply(lambda x: re.sub(r'\\n', ' ', x))
df['questionText'] = df['questionText'].apply(lambda x: re.sub(r'\n', ' ', x))
df['questionText'] = df['questionText'].apply(lambda x: re.sub(r'\n\s', ' ', x))
df['questionText'] = df['questionText'].apply(lambda x: re.sub(r'[^\w\s]', ' ', x))
df['questionText'] = df['questionText'].apply(lambda x: re.sub(r' +', ' ', x))

df['prompt'] = df['questionText']
df['completion'] = df['answerText'] + '[' + df['topics'] + ']'

df = df.drop(['questionText', 'answerText', 'topics'], axis=1)

df.to_csv('counselchat-data-clean.csv', index=False)

#print token counts

import tiktoken

enc = tiktoken.encoding_for_model('gpt-3.5-turbo')

file = open('./counselchat-data-clean_prepared.jsonl', 'r')
text = file.read()
file.close()

tokens = enc.encode(text)
print(len(tokens))