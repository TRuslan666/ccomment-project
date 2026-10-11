from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models import Comment
from app.schemas.comment import CommentCreate, CommentUpdate


def get_comment(db: Session, comment_id: int) -> Comment | None:
    return db.scalar(
        select(Comment).options(selectinload(Comment.classification)).where(Comment.id == comment_id)
    )


def list_comments(
    db: Session, user_id: int | None = None, skip: int = 0, limit: int = 50
) -> list[Comment]:
    stmt = select(Comment).options(selectinload(Comment.classification))
    if user_id is not None:
        stmt = stmt.where(Comment.user_id == user_id)
    stmt = stmt.order_by(Comment.created_at.desc(), Comment.id.desc()).offset(skip).limit(limit)
    return list(db.scalars(stmt))


def create_comment(db: Session, data: CommentCreate) -> Comment:
    comment = Comment(user_id=data.user_id, text=data.text)
    db.add(comment)
    db.commit()
    return get_comment(db, comment.id)  


def update_comment(db: Session, comment: Comment, data: CommentUpdate) -> Comment:
    if data.text != comment.text:
        comment.text = data.text
        comment.classification = None
        db.commit()
    return get_comment(db, comment.id)  


def delete_comment(db: Session, comment: Comment) -> None:
    db.delete(comment)
    db.commit()
