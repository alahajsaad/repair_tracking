import { Reparation } from "@/services/api/reparation/types";
import { useGetReparationReport, useGetReparationTicket } from "@/services/pdfService";
import { useEffect, useState } from "react";



// Hook for report PDF
export function useReparationReport() {
    const [reparation, setReparation] = useState<Reparation>();
    const { data: pdfBlob, isLoading, error } = useGetReparationReport(reparation?.id);
    
    const generateReport =(reparation: Reparation) => {
        setReparation(reparation);
       
    };
    
    useEffect(() => {
        if (pdfBlob) {
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            window.open(blobUrl, "_blank", "noopener,noreferrer");
            setReparation(undefined);
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        }
    }, [pdfBlob]);
    
    return { isLoading, error, generateReport };
}

// Hook for ticket PDF
export function useReparationTicket() {
    const [reparation, setReparation] = useState<Reparation>();
    const { data: pdfBlob, isLoading, error } = useGetReparationTicket(reparation?.id);
    
    const generateTicket = (reparation: Reparation) => {
        setReparation(reparation);
    };
    
    useEffect(() => {
        if (pdfBlob) {
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            window.open(blobUrl, "_blank", "noopener,noreferrer");
            setReparation(undefined);
            setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        }
    }, [pdfBlob]);
    
    return { isLoading, error, generateTicket };
}




