import requests

server_text_set = set()
response = requests.get('http://127.0.0.1:888/msg')
print(response)

msg_list = response.json()

for msg in msg_list:
    for char in msg:
        server_text_set.add(char)
