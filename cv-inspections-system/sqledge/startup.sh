#!/bin/bash

for i in {1..50};

do
    /opt/mssql-tools/bin/sqlcmd -S $MSSQL_HOST -U sa -P $MSSQL_SA_PASSWORD -i /usr/work/setup.sql
    if [ $? -eq 0 ]
    then
        echo "setup.sql completed"
        break
    else
        echo "not ready yet..."
        sleep 1
    fi
done
