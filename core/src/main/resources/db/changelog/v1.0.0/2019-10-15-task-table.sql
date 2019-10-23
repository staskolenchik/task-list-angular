CREATE TABLE IF NOT EXISTS task(
    id BIGSERIAL PRIMARY KEY,
    subject VARCHAR(45) NOT NULL,
    description varchar(255)
)