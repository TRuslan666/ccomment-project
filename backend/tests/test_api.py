# ---------- users ----------
def test_user_crud(client):
    r = client.post("/api/users", json={"name": "Анна", "email": "anna@example.com"})
    assert r.status_code == 201
    uid = r.json()["id"]

    assert client.get(f"/api/users/{uid}").json()["email"] == "anna@example.com"
    assert len(client.get("/api/users").json()) == 1

    r = client.patch(f"/api/users/{uid}", json={"name": "Анна П."})
    assert r.status_code == 200 and r.json()["name"] == "Анна П."

    assert client.delete(f"/api/users/{uid}").status_code == 204
    assert client.get(f"/api/users/{uid}").status_code == 404


def test_user_duplicate_email_409(client, user):
    r = client.post("/api/users", json={"name": "Другой", "email": user["email"]})
    assert r.status_code == 409


def test_user_update_to_foreign_email_409(client, user):
    other = client.post("/api/users", json={"name": "B", "email": "b@example.com"}).json()
    assert client.patch(f"/api/users/{other['id']}", json={"email": user["email"]}).status_code == 409
    # собственный email оставить можно
    assert client.patch(f"/api/users/{user['id']}", json={"email": user["email"]}).status_code == 200


def test_user_validation_422(client):
    assert client.post("/api/users", json={"name": "X", "email": "not-an-email"}).status_code == 422
    assert client.post("/api/users", json={"name": "", "email": "a@b.co"}).status_code == 422


def test_user_not_found_404(client):
    assert client.get("/api/users/999").status_code == 404
    assert client.patch("/api/users/999", json={"name": "X"}).status_code == 404
    assert client.delete("/api/users/999").status_code == 404


# ---------- comments ----------
def test_comment_crud(client, user):
    r = client.post("/api/comments", json={"user_id": user["id"], "text": "Сервис ужасный, не рекомендую"})
    assert r.status_code == 201
    body = r.json()
    assert body["classification"] is None
    cid = body["id"]

    assert client.get(f"/api/comments/{cid}").status_code == 200
    r = client.patch(f"/api/comments/{cid}", json={"text": "Теперь всё хорошо"})
    assert r.json()["text"] == "Теперь всё хорошо"
    assert client.delete(f"/api/comments/{cid}").status_code == 204
    assert client.get(f"/api/comments/{cid}").status_code == 404


def test_comment_for_missing_user_404(client):
    r = client.post("/api/comments", json={"user_id": 12345, "text": "Какой-то текст"})
    assert r.status_code == 404


def test_comment_text_validation_422(client, user):
    assert client.post("/api/comments", json={"user_id": user["id"], "text": "abc"}).status_code == 422
    assert client.post("/api/comments", json={"user_id": user["id"], "text": "x" * 1001}).status_code == 422


def test_comments_filter_by_user_and_pagination(client, user):
    other = client.post("/api/users", json={"name": "B", "email": "b@example.com"}).json()
    for i in range(3):
        client.post("/api/comments", json={"user_id": user["id"], "text": f"Комментарий {i} номер"})
    client.post("/api/comments", json={"user_id": other["id"], "text": "Чужой комментарий"})

    assert len(client.get("/api/comments").json()) == 4
    assert len(client.get(f"/api/comments?user_id={user['id']}").json()) == 3
    assert len(client.get(f"/api/comments?user_id={user['id']}&limit=2").json()) == 2
    assert client.get("/api/comments?limit=0").status_code == 422


# ---------- classifications ----------
def test_classification_crud(client, comment):
    url = f"/api/comments/{comment['id']}/classification"
    assert client.get(url).status_code == 404

    r = client.post(url, json={"sentiment": "positive", "confidence": 0.91})
    assert r.status_code == 201 and r.json()["model_name"] == "demo-keywords"

    # результат виден во вложенном поле комментария (экран «История»)
    assert client.get(f"/api/comments/{comment['id']}").json()["classification"]["sentiment"] == "positive"

    r = client.patch(url, json={"confidence": 0.5})
    assert r.json()["confidence"] == 0.5 and r.json()["sentiment"] == "positive"

    assert client.delete(url).status_code == 204
    assert client.get(url).status_code == 404


def test_classification_duplicate_409(client, comment):
    url = f"/api/comments/{comment['id']}/classification"
    assert client.post(url, json={"sentiment": "negative", "confidence": 0.8}).status_code == 201
    assert client.post(url, json={"sentiment": "negative", "confidence": 0.8}).status_code == 409


def test_classification_validation_422(client, comment):
    url = f"/api/comments/{comment['id']}/classification"
    assert client.post(url, json={"sentiment": "happy", "confidence": 0.8}).status_code == 422
    assert client.post(url, json={"sentiment": "positive", "confidence": 1.5}).status_code == 422


def test_classification_for_missing_comment_404(client):
    assert client.post("/api/comments/999/classification", json={"sentiment": "positive", "confidence": 0.9}).status_code == 404


# ---------- связанные записи ----------
def test_editing_text_drops_stale_classification(client, comment):
    url = f"/api/comments/{comment['id']}/classification"
    client.post(url, json={"sentiment": "positive", "confidence": 0.9})
    r = client.patch(f"/api/comments/{comment['id']}", json={"text": "Совсем другой текст отзыва"})
    assert r.json()["classification"] is None
    assert client.get(url).status_code == 404


def test_same_text_keeps_classification(client, comment):
    url = f"/api/comments/{comment['id']}/classification"
    client.post(url, json={"sentiment": "positive", "confidence": 0.9})
    r = client.patch(f"/api/comments/{comment['id']}", json={"text": comment["text"]})
    assert r.json()["classification"] is not None


def test_delete_comment_cascades_to_classification(client, comment):
    client.post(f"/api/comments/{comment['id']}/classification", json={"sentiment": "positive", "confidence": 0.9})
    assert client.delete(f"/api/comments/{comment['id']}").status_code == 204
    assert client.get(f"/api/comments/{comment['id']}/classification").status_code == 404


def test_delete_user_cascades_to_comments_and_classifications(client, user, comment):
    client.post(f"/api/comments/{comment['id']}/classification", json={"sentiment": "positive", "confidence": 0.9})
    assert client.delete(f"/api/users/{user['id']}").status_code == 204
    assert client.get(f"/api/comments/{comment['id']}").status_code == 404
    assert client.get("/api/comments").json() == []


def test_health(client):
    assert client.get("/health").json() == {"status": "ok"}
