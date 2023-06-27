# SQL Server Edge
Database Module  

Project: CV Inspections System  
Detail:  
  This module performs a embedded lightweight database for an edge hardware, in this case we needed to use SQL Edge image of Microsoft.

Notes:
    * `azure-pipelines.yml` is a representation of a CI/CD pipeline for Azure DevOps.
    * `setup.sql` only for create a init DB or other SQL customizations
    * `startup.sh` script service for run setup.sql when SQL Edge is ready
    * `entrypoint.sh` Docker entrypoint


