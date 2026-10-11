from sqlalchemy.orm import Session

from app.models import Classification, Comment
from app.schemas.classification import ClassificationCreate, ClassificationUpdate


def create_classification(db: Session, comment: Comment, data: ClassificationCreate) -> Classification:
    item = Classification(comment_id=comment.id, **data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def update_classification(
    db: Session, item: Classification, data: ClassificationUpdate
) -> Classification:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item


def delete_classification(db: Session, item: Classification) -> None:
    db.delete(item)
    db.commit()
