package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.Manager;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;

import java.util.List;

public interface ManagerService {

    Manager add(Manager manager);

    List<ManagerInfoDto> findAll();
}
