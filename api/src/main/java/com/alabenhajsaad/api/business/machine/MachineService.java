package com.alabenhajsaad.api.business.machine;

import java.util.List;

public interface MachineService {
    Machine addMachine(Machine machine) ;
    Machine updateMachine(Machine machine) ;
    Machine getMachineById(int id) ;
    List<Machine> getMachinesByClientID(int id) ;
    void deleteMachineById(Integer id);

}
