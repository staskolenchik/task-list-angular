CREATE TABLE IF NOT EXISTS comment_review(
    id BIGINT REFERENCES comment(id) PRIMARY KEY,
    comment_id BIGINT NOT NULL
)