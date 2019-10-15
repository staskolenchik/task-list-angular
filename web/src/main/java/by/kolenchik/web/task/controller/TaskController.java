package by.kolenchik.web.task.controller;

import by.kolenchik.web.task.exceptions.TaskNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/dev/tasks")
public class TaskController {

    private List<Map<String, String>> tasks = new ArrayList<Map<String, String>>() {{
        add(new HashMap<String, String>() {{
            put("id", "1");
            put("subject", "The first subject");
            put("description", "description of the subject one");
        }});
        add(new HashMap<String, String>() {{
            put("id", "2");
            put("subject", "The second subject");
            put("description", "description of the subject two");
        }});
        add(new HashMap<String, String>() {{
            put("id", "3");
            put("subject", "The third subject");
            put("description", "description of the subject three");
        }});
    }};

    private long count = tasks.size();

    @GetMapping
    public List<Map<String, String>> get() {
        return tasks;
    }

    @PostMapping
    public Map<String, String> add(@RequestBody Map<String, String> task) {
        task.put("id", String.valueOf(++count));
        tasks.add(task);
        return task;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        if (tasks.size() > 0) {
            Map<String, String> match = tasks.stream()
                    .filter(task -> task.get("id").equals(id))
                    .findFirst()
                    .orElseThrow(() -> new TaskNotFoundException("Task with id=%s was not found", id));
            tasks.remove(match);
        } else {
            throw new TaskNotFoundException("Task with id=%s was not found", id);
        }
    }

    @PutMapping("/{id}")
    public Map<String, String> update(@PathVariable String id, @RequestBody Map<String, String> newTask) {
        Map<String, String> taskFromDB = tasks.stream()
                .filter(task -> id.equals(task.get("id")))
                .findFirst()
                .orElseThrow(() -> new TaskNotFoundException("Task with id=%s was not found", id));
        taskFromDB.putAll(newTask);
        return taskFromDB;
    }
}
