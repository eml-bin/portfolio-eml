#!/bin/bash

set -e

if [ -n "$MYSQL_APP_DATABASE" ]; then
   echo "Creating database: $MYSQL_APP_DATABASE"
   mysql -u "$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$MYSQL_APP_DATABASE\` ;"
fi

if [ -n "$MYSQL_APP_USER" ] && [ -n "$MYSQL_APP_PWD" ]; then
   echo "Creating user: $MYSQL_APP_USER"
   mysql -u "$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASSWORD" -e "CREATE USER '$MYSQL_APP_USER'@'%' IDENTIFIED BY '$MYSQL_APP_PWD';"
   echo "User: $MYSQL_APP_USER permissions for database: $MYSQL_APP_DATABASE"
   mysql -u "$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASSWORD" -e "GRANT ALL PRIVILEGES ON \`$MYSQL_APP_DATABASE\`.* TO '$MYSQL_APP_USER'@'%';"
   mysql -u "$MYSQL_ROOT_USER" -p"$MYSQL_ROOT_PASSWORD" -e "FLUSH PRIVILEGES;"
fi

exec "$@"
