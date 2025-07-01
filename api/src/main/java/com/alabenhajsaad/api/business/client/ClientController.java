package com.alabenhajsaad.api.business.client;

import com.alabenhajsaad.api.config.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
@Validated
public class ClientController {
    private final ClientService serviceClient ;


    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Client>> addClient(@RequestBody @Valid Client client){
        Client addedClient =  serviceClient.addClient(client) ;
        return ResponseEntity.ok(ApiResponse.success(addedClient ,"Client ajoutée avec succès."));
    }

    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<Client>>> getAllClients(){
        List<Client> clients = serviceClient.getAllClients() ;
        return ResponseEntity.ok(ApiResponse.success(clients,"liste des clients récupérée avec succès"));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Client>> getClientById(@PathVariable int id){
        Client client = serviceClient.getClientById(id) ;
        return ResponseEntity.ok(ApiResponse.success(client, "Client récupéré avec succès")) ;
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Client>>> searchClientByPhoneNumberOrName(@RequestParam String searchText){
        List<Client> clients = serviceClient.searchClientByPhoneNumberOrName(searchText) ;
        return ResponseEntity.ok(ApiResponse.success(clients));
    }
    @PutMapping("/update")
    public ResponseEntity<ApiResponse<Client>> updateClient(@RequestBody Client client){
        Client updatedClient = serviceClient.updateClient(client) ;
        return ResponseEntity.ok(ApiResponse.success(updatedClient,"Client modifié avec succès"));
    }
    @DeleteMapping("/delete/phoneNumber/{id}")
    public ResponseEntity<ApiResponse<Client>> deleteClientPhoneNumber(@PathVariable int id , @RequestParam String phoneNumber){
        Client client = serviceClient.deleteClientPhoneNumber(phoneNumber,id) ;
        return ResponseEntity.ok(ApiResponse.success(client,"Numéro de téléphone supprimé avec succès")) ;
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteClient(@PathVariable int id){
        serviceClient.delete(id);
        return ResponseEntity.ok(ApiResponse.success("Client avec l'ID : "+id+" supprimés avec succès."));
    }
}
