from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.classification import ClassificationRead

TEXT_MIN, TEXT_MAX = 5, 1000


class CommentCreate(BaseModel):
    user_id: int
    text: str = Field(min_length=TEXT_MIN, max_length=TEXT_MAX)


class CommentUpdate(BaseModel):
    text: str = Field(min_length=TEXT_MIN, max_length=TEXT_MAX)


class CommentRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    text: str
    created_at: datetime
    classification: ClassificationRead | None = None
