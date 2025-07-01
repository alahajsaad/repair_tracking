package com.alabenhajsaad.api.business.machine.dto;

import jakarta.validation.constraints.NotNull;


public record MachineDto(String reference,
                         String designation,
                         @NotNull int ClientId) {
}
