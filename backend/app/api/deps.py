from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import user as user_crud
from app.db.session import get_db
from app.models import User


def get_user_or_404(user_id: int, db: Session = Depends(get_db)) -> User:
    user = user_crud.get_user(db, user_id)
    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Пользователь с id={user_id} не найден")
    return user



