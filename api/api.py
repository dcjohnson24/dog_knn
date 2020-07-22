import sys
import os
sys.path.append(os.pardir)

from flask import Flask, request, jsonify

from model.train import main

app = Flask(__name__)


@app.route('/')
def home():
    return "Hello, world!"


@app.route('/api/dogs', methods=['POST'])
def get_nearest_neighbors():
    req = request.get_json()
    import pdb; pdb.set_trace()
    dog_breed = req['dogName']
    n_neighbors = int(req['numNeighbors'])
    neighbors = main(dog_breed=dog_breed, n_neighbors=n_neighbors)
    return {'result': neighbors}
