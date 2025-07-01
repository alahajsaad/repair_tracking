package com.alabenhajsaad.api.business.phone_number.external;

import java.util.List;

public interface PhoneNumberExternalService {
    boolean existsNumbers(List<String> numbers);
}
