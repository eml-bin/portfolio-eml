from app import db
from flask.cli import AppGroup
from app.system_api.admin.auth.model import User
from app.system_api.iot.tag.model import SensorTag
from app.system_api.machine import Machine
from app.system_api.variable import Variable

db_group = AppGroup("db")

DEMO_USER = {
    "email": "demo@mail.com",
    "password": "Demo1234"
}

DEMO_SENSOR_TAGS = [
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Machine.Tag", "id": 1 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Temperature_01.Variable.Tag", "id": 2 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Temperature_02.Variable.Tag", "id": 3 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Temperature_03.Variable.Tag", "id": 4 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Current_01.Variable.Tag", "id": 5 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Current_02.Variable.Tag", "id": 6 },
    { "name": "Factory_GTO_MX.Line_01.IndustrialMachine_01.Current_03.Variable.Tag", "id": 7 },
]

DEMO_MACHINE = [
    { "name": "Moldeadora por Inyección", "sensor_tag_id": 1, "id": 1 },
]

DEMO_MACHINE_VARIABLES = [
    { "name": "T-001", "type": "temperature", "machine_id": 1, "sensor_tag_id": 2, "id": 1 },
    { "name": "T-002", "type": "temperature", "machine_id": 1, "sensor_tag_id": 3, "id": 2 },
    { "name": "T-003", "type": "temperature", "machine_id": 1, "sensor_tag_id": 4, "id": 3 },
    { "name": "C-001", "type": "current", "machine_id": 1, "sensor_tag_id": 5, "id": 4 },
    { "name": "C-002", "type": "current", "machine_id": 1, "sensor_tag_id": 6, "id": 5 },
    { "name": "C-003", "type": "current", "machine_id": 1, "sensor_tag_id": 7, "id": 6 }
]

@db_group.command("seed")
def seed_db():
    print("🔵 Running Seed 🌱")
    if not User.find_by_email(DEMO_USER["email"]):
        new_user = User(email=DEMO_USER["email"], password=DEMO_USER["password"])
        db.session.add(new_user)
        db.session.commit()
        print("🔵 Demo User Seeded 🍃")

    has_records = db.session.query(SensorTag).first()
    if has_records is None:
        db.session.bulk_insert_mappings(SensorTag, DEMO_SENSOR_TAGS)
        db.session.commit()
        print("🔵 Demo SensorTags (IoT) Seeded 🍃")

    has_records = db.session.query(Machine).first()
    if has_records is None:
        db.session.bulk_insert_mappings(Machine, DEMO_MACHINE)
        db.session.commit()
        print("🔵 Demo Machine Seeded 🍃")

    has_records = db.session.query(Variable).first()
    if has_records is None:
        db.session.bulk_insert_mappings(Variable, DEMO_MACHINE_VARIABLES)
        db.session.commit()
        print("🔵 Demo Variables Seeded 🍃")

    print("🔵 All Demo Data Seeded 🌳")


@db_group.command("drop_all")
def drop_all():
    print("🔵 Drop All Models 🪓")
    db.drop_all() # drop Models tables
    print("🔵 Create All Models 🪵")
    db.create_all() # create Models tables
    db.session.commit()