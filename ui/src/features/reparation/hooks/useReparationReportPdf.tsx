import { Reparation } from "@/services/api/reparation/types";
import { useGetReparationReport } from "@/services/pdfService";
import { useCallback, useEffect, useState } from "react";



function useReparationReportPdf() {
    const [reparation,setReparation] = useState<Reparation>()
    const { data: pdfBlob, isLoading, error } = useGetReparationReport(reparation?.id);

    const setSelectedReparation = useCallback((reparation : Reparation)=>{
        setReparation(reparation)
    },[])
    useEffect(() => {
        if (pdfBlob) {
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            window.open(blobUrl, "_blank", "noopener,noreferrer");
            setReparation(undefined)
        }
    }, [pdfBlob]); 

    return { isLoading, error ,setSelectedReparation};
}

export default useReparationReportPdf;
