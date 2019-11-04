package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;

import java.util.List;

public interface ManagerService {

    ManagerInfoDto add(AddManagerDto addManagerDto);

    List<ManagerInfoDto> findAll();
}
