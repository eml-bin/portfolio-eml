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

### :notebook_with_decorative_cover: Steps

1. Navigate to the project folder
```
cd iot-monitoring-system
```

2. Run/Build the docker compose file
```
docker compose -f docker-compose.demo.yml up --build
```

3. Services running table

| :ice_cube: Service | :id: Container_ID | 🖧 Port |
| --- | --- | --- |
| RESTful API  | iot_monitoring_api | :5000
| MySQL Instance  | iot_monitoring_mqtt  | :3306
| Mosquitto Instance  | iot_monitoring_mysql | :1883, :9001