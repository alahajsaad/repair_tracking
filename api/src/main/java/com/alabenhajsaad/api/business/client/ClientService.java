package com.alabenhajsaad.api.business.client;

import java.util.List;

public interface ClientService {
    Client addClient(Client client) ;
    Client updateClient(Client client) ;
    List<Client> searchClientByPhoneNumberOrName(String searchText) ;
    List<Client> getAllClients () ;
    Client getClientById(int id) ;
    Client deleteClientPhoneNumber(String phoneNumber , int ClientId) ;
    void delete(int id) ;
}
