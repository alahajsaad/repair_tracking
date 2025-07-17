import { GetReparationParams } from "@/services/api/reparation/types";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useReparationFilters() {

    

    
    const [searchParams, setSearchParams] = useSearchParams();
    
   
    // Extract and convert parameters
   const fromDate = searchParams.get('fromDate') ?? undefined;
const toDate = searchParams.get('toDate') ?? undefined;

    const repairStatus = searchParams.get('repairStatus') as GetReparationParams['repairStatus'];
    const partnerId = searchParams.get('partnerId') ? parseInt(searchParams.get('partnerId') as string) : undefined;
    const machineId = searchParams.get('machineId') ? parseInt(searchParams.get('machineId') as string) : undefined;
    const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size') as string) : 8;

    // Individual setter functions
    const setFromDate = useCallback((date: string | undefined) => {
        setSearchParams((params) => {
            if (date !== undefined) {
                params.set('fromDate',  date);
            } else {
                params.delete('fromDate');
            }
            return params;
        });
    }, [setSearchParams]);

    const setToDate = useCallback((date: string | undefined) => {
        setSearchParams((params) => {
            if (date !== undefined) {
                params.set('toDate', date);
            } else {
                params.delete('toDate');
            }
            return params;
        });
    }, [setSearchParams]);

    const setRepairStatus = useCallback((status: GetReparationParams['repairStatus']) => {
        setSearchParams((params) => {
            if (status !== undefined) {
                params.set('repairStatus', status);
            } else {
                params.delete('repairStatus');
            }
            return params;
        });
    }, [setSearchParams]);

    const setPartnerId = useCallback((id: number | undefined) => {
        setSearchParams((params) => {
            if (id !== undefined) {
                params.set('partnerId', id.toString());
            } else {
                params.delete('partnerId');
            }
            return params;
        });
    }, [setSearchParams]);

    const setMachineId = useCallback((id: number | undefined) => {
        setSearchParams((params) => {
            if (id !== undefined) {
                params.set('machineId', id.toString());
            } else {
                params.delete('machineId');
            }
            return params;
        });
    }, [setSearchParams]);

    const setPage = useCallback((pageNum: number | undefined) => {
        setSearchParams((params) => {
            if (pageNum !== undefined) {
                params.set('page', pageNum.toString());
            } else {
                params.delete('page');
            }
            return params;
        });
    }, [setSearchParams]);

    const setSize = useCallback((sizeNum: number | undefined) => {
        setSearchParams((params) => {
            if (sizeNum !== undefined) {
                params.set('size', sizeNum.toString());
            } else {
                params.delete('size');
            }
            return params;
        });
    }, [setSearchParams]);

    const reset = useCallback(() => {
        setSearchParams((params) => {
            params.delete('fromDate');
            params.delete('toDate');
            params.delete('repairStatus');
            params.delete('partnerId');
            params.delete('machineId');
            params.set('page', '0');
            params.set('size', '8');
            return params;
        });
    }, [setSearchParams]);

    return {
        fromDate,
        toDate,
        repairStatus,
        partnerId,
        machineId,
        page,
        size,
        setFromDate,
        setToDate,
        setRepairStatus,
        setPartnerId,
        setMachineId,
        setPage,
        setSize,
        reset
    };
}