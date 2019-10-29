CREATE TABLE IF NOT EXISTS comment (
    id BIGINT PRIMARY KEY,
    text varchar(255) NOT NULL,
    creation_timestamp TIMESTAMP NOT NULL,
    author BIGINT NOT NULL REFERENCES employee(id),
    task_id BIGINT NOT NULL REFERENCES task(id)
)