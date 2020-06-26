import os
import json
from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

users=[]
channels=[]

chats={"channelMessages":{}, "pcMessages":{}}

@socketio.on('my event')
def handle_message(message):
    print('received message: ' + message)

@socketio.on('messageToServer')
def messageToServer(pc, channel, message, time, sender):
    global chats
    print(chats)
    print("Sender: "+sender)
    if pc=="no":
        chats["channelMessages"]["b'"+channel+"'"]["message"+str(chats["channelMessages"]["b'"+channel+"'"]["messageNumber"])]={"sender":sender, "text":message, "time":time}
        if len(chats["channelMessages"]["b'"+channel+"'"])>101:
            for i in range(chats["channelMessages"]["b'"+channel+"'"]["messageNumber"]-100):
                chats["channelMessages"]["b'"+channel+"'"].pop("message"+str(i+1), "oh well")
        chats["channelMessages"]["b'"+channel+"'"]["messageNumber"]+=1
    elif pc=="yes":
        first=sender
        second=channel
        if channel<sender:
            first=channel
            second=sender
        if first in chats["pcMessages"]:
            if second in chats["pcMessages"][first]:
                chats["pcMessages"][first][second]["message"+str(chats["pcMessages"][first][second]["messageNumber"])]={"sender":sender, "text":message, "time":time}
                chats["pcMessages"][first][second]["messageNumber"]+=1
            else:
                chats["pcMessages"][first][second]={"messageNumber": 2, "message1":{"sender":sender, "text":message, "time":time}}
        else:
            chats["pcMessages"][first]={second:{"messageNumber": 2, "message1":{"sender":sender, "text":message, "time":time}}}
        if len(chats["pcMessages"][first][second])>101:
            for i in range(chats["pcMessages"][first][second]["messageNumber"]-101):
                chats["pcMessages"][first][second].pop("message"+str(i+1), "oh well")
    print(chats)
    emit("messageToClients", chats, broadcast=True)

@app.route("/add-user", methods=['POST'])
def add_user():
    global users
    if not (str(request.data) in users):
        users=users+[str(request.data)]
        return str(1)
    else:
        return str(0)

@app.route("/add-channel", methods=['POST'])
def add_channel():
    global channels
    global chats
    if not (str(request.data) in channels):
        channels=channels+[str(request.data)]
        chats["channelMessages"][str(request.data)]={"messageNumber": 1}
        return str(1)
    else:
        return str(0)

@app.route("/get-users", methods=['POST'])
def get_user():
    global users
    return "{\"empty\":"+str(int(len(users)==0))+", \"data\":"+str(users)+"}"

@app.route("/get-channels", methods=['POST'])
def get_channel():
    global channels
    print(channels)
    print("empty", str(int(len(channels)==0)))
    return "{\"empty\":"+str(int(len(channels)==0))+", \"data\":"+str(channels)+"}"

@app.route("/")
def index():
    return render_template("index.html")
