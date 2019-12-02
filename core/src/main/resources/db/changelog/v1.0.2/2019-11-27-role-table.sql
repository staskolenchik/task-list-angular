CREATE TABLE IF NOT EXISTS role(
    id BIGINT PRIMARY KEY,
    designation VARCHAR(45) NOT NULL,
    deactivation_date TIMESTAMP
)
