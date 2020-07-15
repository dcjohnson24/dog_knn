import time
import sys
import os
sys.path.append(os.pardir)

from flask import Flask, request

from model.train import main

app = Flask(__name__)


@app.route('/api/dogs')
def get_nearest_neighbors():
    dog_breed = request.args.get('dog_breed')
    n_neighbors = request.args.get('n_neighbors')
    neighbors = main(dog_breed, n_neighbors)
    return {'neighbors': neighbors}
