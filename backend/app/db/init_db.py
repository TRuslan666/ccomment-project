"""Создание таблиц: python -m app.db.init_db"""
from app.db.base import Base
from app.db.session import engine
from app import models  # noqa: F401  (импорт нужен, чтобы модели зарегистрировались в Base)


def init_db() -> None:
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Таблицы созданы")
