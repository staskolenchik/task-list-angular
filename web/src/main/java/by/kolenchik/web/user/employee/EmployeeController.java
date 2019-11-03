package by.kolenchik.web.user.employee;

import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dev/employees")
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public EmployeeInfoDto add(@RequestBody AddEmployeeDto addEmployeeDto) {
        return employeeService.add(addEmployeeDto);
    }

    @GetMapping
    public List<EmployeeInfoDto> findAll() {
        return employeeService.findAll();
    }
}
