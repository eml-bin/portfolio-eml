#!/bin/bash

echo "🔵 IoT Monitoring API -- Checking MySQL Server 👁️"
until mysql --host=$DB_HOST --user=$DB_USER --default-auth=mysql_native_password --password=$DB_PASSWORD -e ";" ; do
    echo "IoT Monitoring API -- MySQL Server is not ready... ⏳"
    sleep 1 
done

MIGRATIONS_PATH="./migrations"

if [ -d "$MIGRATIONS_PATH" ] && [ "$(ls -A "$MIGRATIONS_PATH")" ]; then 
    echo $'IoT Monitoring API -- Flask DB Migrations Ready 💿'
else 
    echo $'IoT Monitoring API -- Flask DB Migrations Start 💿'
    flask db init
fi

echo $'🔵 IoT Monitoring API -- Flask DB New Migrations 💿'
flask db stamp head
flask db migrate

echo $'🔵 IoT Monitoring API -- Flask DB Upgrade 💿'
flask db upgrade

echo $'🔵 IoT Monitoring API -- Load Seed Command'
python3 manage.py db seed

python3 wsgi.py