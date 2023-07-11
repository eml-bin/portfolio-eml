# IoT Monitoring System :computer:

### :package: Specifications
- :yellow_circle: System Detail <br/> 
This system was thinked for using as a tool for monitoring remotely industrial machines by them variables like (temperatures, currents, etc.), this version it's only a demonstration and contains some modules for simulate monitoring. 

Each service is encapsulated within a container. You can find more details about each service and my activities done for each service in the following table

| Service 🧊  | README 🔗  |
| --- | --- |
| RESTful API  | [backend/README 📄](backend/README.md)|
| MySQL Instance  | [mysql/README 📄](mysql/README.md)|
| Mosquitto Instance  | [mosquitto/README 📄](mosquitto/README.md)|

## Running System Instructions :rocket:

### :exclamation: Requirements
- Make sure Docker & Docker Compose is installed on your system. You can download Docker from the official website: [https://www.docker.com](https://www.docker.com).

### Steps :notebook_with_decorative_cover:

1. Navigate to the project folder
```
cd iot-monitoring-system
```

2. Run/Build the docker compose file
```
docker compose -f docker-compose.dev.yml up --build
```

