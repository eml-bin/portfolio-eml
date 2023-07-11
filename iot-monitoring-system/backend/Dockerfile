FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
WORKDIR /iot_monitoring_api


RUN apt-get update && apt-get install -y --no-install-recommends \
    curl gcc g++ gnupg unixodbc-dev dos2unix libpq-dev python3-dev default-libmysqlclient-dev \
    default-mysql-client wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*
    
COPY requirements.txt requirements.txt

RUN pip3 install --quiet --no-cache-dir -r requirements.txt

ENV FLASK_ENV=dev

COPY . .

# Change line ending format to LF
RUN chmod u+x entrypoint.sh
RUN dos2unix entrypoint.sh

EXPOSE 5000
 
ENTRYPOINT ["./entrypoint.sh"]