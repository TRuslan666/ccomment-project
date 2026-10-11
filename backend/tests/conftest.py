import os

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app import models  
from app.db.base import Base
from app.db.session import get_db
from app.main import app

TEST_URL = os.getenv("TEST_DATABASE_URL", "sqlite://")
kwargs = {"connect_args": {"check_same_thread": False}, "poolclass": StaticPool} if TEST_URL.startswith("sqlite") else {}
engine = create_engine(TEST_URL, **kwargs)
TestingSession = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


@pytest.fixture()
def client():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

    def override_get_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    app.dependency_overrides.clear()


@pytest.fixture()
def user(client):
    r = client.post("/api/users", json={"name": "Руслан", "email": "ruslan@example.com"})
    assert r.status_code == 201
    return r.json()


@pytest.fixture()
def comment(client, user):
    r = client.post("/api/comments", json={"user_id": user["id"], "text": "Товар отличный, рекомендую!"})
    assert r.status_code == 201
    return r.json()
