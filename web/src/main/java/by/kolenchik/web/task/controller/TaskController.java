package by.kolenchik.web.task.controller;

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
    public List<Map<String, String>> getTasks() {
        return tasks;
    }

    @PostMapping
    public Map<String, String> addTask(@RequestBody Map<String, String> task) {
        task.put("id", String.valueOf(++count));
        tasks.add(task);
        return task;
    }
}
