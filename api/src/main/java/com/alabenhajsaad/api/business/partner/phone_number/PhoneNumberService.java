package com.alabenhajsaad.api.business.partner.phone_number;

import java.util.Optional;

public interface PhoneNumberService {
    void deletePhoneNumber(Long id);
    Optional<PhoneNumber> findByNumber(String number);
    void updatePhoneNumber(Long id, String number);

}
