#print token counts

import tiktoken

enc = tiktoken.encoding_for_model('gpt-3.5-turbo')

file = open('./merged.txt')
text = file.read()
file.close()

tokens = enc.encode(text)
print(len(tokens))