package com.alabenhajsaad.api.business.details;

import java.util.List;

public interface DetailsService {
    Details addDetails(Details details , int reparationId);
    List<Details> getDetailsByReparationId(int reparationId);
    Details updateDetails(Details details);
    void deleteDetails(int id) ;

}
