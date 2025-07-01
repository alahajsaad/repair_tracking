package com.alabenhajsaad.api.business.phone_number.external;

import com.alabenhajsaad.api.business.phone_number.PhoneNumberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PhoneNumberExternalServiceImpl implements PhoneNumberExternalService{
    private final PhoneNumberRepository repository;

    @Override
    public boolean existsNumbers(List<String> numbers) {
        return repository.existsByNumberIn(numbers);
    }
}
