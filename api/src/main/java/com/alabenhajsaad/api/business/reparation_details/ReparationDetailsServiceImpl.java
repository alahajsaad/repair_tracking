package com.alabenhajsaad.api.business.reparation_details;


import com.alabenhajsaad.api.business.reparation.Reparation;
import com.alabenhajsaad.api.business.reparation.ReparationService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReparationDetailsServiceImpl implements ReparationDetailsService {
    private final ReparationDetailsRepository repository;
    private final ReparationService reparationService;

    @Override
    public ReparationDetail addDetail(ReparationDetail detail, int reparationId) {
        Reparation reparation = reparationService.getReparationById(reparationId);
        detail.setReparation(reparation);
        return repository.save(detail);
    }

    @Override
    public List<ReparationDetail> getDetailsByReparationId(int reparationId) {
        return repository.findByReparationId(reparationId);
    }

    @Override
    @Transactional
    public ReparationDetail updateDetails(ReparationDetail details) {
        ReparationDetail existingDetail = repository.findById(details.getId())
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
