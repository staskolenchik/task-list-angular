ALTER TABLE task ADD CONSTRAINT task_assignee_fkey FOREIGN KEY (assignee) REFERENCES usr (id)
