package com.alabenhajsaad.api.business.reparation;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/reparation")
public class ReparationController {
    private final ReparationService reparationService ;

    @GetMapping("/callNumber")
    public ResponseEntity<ApiResponse<String>> getCallNumber(){
        return ResponseEntity.ok(ApiResponse.success(reparationService.getCallNumber(),"nouveau numéro d'appel généré avec succès"));
    }
    @PostMapping()
    public ResponseEntity<ApiResponse<Reparation>> addReparation(@RequestBody Reparation reparation){
        return ResponseEntity.ok(ApiResponse.success(reparationService.addReparation(reparation),"Réparation ajoutée avec succès."));
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<Reparation>> updateReparation(@RequestBody Reparation reparation){
        return ResponseEntity.ok(ApiResponse.success(reparationService.updateReparation(reparation),"Réparation mise à jour avec succès."));
    }

    @GetMapping("/byCallNumber/{callNumber}")
    public ResponseEntity<ApiResponse<Reparation>> getReparationByCallNumber(@PathVariable String callNumber) {
        Reparation reparation = reparationService.getReparationByCallNumber(callNumber);
        String message = "Réparation récupérée avec succès avec le numéro d'appel : " + callNumber;
        return ResponseEntity.ok(ApiResponse.success(reparation, message));
    }

    @GetMapping()
    public Page<Reparation> getReparations(
            @RequestParam(required = false) Integer partnerId,
            @RequestParam(required = false) Integer machineId,
            @RequestParam(required = false) RepairStatus repairStatus ,
            @RequestParam(required = false) LocalDate fromDate,
            @RequestParam(required = false) LocalDate toDate ,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return reparationService.getReparations(partnerId,machineId,repairStatus,fromDate,toDate,pageable);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Reparation>> getReparationById(@PathVariable int id){
        Reparation reparation = reparationService.getReparationById(id) ;
        return ResponseEntity.ok(ApiResponse.success(reparation,"Réparation récupérée avec succès avec l'ID :"+id));
    }
    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReparation(@PathVariable Integer id){
        reparationService.deleteReparation(id);
        return ResponseEntity.ok(ApiResponse.success("Réparation supprimée avec succès."));
    }
    @GetMapping("/statistics")
    public ResponseEntity<Long> getPartnerById() {
        return ResponseEntity.ok(reparationService.getReparationCount());
    }
    @GetMapping("/shouldBeDelivered")
    public ResponseEntity<List<Reparation>> getShouldBeDeliveredReparations() {
        return ResponseEntity.ok(reparationService.getShouldBeDeliveredReparations());
    }
    @PostMapping("/delivered/{id}")
    public ResponseEntity<ApiResponse<Void>> setDeliveredReparation(@PathVariable Integer id) {
        reparationService.deliverReparation(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Réparation bien livrée."));
    }



}
