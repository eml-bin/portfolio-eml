# Derived from official mysql image (our base image)
FROM mysql:8.0

COPY init.sh /docker-entrypoint-initdb.d/
RUN chmod +x /docker-entrypoint-initdb.d/init.sh