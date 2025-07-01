package com.alabenhajsaad.api.business.reparation;

import com.alabenhajsaad.api.code_generator.CallNumberGeneratorService;
import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reparation/")
public class ReparationController {
    private final ReparationService serviceReparation ;

//    @GetMapping("/callNumber")
//    public ResponseEntity<ApiResponse<String>> getCallNumber(){
//        String callNumber = callNumberGeneratorService.generateNewCallNumber() ;
//        return ResponseEntity.ok(ApiResponse.success(callNumber,"nouveau numéro d'appel généré avec succès"));
//    }
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<String>> addReparation(@RequestBody Reparation reparation){
        String callNumber = serviceReparation.addReparation(reparation) ;
        return ResponseEntity.ok(ApiResponse.success(callNumber,"Réparation ajoutée avec succès et nouveau numéro d'appel généré avec succès."));
    }
    @GetMapping("/byCallNumber")
    public ResponseEntity<ApiResponse<Reparation>> getReparationByCallNumber(String callNumber){
        Reparation reparation = serviceReparation.getReparationByCallNumber(callNumber) ;
        return ResponseEntity.ok(ApiResponse.success(reparation,"Réparation récupérée avec succès avec le numéro d'appel :"+callNumber));
    }
    @GetMapping("/filtred")
    public Page<Reparation> getFiltredReparations(
            @RequestParam(required = false) String MachineRef,
            @RequestParam(required = false) String ClientPhoneNumber ,

            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return serviceReparation.getFiltredReparations( MachineRef, ClientPhoneNumber, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Reparation>> getReparationById(@PathVariable int id){
        Reparation reparation = serviceReparation.getReparationById(id) ;
        return ResponseEntity.ok(ApiResponse.success(reparation,"Réparation récupérée avec succès avec l'ID :"+id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteReparation(@PathVariable Integer id){
        serviceReparation.deleteReparation(id);
        return ResponseEntity.ok(ApiResponse.success("Réparation supprimée avec succès."));
    }


}
