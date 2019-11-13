package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.manager.Manager;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import by.kolenchik.core.user.manager.repository.ManagerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class ManagerServiceImpl implements ManagerService {

    private ManagerRepository managerRepository;
    private ModelMapper modelMapper;

    public ManagerServiceImpl(ManagerRepository managerRepository, ModelMapper modelMapper) {
        this.managerRepository = managerRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ManagerInfoDto add(AddManagerDto addManagerDto) {
        Manager manager = modelMapper.map(addManagerDto, Manager.class);

        Manager managerFromDb = managerRepository.save(manager);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public List<ManagerInfoDto> findAll() {
        List<Manager> managers = managerRepository.findAll();

        return managers.stream()
                .map(manager -> modelMapper.map(manager, ManagerInfoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        managerRepository.deleteById(id);
    }

    @Override
    public ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto) {
        Manager managerFromDb = managerRepository.getOne(id);

        BeanUtils.copyProperties(updateManagerDto, managerFromDb);

        Manager savedManager = managerRepository.save(managerFromDb);

        return modelMapper.map(savedManager, ManagerInfoDto.class);
    }

    @Override
    public ManagerInfoDto findById(Long id) {
        Manager managerFromDb = managerRepository.getOne(id);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public Boolean existsById(Long id) {
        return managerRepository.existsById(id);
    }
}
