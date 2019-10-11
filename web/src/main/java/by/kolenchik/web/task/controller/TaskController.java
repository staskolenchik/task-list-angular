package by.kolenchik.web.task.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/dev/tasks")
public class TaskController {

    private List<Map<String, String>> tasks = Arrays.asList(
            new HashMap<String, String>(){{
                put("id", "1");
                put("subject", "The first subject");
                put("description", "description of the subject one");
            }},
            new HashMap<String, String>(){{
                put("id", "2");
                put("subject", "The second subject");
                put("description", "description of the subject two");
            }},
            new HashMap<String, String>(){{
                put("id", "3");
                put("subject", "The third subject");
                put("description", "description of the subject three");
            }}
    );

    @GetMapping
    public List<Map<String, String>> getTasks() {
        return tasks;
    }
}
