from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.classification import Sentiment


class ClassificationCreate(BaseModel):
    sentiment: Sentiment
    confidence: float = Field(ge=0, le=1)
    model_name: str = Field(default="demo-keywords", max_length=100)


class ClassificationUpdate(BaseModel):
    sentiment: Sentiment | None = None
    confidence: float | None = Field(default=None, ge=0, le=1)
    model_name: str | None = Field(default=None, max_length=100)


class ClassificationRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    comment_id: int
    sentiment: Sentiment
    confidence: float
    model_name: str
    created_at: datetime
