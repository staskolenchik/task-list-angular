package by.kolenchik.web.user.manager;

import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dev/managers")
public class ManagerController {

    private ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping
    public List<ManagerInfoDto> findAll() {
        return managerService.findAll();
    }
}
