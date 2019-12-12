package by.kolenchik.core.user.manager.service;

import by.kolenchik.core.user.User;
import by.kolenchik.core.user.UserRole;
import by.kolenchik.core.user.UserRoleEnum;
import by.kolenchik.core.user.exception.DuplicateEmailException;
import by.kolenchik.core.user.manager.dto.AddManagerDto;
import by.kolenchik.core.user.manager.dto.ManagerInfoDto;
import by.kolenchik.core.user.manager.dto.UpdateManagerDto;
import by.kolenchik.core.user.exception.UserNotFoundException;
import by.kolenchik.core.user.repository.UserRepository;
import by.kolenchik.core.user.repository.UserRoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;


@Service
public class ManagerServiceImpl implements ManagerService {
    private UserRepository userRepository;
    private UserRoleRepository userRoleRepository;
    private ModelMapper modelMapper;

    @Autowired
    public ManagerServiceImpl(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            ModelMapper modelMapper
            ) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ManagerInfoDto add(AddManagerDto addManagerDto) {
        validateAdd(addManagerDto);

        User manager = modelMapper.map(addManagerDto, User.class);

        UserRole managerUserRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        Set<UserRole> userRoles = new HashSet<>();
        userRoles.add(managerUserRole);
        manager.setRoles(userRoles);

        User managerFromDb = userRepository.save(manager);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public Page<ManagerInfoDto> findAll(Pageable pageable) {
        UserRole managerRole = userRoleRepository.findByDesignation(UserRoleEnum.MANAGER.name());
        Set<UserRole> roles = new HashSet<>();
        roles.add(managerRole);

        Page<User> managers = userRepository.findAllByRolesAndDeleteDateIsNull(roles, pageable);

        return managers.map(manager ->  modelMapper.map(manager, ManagerInfoDto.class));
    }

    @Override
    public void deleteById(Long id) {
        userRepository.delete(id);
    }

    @Override
    public ManagerInfoDto update(Long id, UpdateManagerDto updateManagerDto) {
        validateUpdate(updateManagerDto);

        User managerFromDb = userRepository.findByIdAndDeleteDateIsNull(id);

        BeanUtils.copyProperties(updateManagerDto, managerFromDb);

        User savedManager = userRepository.save(managerFromDb);

        return modelMapper.map(savedManager, ManagerInfoDto.class);
    }

    @Override
    public ManagerInfoDto findById(Long id) {
        validateGet(id);

        User managerFromDb = userRepository.findByIdAndDeleteDateIsNull(id);

        return modelMapper.map(managerFromDb, ManagerInfoDto.class);
    }

    @Override
    public Boolean existsByIdAndDeleteDateIsNull(Long id) {
        return userRepository.existsByIdAndDeleteDateIsNull(id);
    }

    @Override
    public void deleteAll(Long[] ids) {
        for (Long id : ids) {
            userRepository.delete(id);
        }
    }

    @Override
    public User findUserByIdAndDeleteDateIsNull(Long id) {
        validateGet(id);

        return userRepository.findByIdAndDeleteDateIsNull(id);
    }

    private void validateGet(Long id) {
        if (!userRepository.existsByIdAndDeleteDateIsNull(id)) {
            throw new UserNotFoundException("Manager with id=%d was not found", id);
        }
    }

    private void validateAdd(AddManagerDto addManagerDto) {
        if (userRepository.existsByEmail(addManagerDto.getEmail())) {
            throw new DuplicateEmailException("Email=%s already exists", addManagerDto.getEmail());
        }
    }

    private void validateUpdate(UpdateManagerDto updateManagerDto) {
        if (!userRepository.existsByIdAndDeleteDateIsNull(updateManagerDto.getId())) {
            throw new UserNotFoundException("Manager with id=%d was not found", updateManagerDto.getId());
        }
    }
}
