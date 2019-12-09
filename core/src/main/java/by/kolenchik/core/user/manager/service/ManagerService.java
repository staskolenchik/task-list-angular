package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface ManagerService {
    @Transactional
    ManagerInfoDto add(AddManagerDto addManagerDto);

    Page<ManagerInfoDto> findAll(Pageable pageable);

    @Transactional
    void deleteById(Long id);

    @Transactional
    ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto);

    ManagerInfoDto findById(Long id);

    Boolean existsById(Long id);

    @Transactional
    void deleteAll(Long[] ids);

    User findUserById(Long id);
}
