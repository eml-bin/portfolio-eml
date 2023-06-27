# SQL Server Edge
Database Module  

:orange_circle: **Project:** CV Inspections System   
:yellow_circle: **Detail:**  
  This module performs a embedded lightweight database for an edge hardware, in this case we needed to use SQL Edge image of Microsoft.

:eight_spoked_asterisk: **Notes:**  
- `azure-pipelines.yml` is a representation of a CI/CD pipeline for Azure DevOps.
- `setup.sql` only for create a init DB or other SQL customizations
- `startup.sh` script service for run setup.sql when SQL Edge is ready
- `entrypoint.sh` Docker entrypoint


