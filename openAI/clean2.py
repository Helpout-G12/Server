import pandas as pd
import re

df = pd.read_csv('./counselchat-data.csv')
df = df.dropna()

instruc = "The following is a conversation between a patient and a therapist. The therapist is a polite, calm, compassionate listener, and aims to help the patient open up and share their struggles and feelings."

def make_ft( question, answer):
    return instruc + '\n' + '{"user": "' + question + '", "bot": "' + answer + '"}' + '\n' + '{"user": "'

def make(question):
    return instruc + '\n' + '{"user": "' + question + '", "bot": "'


with open('counselchat-data-clean_ft.txt', 'w') as f:
    for index, row in df.iterrows():
        question = row['questionText']
        answer = row['answerText']
        prompt = make_ft(question, answer)
        prompt = re.sub(r'<[^>]*>', ' ', prompt)
        prompt = re.sub(r'\s+', ' ', prompt)
        prompt = re.sub(r'\/', '/', prompt)
        prompt = re.sub(r'&nbsp;', ' ', prompt)
        prompt = re.sub(r'&amp;', '&', prompt)
        prompt = re.sub(r'&quot;', '\"', prompt)
        prompt = re.sub(r'&#34;', '\"', prompt)

        f.write(prompt + '\n')