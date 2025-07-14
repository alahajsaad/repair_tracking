package com.alabenhajsaad.api.business.reparation_details;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/details")
public class ReparationDetailsController {
    private final ReparationDetailsService serviceDetails;

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<ReparationDetail>> addDetails(@RequestBody ReparationDetail detail, @PathVariable int id) {
        ReparationDetail addedDetail = serviceDetails.addDetail(detail,id);
        return ResponseEntity.ok(ApiResponse.success(addedDetail ,"Nouveaux détails ajoutés avec succès."));
    }

    @GetMapping("reparation/{id}")
    public ResponseEntity<ApiResponse<List<ReparationDetail>>> getDetailsByReparationId(@PathVariable int id) {
        List<ReparationDetail> details = serviceDetails.getDetailsByReparationId(id);
        return ResponseEntity.ok(ApiResponse.success(details ,"Détails de la réparation avec l'ID : "+id+" récupérés avec succès."));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ReparationDetail>> updateDetails(@RequestBody ReparationDetail details) {
        ReparationDetail updatedDetail = serviceDetails.updateDetails(details);
        return ResponseEntity.ok(ApiResponse.success(updatedDetail,"Détail mis à jour avec succès."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDetails(@PathVariable Integer id) {
        serviceDetails.deleteDetails(id);
        return ResponseEntity.ok(ApiResponse.success("Détails avec l'ID : "+id+" supprimés avec succès."));
    }
}
