package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.Manager;
import by.kolenchik.core.user.manager.repository.ManagerRepository;
import org.springframework.stereotype.Service;

@Service
public class ManagerServiceImpl implements ManagerService {

    private ManagerRepository managerRepository;

    public ManagerServiceImpl(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    @Override
    public Manager add(Manager manager) {
        return managerRepository.save(manager);
    }
}
