package com.alabenhajsaad.api.business.reparation;


import com.alabenhajsaad.api.business.reparation.specification.ReparationSpecification;
import com.alabenhajsaad.api.code_generator.CodeGenerator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReparationServiceImpl implements ReparationService {
    private final ReparationRepository repository ;
    private final ReparationSpecification reparationSpecification ;

    @Override
    public String addReparation(Reparation reparation) {
       reparation.setEntryDate(LocalDate.now());
       reparation.setState(RepairState.IN_PROGRESS);
        repository.save(reparation);
        return CodeGenerator.generateNewCallNumber(repository.findLastCallNumber()) ;
    }


    @Override
    public Reparation getReparationByCallNumber(String callNumber) {
        return repository.findReparationByCallNumber(callNumber);
    }
    @Override
    public Page<Reparation> getFiltredReparations(
            String machineRef,
            String clientPhoneNumber,
            Pageable pageable)
    {
        Specification<Reparation> spec = Specification
                .where(reparationSpecification.hasClientPhoneNumber(clientPhoneNumber))
                .and(reparationSpecification.hasMachineReference(machineRef)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(spec, pageable);
    }
    @Override
    public Reparation getReparationById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reparation not found for ID: " + id));
    }


    @Override
    public List<Reparation> getReparationByMachineId(Integer id) {
        return repository.findReparationByMachineId(id);
    }

    @Override
    public void deleteReparation(Integer id) {
        repository.deleteById(id);
    }


}
