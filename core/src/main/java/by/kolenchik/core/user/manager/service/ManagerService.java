package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ManagerService {

    ManagerInfoDto add(AddManagerDto addManagerDto);

    Page<ManagerInfoDto> findAll(Pageable pageable);

    void deleteById(Long id);

    ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto);

    ManagerInfoDto findById(Long id);

    Boolean existsById(Long id);

    void deleteAll(Long[] ids);
}
