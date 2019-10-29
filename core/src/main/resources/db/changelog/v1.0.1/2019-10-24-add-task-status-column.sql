DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'task_status') THEN
        CREATE TYPE task_status AS ENUM ('TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE');
    END IF;
END $$;

ALTER TABLE task ADD COLUMN IF NOT EXISTS task_status task_status NOT NULL DEFAULT 'TODO';

