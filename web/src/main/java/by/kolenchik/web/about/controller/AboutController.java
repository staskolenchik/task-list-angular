package by.kolenchik.web.about.controller;

import by.kolenchik.web.about.properties.ApplicationProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/dev/about")
public class AboutController {
    private final ApplicationProperties applicationProperties;

    @Autowired
    public AboutController(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
    }

    @GetMapping
    public ApplicationProperties getInfo() {
        return applicationProperties;
    }

}
