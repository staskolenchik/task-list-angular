
CREATE TABLE IF NOT EXISTS employee (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    surname varchar(25) NOT NULL,
    patronymic varchar(25),
    email varchar(255) NOT NULL UNIQUE,
    password varchar(50) NOT NULL,
    birth_date DATE NOT NULL,
    manager_id BIGINT NOT NULL REFERENCES manager(id)
)