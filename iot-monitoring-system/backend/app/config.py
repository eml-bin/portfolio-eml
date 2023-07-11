import os
from typing import List, Type

basedir = os.path.abspath(os.path.dirname(__file__))

class BaseConfig:
    CONFIG_NAME = "base"
    USE_MOCK_EQUIVALENCY = False
    BCRYPT_LOG_ROUNDS = 4
    TOKEN_EXPIRE_HOURS = 0
    TOKEN_EXPIRE_MINUTES = 60
    SQLALCHEMY_TRACK_MODIFICATIONS = False

## DEMO
class DemoConfig(BaseConfig):
    CONFIG_NAME = "demo"
    DEBUG = True
    SECRET_KEY = "demo-iot-monitoring"

    DB_USER = os.getenv("DB_USER")
    DB_PWD = os.getenv("DB_PASSWORD")
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")
    DB_PORT = os.getenv("DB_PORT")
    
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://{}:{}@{}:{}/{}".format(DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_NAME)


EXPORT_CONFIGS: List[Type[BaseConfig]] = [
    DemoConfig
]

config_by_name = {cfg.CONFIG_NAME: cfg for cfg in EXPORT_CONFIGS}
