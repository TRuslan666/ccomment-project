from fastapi import APIRouter

from app.api.routes import classifications, comments, users

api_router = APIRouter(prefix="/api")
api_router.include_router(users.router)
api_router.include_router(comments.router)
api_router.include_router(classifications.router)
