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
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ReparationServiceImpl implements ReparationService {
    private final ReparationRepository repository ;

    @Override
    public Reparation addReparation(Reparation reparation) {
        reparation.setEntryDate(LocalDate.now());
        reparation.setRepairStatus(RepairStatus.IN_PROGRESS);
        return repository.save(reparation) ;
    }

    @Override
    public Reparation updateReparation(Reparation reparation) {
        var oldReparation = repository.findById(reparation.getId())
                .orElseThrow(EntityNotFoundException::new);

        if (oldReparation.getRepairStatus() != reparation.getRepairStatus()) {
            oldReparation.setRepairStatus(reparation.getRepairStatus());
            if (reparation.getRepairStatus() == RepairStatus.DELIVERED) {
                oldReparation.setReleaseDate(LocalDate.now());
            }
        }

        if (!Objects.equals(oldReparation.getCustomerComplaint(), reparation.getCustomerComplaint())) {
            oldReparation.setCustomerComplaint(reparation.getCustomerComplaint());
        }

        return repository.save(oldReparation);
    }


    @Override
    public Reparation getReparationByCallNumber(String callNumber) {
        return repository.findReparationByCallNumber(callNumber);
    }
    @Override
    public Page<Reparation> getReparations(
            Integer partnerId,
            Integer machineId,
            RepairStatus status,
            LocalDate fromDate,
            LocalDate toDate,
            Pageable pageable)
    {
        Specification<Reparation> spec = Specification
                .where(ReparationSpecification.hasPartnerId(partnerId))
                .and(ReparationSpecification.hasMachineId(machineId))
                .and(ReparationSpecification.hasStatus(status))
                .and(ReparationSpecification.hasDate(fromDate,toDate)) ;

        if (pageable.getSort().isUnsorted()) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(Sort.Direction.DESC, "id"));
        }

        return repository.findAll(spec, pageable);
    }
    @Override
    public Reparation getReparationById(Integer id) {
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

    @Override
    public String getCallNumber() {
        return CodeGenerator.generateNewCallNumber(repository.findLastCallNumber());
    }


}
