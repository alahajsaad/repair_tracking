package com.alabenhajsaad.api.business.reparation.dto;

import jakarta.validation.constraints.NotNull;

public record ReparationDto(@NotNull int machineId,
                            String callNumber,
                            String description) {
}
