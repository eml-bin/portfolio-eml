#!/bin/bash


echo "IoT Dashboard API -- Checking MySQL Server"
until mysql --host=$BD_DOCKER_HOST --user=$BD_USER --default-auth=mysql_native_password --password=$BD_PASSWORD -e ";" ; do
    echo "IoT Dashboard API -- MySQL Server is not ready..."
    sleep 1 
done

echo $'IoT Dashboard API -- Django Commands'
python3 manage.py makemigrations
python3 manage.py migrate

echo $'IoT Dashboard API -- API Running!'
python3 manage.py runserver 0.0.0.0:8000