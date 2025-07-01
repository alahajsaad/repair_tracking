package com.alabenhajsaad.api.business.client;


import com.alabenhajsaad.api.business.phone_number.external.PhoneNumberExternalService;
import com.alabenhajsaad.api.exception.ConflictException;
import com.alabenhajsaad.api.exception.DeleteDeniedException;
import com.alabenhajsaad.api.business.machine.MachineService;
import com.alabenhajsaad.api.business.machine.Machine;
import com.alabenhajsaad.api.business.phone_number.PhoneNumber;
import com.alabenhajsaad.api.exception.ResourceNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository repository ;
    private final MachineService machineService ;
    private final PhoneNumberExternalService phoneNumberService;

    @Override
    @Transactional
    public Client addClient(Client client) {
        validatePhoneNumbers(client, false);

        if (client.getPhoneNumbers() != null) {
            client.getPhoneNumbers().forEach(phoneNumber -> phoneNumber.setClient(client));
        }

        return repository.save(client);
    }

    @Override
    @Transactional
    public Client updateClient(Client client) {
        validatePhoneNumbers(client, true);

        if (client.getPhoneNumbers() != null) {
            client.getPhoneNumbers().forEach(phoneNumber -> phoneNumber.setClient(client));
        }

        return repository.save(client);
    }

    private void validatePhoneNumbers(Client client, boolean isUpdate) {
        List<String> numberList = Optional.ofNullable(client.getPhoneNumbers())
                .orElse(List.of())
                .stream()
                .map(PhoneNumber::getNumber)
                .toList();

        if (numberList.isEmpty()) {
            return;
        }

        for (String number : numberList) {
            Optional<Client> existingClient = repository.findClientByPhoneNumber(number);

            if (existingClient.isPresent()) {
                if (!isUpdate || !existingClient.get().getId().equals(client.getId())) {
                    throw new ConflictException("A client already exists with phone number: " + number);
                }
            }
        }
    }


    @Override
    public List<Client> searchClientByPhoneNumberOrName(String searchText) {
        if (searchText == null || searchText.isEmpty()) {
            return List.of();
        }
        // Nettoyage de l'entrée pour les numéros de téléphone
        String cleanedSearchText = searchText.replaceAll("[^\\d]", ""); // Supprimer tout sauf les chiffres
        Pageable pageable = PageRequest.of(0, 5);

        if (isPhoneNumber(cleanedSearchText)) {
            return repository.findByPhoneNumbersStartingWith(cleanedSearchText, pageable).getContent();
        } else {
            return repository.searchByName(searchText, pageable).getContent();
        }
    }

    private boolean isPhoneNumber(String field) {
        return field.matches("\\d+") ;
    }

    @Override
    public List<Client> getAllClients() {
        return repository.findAll();
    }

    @Override
    public void delete(int clientId) {
        List<Machine> machines = machineService.getMachinesByClientID(clientId);
        if (!machines.isEmpty()) {
            throw new DeleteDeniedException("Le client avec l'ID " + clientId + " ne peut pas être supprimé. Des machines lui sont associées.");

        } else {
            repository.deleteById(clientId);
        }

    }

    @Override
    public Client getClientById(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Le client avec l'ID " + id + " n'existe pas"));
    }


    @Override
    public Client deleteClientPhoneNumber(String phoneNumber, int clientId) {
        repository.deleteClientPhoneNumber(phoneNumber,clientId);
        return getClientById(clientId) ;
    }


}
