package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.Manager;

import java.util.List;

public interface ManagerService {

    Manager add(Manager manager);

    List<Manager> findAll();
}
