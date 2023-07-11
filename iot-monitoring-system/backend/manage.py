import os
from flask.cli import FlaskGroup
from app import create_app
from commands.database import db_group

# Flask App Creation
env = os.getenv("FLASK_ENV", "demo")

app = create_app(os.getenv("FLASK_ENV", "demo"))
cli = FlaskGroup(app)

# Add Custom Commands Groups
cli.add_command(db_group)

if __name__ == "__main__":    
    cli()









































































# import os
# from flask_script import Manager

# from app import create_app, db
# from commands.seed_command import SeedCommand

# env = os.getenv("FLASK_ENV", "demo")
# print(f"Active environment: * {env} *")
# app = create_app(env)

# manager = Manager(app)
# app.app_context().push()
# manager.add_command("seed_db", SeedCommand)

# @manager.command
# def run():
#     app.run()

# @manager.command
# def hello():
#     print('test')

# @manager.command
# def drop_all():
#     if input("Are you sure you want to drop all tables? (y/N)\n").lower() == "y":
#         print("Dropping tables...")
#         db.drop_all()

# if __name__ == "__main__":
#     manager.run()
