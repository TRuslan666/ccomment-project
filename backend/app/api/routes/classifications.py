"""Результат классификации — вложенный ресурс комментария: /comments/{id}/classification."""
from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.api.deps import get_comment_or_404
from app.crud import classification as crud
from app.db.session import get_db
from app.models import Classification, Comment
from app.schemas.classification import ClassificationCreate, ClassificationRead, ClassificationUpdate

router = APIRouter(prefix="/comments/{comment_id}/classification", tags=["classifications"])


def _get_or_404(comment: Comment) -> Classification:
    if comment.classification is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "У комментария нет результата классификации")
    return comment.classification


@router.post("", response_model=ClassificationRead, status_code=status.HTTP_201_CREATED)
def create_classification(
    data: ClassificationCreate,
    comment: Comment = Depends(get_comment_or_404),
    db: Session = Depends(get_db),
):
    if comment.classification is not None:
        raise HTTPException(
            status.HTTP_409_CONFLICT, "Результат уже существует, используйте PATCH для изменения"
        )
    return crud.create_classification(db, comment, data)


@router.get("", response_model=ClassificationRead)
def read_classification(comment: Comment = Depends(get_comment_or_404)):
    return _get_or_404(comment)


@router.patch("", response_model=ClassificationRead)
def update_classification(
    data: ClassificationUpdate,
    comment: Comment = Depends(get_comment_or_404),
    db: Session = Depends(get_db),
):
    return crud.update_classification(db, _get_or_404(comment), data)


@router.delete("", status_code=status.HTTP_204_NO_CONTENT)
def delete_classification(comment: Comment = Depends(get_comment_or_404), db: Session = Depends(get_db)):
    crud.delete_classification(db, _get_or_404(comment))
    return Response(status_code=status.HTTP_204_NO_CONTENT)
