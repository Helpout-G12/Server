import pandas as pd
import re

df = pd.read_csv('./counselchat-data.csv')
df = df.dropna()

instruc = "The following is a conversation between a patient and a therapist. The therapist is a polite, calm, compassionate listener, and aims to help the patient open up and share their struggles and feelings."

def make_ft( question, answer):
    return instruc + '\n' + '{"user": "' + question + '", "bot": "' + answer + '"}' + '\n' + '{"user": "'

def make(question):
    return instruc + '\n' + '{"user": "' + question + '", "bot": "'


with open('clean-dataset.txt', 'w+') as f:
    for index, row in df.iterrows():
        question = row['questionText']
        answer = row['answerText']
        question = re.sub(r'<[^>]*>', ' ', question)
        question = re.sub(r'\s+', ' ', question)
        question = re.sub(r'\/', '/', question)
        question = re.sub(r'&nbsp;', ' ', question)
        question = re.sub(r'&amp;', '&', question)
        question = re.sub(r'&quot;', '\"', question)
        question = re.sub(r'&#34;', '\"', question)

        answer = re.sub(r'<[^>]*>', ' ', answer)
        answer = re.sub(r'\s+', ' ', answer)
        answer = re.sub(r'\/', '/', answer)
        answer = re.sub(r'&nbsp;', ' ', answer)
        answer = re.sub(r'&amp;', '&', answer)
        answer = re.sub(r'&quot;', '\"', answer)
        answer = re.sub(r'&#34;', '\"', answer)

        prompt = "question: " + question.strip() + '\n' + "answer: "+ answer.strip() + '\n\n'
        f.write(prompt)