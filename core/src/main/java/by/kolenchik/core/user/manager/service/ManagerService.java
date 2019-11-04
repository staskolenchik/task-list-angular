package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;

import java.util.List;

import java.util.List;

public interface ManagerService {


    ManagerInfoDto add(AddManagerDto addManagerDto);

    List<ManagerInfoDto> findAll();

    void deleteById(Long id);

    ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto);

    ManagerInfoDto findById(Long id);
}
