# IoT-Monitoring-System API :ice_cube:

### :package: Specifications
- :orange_circle: Main Project: IoT Monitoring System
- :yellow_circle: Service Detail: Performs as RESTful API service, necessary for IoT Modules, like retrieve alarms configurations for example and Dashboard end-user actions/authentication

***

### :scroll: My Activities
> List of my activities in this service
> * Set up neceesary libraries, in this case, we use the micro web framework Flask with the plugins Flask-Restx (API Rest), Flask-Migrate (DB Migrations), SQLAlchemy (ORM) and JWT for authentication 
> * Establish folder structure  
> * Design entity-relationship database diagram together with IoT Team
> * Create necessary files for configure and deploy module/service  

### :eight_spoked_asterisk: Notes
- In this service I don't include all the business rules and database entities like alarms configurations, metrics, notifications only the necessary for monitoring in real-time for demonstration.
- This service runs in port `:5000`, you can visit [http://localhost:5000/api/v1/swagger](http://localhost:5000/api/v1/swagger) if you want to visualize more details about endpoints with Swagger UI
- When this service is running correctly you can get access token with login endpoint using the demonstration user:
    - email: demo@mail.com
    - pwd: Demo1234


