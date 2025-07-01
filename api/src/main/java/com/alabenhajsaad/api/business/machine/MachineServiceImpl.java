package com.alabenhajsaad.api.business.machine;


import com.alabenhajsaad.api.business.reparation.Reparation;
import com.alabenhajsaad.api.business.reparation.ReparationService;
import com.alabenhajsaad.api.exception.ConflictException;
import com.alabenhajsaad.api.exception.DeleteDeniedException;
import com.alabenhajsaad.api.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineServiceImpl implements MachineService {
    private final MachineRepository repository ;
    private final ReparationService reparationService;

    @Override
    public Machine addMachine(Machine machine) {
        if(repository.existsByReference(machine.getReference())){
            throw new ConflictException("Cette machine existe déjà.") ;
        }
        return repository.save(machine);
    }

    @Override
    public Machine updateMachine(Machine machine) {
        if (!repository.existsById(machine.getId())) {
            throw new ResourceNotFoundException("Machine with ID " + machine.getId() + " does not exist");
        }
        return repository.save(machine);
    }

    @Override
    public Machine getMachineById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Machine with ID " + id + " does not exist")
        );
    }

    @Override
    public List<Machine> getMachinesByClientID(int id) {
        return repository.findMachinesByClientId(id);
    }

    public void deleteMachineById(Integer id) {
        List<Reparation> reparations = reparationService.getReparationByMachineId(id);
        if (!reparations.isEmpty()) {
            throw new DeleteDeniedException("La machine avec l'ID " + id + " ne peut pas être supprimée. Des réparations lui sont associées.");
        } else {
            repository.deleteById(id);
        }
    }

}
