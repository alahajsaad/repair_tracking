package com.alabenhajsaad.api.business.machine;

import com.alabenhajsaad.api.business.reparation.RepairStatus;
import com.alabenhajsaad.api.business.reparation.Reparation;
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
@RequestMapping("api/v1/machine")
public class MachineController {
    private final MachineService machineService ;
    @PostMapping()
    public ResponseEntity<ApiResponse<Machine>> addMachine(@RequestBody Machine machine) {
        Machine addedMachine = machineService.addMachine(machine);
        return ResponseEntity.ok(ApiResponse.success(addedMachine, "Machine ajoutée avec succès."));
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<Machine>> updateMachine(@RequestBody Machine machine){
        Machine updatedMachine = machineService.updateMachine(machine) ;
        return ResponseEntity.ok(ApiResponse.success(updatedMachine, "Machine modifier avec succès."));
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Machine>> getMachineById(@PathVariable int id){
        Machine machine =  machineService.getMachineById(id) ;
        return ResponseEntity.ok(ApiResponse.success(machine)) ;
    }

    @GetMapping("client/{id}")
    public  ResponseEntity<ApiResponse<List<Machine>>> getMachinesByClientId(@PathVariable int id){
        List<Machine> machines =  machineService.getMachinesByClientID(id) ;
        return ResponseEntity.ok(ApiResponse.success(machines)) ;
    }

    @GetMapping()
    public Page<Machine> getMachines(
            @RequestParam(required = false) Integer partnerId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return machineService.getReparations(partnerId,pageable);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMachine(@PathVariable Integer id){
        machineService.deleteMachineById(id);
        return ResponseEntity.ok(ApiResponse.success("Machine avec l'ID : "+id+" supprimés avec succès."));
    }
    @GetMapping("/statistics")
    public ResponseEntity<Long> getPartnerById() {
        return ResponseEntity.ok(machineService.getMachineCount());
    }
}
