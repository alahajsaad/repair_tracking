package com.alabenhajsaad.api.business.machine;

import com.alabenhajsaad.api.config.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/machine")
public class MachineController {
    private final MachineService serviceMachine ;
    @PostMapping()
    public ResponseEntity<ApiResponse<Machine>> addMachine(@RequestBody Machine machine) {
        Machine addedMachine = serviceMachine.addMachine(machine);
        return ResponseEntity.ok(ApiResponse.success(addedMachine, "Machine ajoutée avec succès."));
    }

    @PutMapping()
    public ResponseEntity<ApiResponse<Machine>> updateMachine(@RequestBody Machine machine){
        Machine updatedMachine = serviceMachine.updateMachine(machine) ;
        return ResponseEntity.ok(ApiResponse.success(updatedMachine, "Machine modifier avec succès."));
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiResponse<Machine>> getMachineById(@PathVariable int id){
        Machine machine =  serviceMachine.getMachineById(id) ;
        return ResponseEntity.ok(ApiResponse.success(machine)) ;
    }

    @GetMapping("client/{id}")
    public  ResponseEntity<ApiResponse<List<Machine>>> getMachinesByClientId(@PathVariable int id){
        List<Machine> machines =  serviceMachine.getMachinesByClientID(id) ;
        return ResponseEntity.ok(ApiResponse.success(machines)) ;
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMachine(@PathVariable Integer id){
        serviceMachine.deleteMachineById(id);
        return ResponseEntity.ok(ApiResponse.success("Machine avec l'ID : "+id+" supprimés avec succès."));
    }
}
