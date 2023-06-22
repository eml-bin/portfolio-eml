FROM python:3.9-slim

ENV PYTHONUNBUFFERED 1
WORKDIR /code

COPY requirements.txt requirements.txt

RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev dos2unix libpq-dev python3-dev default-libmysqlclient-dev

RUN apt-get update && apt-get install -y default-mysql-client wget

RUN pip3 install --quiet -r requirements.txt

# RUN wget https://downloads.mariadb.com/Connectors/odbc/connector-odbc-3.1.7/mariadb-connector-odbc-3.1.7-ga-debian-x86_64.tar.gz \
#   && tar -xvzf mariadb-connector-odbc-3.1.7-ga-debian-x86_64.tar.gz

# RUN install lib64/libmaodbc.so /usr/lib/ \
#   && install -d /usr/lib/mariadb/ \
#   && install -d /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/auth_gssapi_client.so /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/caching_sha2_password.so /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/client_ed25519.so /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/dialog.so /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/mysql_clear_password.so /usr/lib/mariadb/plugin/ \
#   && install lib/mariadb/plugin/sha256_password.so /usr/lib/mariadb/plugin/

COPY . .

EXPOSE 8000

ENTRYPOINT ["./entrypoint.sh"]