package com.alabenhajsaad.api.business.reparation_details;

import java.util.List;

public interface ReparationDetailsService {
    ReparationDetail addDetail(ReparationDetail detail , int reparationId);
    List<ReparationDetail> getDetailsByReparationId(int reparationId);
    ReparationDetail updateDetails(ReparationDetail details);
    void deleteDetails(int id) ;

}
