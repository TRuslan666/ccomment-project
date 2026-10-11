from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_user_or_404
from app.crud import user as crud
from app.db.session import get_db
from app.models import User
from app.schemas.user import UserCreate, UserRead, UserUpdate

router = APIRouter(prefix="/users", tags=["users"])


def _ensure_email_free(db: Session, email: str, exclude_id: int | None = None) -> None:
    existing = crud.get_user_by_email(db, email)
    if existing is not None and existing.id != exclude_id:
        raise HTTPException(status.HTTP_409_CONFLICT, "Пользователь с таким email уже существует")


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    _ensure_email_free(db, data.email)
    return crud.create_user(db, data)


@router.get("", response_model=list[UserRead])
def list_users(
    skip: int = Query(0, ge=0), limit: int = Query(50, ge=1, le=200), db: Session = Depends(get_db)
):
    return crud.list_users(db, skip, limit)


@router.get("/{user_id}", response_model=UserRead)
def read_user(user: User = Depends(get_user_or_404)):
    return user


@router.patch("/{user_id}", response_model=UserRead)
def update_user(data: UserUpdate, user: User = Depends(get_user_or_404), db: Session = Depends(get_db)):
    if data.email is not None:
        _ensure_email_free(db, data.email, exclude_id=user.id)
    return crud.update_user(db, user, data)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user: User = Depends(get_user_or_404), db: Session = Depends(get_db)):
    crud.delete_user(db, user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
