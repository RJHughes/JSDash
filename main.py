from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit
import numpy as np

import json
import time
import random
import threading

# Required for server-side emit() to work
import eventlet
eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dreamchaser'
socketio = SocketIO(app)

@app.route("/")
def index():
    title = "Example Chart"
    return render_template("index.html", title=title)

def produce_chart_data():
    t = 0;
    while True:
        # Sleep for random duration to prove async working
        time.sleep(0.1)

        if t > 100:
            t = 0
        else:
            t+=1

        # Get some data from source and emit to clients when recieved
        data = get_some_data(t)

        socketio.emit('new-chart-data', data)
        print("Emit data")

def get_some_data(t):
    T = 50
    data = np.sin(2*np.pi*t/T)

    return data


if __name__ == '__main__':
    t = threading.Thread(target=produce_chart_data)
    t.start()

    PORT = json.load(open('config.json'))["PORT"]
    print("Running on localhost:"+str(PORT))

    socketio.run(app, host='0.0.0.0', port=PORT,debug=True)
