from matplotlib import pyplot as plt
import pandas as pd

data = pd.read_csv('comparison_results.csv')
data = data.sort_values(by=['dataset_score'])
data = data.reset_index(drop=True)

plt.plot(data.index, data.dataset_score)
plt.plot(data.index, data.chatbot_score, '.')
plt.legend(['dataset','chatbot'])
plt.xlabel('dataset score on questions (worst to best)')
plt.ylabel('chatbot score')
plt.savefig('comparison.png')

# print average score for chatbot and dataset

print('dataset average score:', data.dataset_score.mean())
print('chatbot average score:', data.chatbot_score.mean())
