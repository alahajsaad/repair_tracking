package com.alabenhajsaad.api.business.details;


import com.alabenhajsaad.api.business.reparation.Reparation;
import com.alabenhajsaad.api.business.reparation.ReparationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DetailsServiceImpl implements DetailsService {
    private final DetailsRepository repository;
    private final ReparationService reparationService;

    @Override
    public Details addDetails(Details details, int reparationId) {
        Reparation reparation = reparationService.getReparationById(reparationId);
        details.setReparation(reparation);
        return repository.save(details);
    }

    @Override
    public List<Details> getDetailsByReparationId(int reparationId) {
        return repository.findByReparationId(reparationId);
    }

    @Override
    @Transactional
    public Details updateDetails(Details details) {
        Details existingDetail = repository.findById(details.getId())
                .orElseThrow(() -> new EntityNotFoundException("Details with ID " + details.getId() + " cannot be found"));

        existingDetail.setDescription(details.getDescription());
        existingDetail.setPrice(details.getPrice());
        return repository.save(existingDetail);
    }

    @Override
    public void deleteDetails(int id) {
       repository.deleteById(id);
    }
}
