package by.kolenchik.web.user.manager;

import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dev/managers")
public class ManagerController {

    private ManagerService managerService;

    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @PostMapping
    public ManagerInfoDto add(@RequestBody AddManagerDto addManagerDto) {
        return managerService.add(addManagerDto);
    }

    @GetMapping
    public List<ManagerInfoDto> findAll() {
        return managerService.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        managerService.deleteById(id);
    }

    @PutMapping("/{id}")
    public ManagerInfoDto update(
            @PathVariable Long id,
            @RequestBody UpdateManagerDto updateManagerDto
    ) {
        return managerService.update(id, updateManagerDto);
    }

    @GetMapping("/{id}")
    public ManagerInfoDto findById(@PathVariable Long id) {
        return managerService.findById(id);
    }
}
