package com.alabenhajsaad.api.business.reparation_details;

import java.util.List;

public interface ReparationDetailsService {
    ReparationDetails addDetails(ReparationDetails details , int reparationId);
    List<ReparationDetails> getDetailsByReparationId(int reparationId);
    ReparationDetails updateDetails(ReparationDetails details);
    void deleteDetails(int id) ;

}
