package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.UserRole;
import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRoleEnum;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import by.kolenchik.core.user.repository.UserRoleRepository;
import by.kolenchik.core.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class ManagerServiceImpl implements ManagerService {

    private UserRepository userRepository;
    private ModelMapper modelMapper;
    private UserRoleRepository userRoleRepository;

    public ManagerServiceImpl(
            UserRepository userRepository,
            ModelMapper modelMapper,
            UserRoleRepository userRoleRepository
    ) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public ManagerInfoDto add(AddManagerDto addManagerDto) {
        User manager = modelMapper.map(addManagerDto, User.class);

        UserRole managerUserRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(managerUserRole);
        manager.setRoles(userRoles);

        User managerFromDb = userRepository.save(manager);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public List<ManagerInfoDto> findAll() {
        UserRole managerRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        Set<UserRole> roles = new HashSet<>();
        roles.add(managerRole);

        List<User> managers = userRepository.findAllByRoles(roles);

        return managers.stream()
                .map(manager -> modelMapper.map(manager, ManagerInfoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto) {
        User managerFromDb = userRepository.getOne(id);

        BeanUtils.copyProperties(updateManagerDto, managerFromDb);

        User savedManager = userRepository.save(managerFromDb);

        return modelMapper.map(savedManager, ManagerInfoDto.class);
    }

    @Override
    public ManagerInfoDto findById(Long id) {
        User managerFromDb = userRepository.getOne(id);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public Boolean existsById(Long id) {
        return userRepository.existsById(id);
    }
}
