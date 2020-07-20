import time
import sys
import os
sys.path.append(os.pardir)

from flask import Flask, request, jsonify

from model.train import main

app = Flask(__name__)


@app.route('/api/dogs', methods=['POST'])
def get_nearest_neighbors():
    # dog_breed = request.args.get('dogName')
    # n_neighbors = request.args.get('numNeighbors')
    req = request.get_json()
    req['numNeighbors'] = int(req['numNeighbors'])
    dog_breed = req['dogName']
    n_neighbors = int(req['numNeighbors'])
    neighbors = main(dog_breed=dog_breed, n_neighbors=n_neighbors)
    return {'result': neighbors}
