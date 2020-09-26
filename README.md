# Dog KNN
A basic app that returns the `k` nearest neighbors of a selected dog breed using the variables no. of genetic ailments, weight (kg), and shoulder height (cm).

View the app at [dogneighbors.tk](www.dogneighbors.tk). It should be live between 9am and 5pm Central Time.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
Install [Nodejs](https://nodejs.org/en/), [Yarn](https://yarnpkg.com/), [Python](https://www.python.org/)(>=3.5), [Docker](https://docs.docker.com/get-docker/), and [Docker Compose](https://docs.docker.com/compose/install/). 

Clone the repo and create a virtual environment in the `api` folder with `python3 -m venv .venv`.

Activate the virtual environment with `source api/.venv/bin/activate`. Install the requirements with `pip install -r api/requirements.txt`.

Create a file `api/.flaskenv` that contains 
```
FLASK_APP=api.py
FLASK_ENV=development
DOCKER_DEPLOY=1
```

You can also create a `.env` file that has 
```
DOCKER_CLIENT_TIMEOUT=1000
COMPOSE_HTTP_TIMEOUT=1000
```

This can be helpful for slower internet connections. 

Note that by setting `DOCKER_DEPLOY=0`, the app will not run inside a Docker container. Use `yarn start` to run the app without Docker.

## Run the app
Start the app locally by running `docker-compose up --build -d`. The app will be available on `localhost:3000`.

## Data Source
The data was sourced from the [American Kennel Club](https://docs.google.com/spreadsheets/d/1l_HfF5EaN-QgnLc2UYdCc7L2CVrk0p3VdGB1godOyhk/edit#gid=10). It is also described in this blog [post](https://www.informationisbeautiful.net/visualizations/best-in-show-whats-the-top-data-dog/).
