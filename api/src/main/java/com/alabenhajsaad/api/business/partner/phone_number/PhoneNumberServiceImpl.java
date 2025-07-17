package com.alabenhajsaad.api.business.partner.phone_number;

import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhoneNumberServiceImpl implements PhoneNumberService {
    private final PhoneNumberRepository repository;
    @Override
    public void deletePhoneNumber(Long id) {
        repository.deleteById(id);
    }


    @Override
    public Optional<PhoneNumber> findByNumber(String number) {
        return repository.findByNumber(number);
    }

    @Override
    public void updatePhoneNumber(Long id, String number) {
        var phone = repository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Phone number not found")
        );
        phone.setNumber(number);
        repository.save(phone);
    }
}
