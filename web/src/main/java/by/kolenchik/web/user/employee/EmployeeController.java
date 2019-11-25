package by.kolenchik.web.user.employee;

import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
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

    @GetMapping("/managers/{id}")
    public List<EmployeeInfoDto> findByManagerId(@PathVariable Long id) {
        return employeeService.findByManagerId(id);
    }

    @PostMapping
    public EmployeeInfoDto add(@RequestBody AddEmployeeDto addEmployeeDto) {
        return employeeService.add(addEmployeeDto);
    }

    @GetMapping
    public List<EmployeeInfoDto> findAll() {
        return employeeService.findAll();
    }

    @PutMapping("/{id}")
    public EmployeeInfoDto update(@PathVariable Long id, @RequestBody UpdateEmployeeDto updateEmployeeDto) {
        return employeeService.update(id, updateEmployeeDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.deleteById(id);
    }

    @GetMapping("/{id}")
    public EmployeeInfoDto findById(@PathVariable Long id) {
        return employeeService.findById(id);
    }
}
