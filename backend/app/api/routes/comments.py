from fastapi import APIRouter, Depends, HTTPException, Query, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_comment_or_404
from app.crud import comment as crud
from app.crud import user as user_crud
from app.db.session import get_db
from app.models import Comment
from app.schemas.comment import CommentCreate, CommentRead, CommentUpdate

router = APIRouter(prefix="/comments", tags=["comments"])


@router.post("", response_model=CommentRead, status_code=status.HTTP_201_CREATED)
def create_comment(data: CommentCreate, db: Session = Depends(get_db)):
    if user_crud.get_user(db, data.user_id) is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, f"Пользователь с id={data.user_id} не найден")
    return crud.create_comment(db, data)


@router.get("", response_model=list[CommentRead])
def list_comments(
    user_id: int | None = Query(None, description="Фильтр по автору (история пользователя)"),
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    db: Session = Depends(get_db),
):
    return crud.list_comments(db, user_id, skip, limit)


@router.get("/{comment_id}", response_model=CommentRead)
def read_comment(comment: Comment = Depends(get_comment_or_404)):
    return comment


@router.patch("/{comment_id}", response_model=CommentRead)
def update_comment(
    data: CommentUpdate, comment: Comment = Depends(get_comment_or_404), db: Session = Depends(get_db)
):
    return crud.update_comment(db, comment, data)


@router.delete("/{comment_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(comment: Comment = Depends(get_comment_or_404), db: Session = Depends(get_db)):
    crud.delete_comment(db, comment)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
