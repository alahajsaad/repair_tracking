package com.alabenhajsaad.api.business.reparation_details;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/reparationDetails")
public class ReparationDetailsController {
    private final ReparationDetailsService serviceDetails;

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<ReparationDetails>> addDetails(@RequestBody ReparationDetails details, @PathVariable int id) {
        ReparationDetails addedDetail = serviceDetails.addDetails(details,id);
        return ResponseEntity.ok(ApiResponse.success(addedDetail ,"Nouveaux détails ajoutés avec succès."));
    }

    @GetMapping("/byReparationId/{id}")
    public ResponseEntity<ApiResponse<List<ReparationDetails>>> getDetailsByReparationId(@PathVariable int id) {
        List<ReparationDetails> details = serviceDetails.getDetailsByReparationId(id);
        return ResponseEntity.ok(ApiResponse.success(details ,"Détails de la réparation avec l'ID : "+id+" récupérés avec succès."));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<ReparationDetails>> updateDetails(@RequestBody ReparationDetails details) {
        ReparationDetails updatedDetail = serviceDetails.updateDetails(details);
        return ResponseEntity.ok(ApiResponse.success(updatedDetail,"Détail mis à jour avec succès."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDetails(@PathVariable Integer id) {
        serviceDetails.deleteDetails(id);
        return ResponseEntity.ok(ApiResponse.success("Détails avec l'ID : "+id+" supprimés avec succès."));
    }
}
