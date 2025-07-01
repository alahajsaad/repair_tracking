package com.alabenhajsaad.api.business.details;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/reparationDetails")
public class DetailsController {
    private final DetailsService serviceDetails;

    @PostMapping("/{id}")
    public ResponseEntity<ApiResponse<Details>> addDetails(@RequestBody Details details, @PathVariable int id) {
        Details addedDetail = serviceDetails.addDetails(details,id);
        return ResponseEntity.ok(ApiResponse.success(addedDetail ,"Nouveaux détails ajoutés avec succès."));
    }

    @GetMapping("/byReparationId/{id}")
    public ResponseEntity<ApiResponse<List<Details>>> getDetailsByReparationId(@PathVariable int id) {
        List<Details> details = serviceDetails.getDetailsByReparationId(id);
        return ResponseEntity.ok(ApiResponse.success(details ,"Détails de la réparation avec l'ID : "+id+" récupérés avec succès."));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<Details>> updateDetails(@RequestBody Details details) {
        Details updatedDetail = serviceDetails.updateDetails(details);
        return ResponseEntity.ok(ApiResponse.success(updatedDetail,"Détail mis à jour avec succès."));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteDetails(@PathVariable Integer id) {
        serviceDetails.deleteDetails(id);
        return ResponseEntity.ok(ApiResponse.success("Détails avec l'ID : "+id+" supprimés avec succès."));
    }
}
