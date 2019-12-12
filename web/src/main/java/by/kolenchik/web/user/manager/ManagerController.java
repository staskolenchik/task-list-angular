package by.kolenchik.web.user.manager;

import by.kolenchik.core.user.exception.PasswordsMismatchException;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import by.kolenchik.core.user.manager.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/dev/managers")
public class ManagerController {
    private ManagerService managerService;
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public ManagerController(
            ManagerService managerService,
            BCryptPasswordEncoder passwordEncoder
    ) {
        this.managerService = managerService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{id}")
    public ManagerInfoDto findById(@PathVariable Long id) {
        return managerService.findById(id);
    }

    @GetMapping
    public Page<ManagerInfoDto> findAll(@PageableDefault(sort = {"id"})Pageable pageable) {
        return managerService.findAll(pageable);
    }

    @PostMapping
    public ManagerInfoDto add(@Valid @RequestBody AddManagerDto addManagerDto) {
        validatePassword(addManagerDto.getPassword(), addManagerDto.getConfirmPassword());

        String encodedPassword = passwordEncoder.encode(addManagerDto.getPassword());
        addManagerDto.setPassword(encodedPassword);

        return managerService.add(addManagerDto);
    }

    @PutMapping("/{id}")
    public ManagerInfoDto update(
            @PathVariable Long id,
            @Valid @RequestBody UpdateManagerDto updateManagerDto
    ) {
        return managerService.update(id, updateManagerDto);
    }

    @DeleteMapping
    public void deleteAll(Long... ids) {
        managerService.deleteAll(ids);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        managerService.deleteById(id);
    }

    private void validatePassword(String password, String confirmPassword) {
        if (!password.equals(confirmPassword)) {
            throw new PasswordsMismatchException(
                    "User passwords doesn't match. Password=%s. Password confirmation=%s",
                    password,
                    confirmPassword
            );
        }
    }
}
