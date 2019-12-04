package by.kolenchik.web.user.employee;

import by.kolenchik.core.user.employee.dto.AddEmployeeDto;
import by.kolenchik.core.user.employee.dto.EmployeeInfoDto;
import by.kolenchik.core.user.employee.dto.UpdateEmployeeDto;
import by.kolenchik.core.user.employee.service.EmployeeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dev/employees")
public class EmployeeController {

    private EmployeeService employeeService;
    private BCryptPasswordEncoder passwordEncoder;

    public EmployeeController(EmployeeService employeeService, BCryptPasswordEncoder passwordEncoder) {
        this.employeeService = employeeService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/managers/{id}")
    public List<EmployeeInfoDto> findByManagerId(@PathVariable Long id) {
        return employeeService.findByManagerId(id);
    }

    @PostMapping
    public EmployeeInfoDto add(@RequestBody AddEmployeeDto addEmployeeDto) {
        String encodedPassword = passwordEncoder.encode(addEmployeeDto.getPassword());
        addEmployeeDto.setPassword(encodedPassword);

        return employeeService.add(addEmployeeDto);
    }

    @GetMapping
    public Page<EmployeeInfoDto> findAll(@PageableDefault(sort = {"id"})Pageable pageable) {
        return employeeService.findAll(pageable);
    }

    @PutMapping("/{id}")
    public EmployeeInfoDto update(@PathVariable Long id, @RequestBody UpdateEmployeeDto updateEmployeeDto) {
        return employeeService.update(id, updateEmployeeDto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.deleteById(id);
    }

    @DeleteMapping
    public void deleteAll(Long... ids) {
        employeeService.deleteAll(ids);
    }

    @GetMapping("/{id}")
    public EmployeeInfoDto findById(@PathVariable Long id) {
        return employeeService.findById(id);
    }
}
