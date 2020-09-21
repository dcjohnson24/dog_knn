FROM python:3.8-slim

WORKDIR /usr/src/app/

COPY requirements.txt ./requirements.txt

RUN pip install -r ./requirements.txt

COPY . .

WORKDIR /usr/src/app/api

CMD ["gunicorn", "-w", "2", "-b", "0.0.0.0:5000", "api:app"]
