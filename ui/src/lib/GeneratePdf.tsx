import { pdf } from "@react-pdf/renderer";
import RepairReport from "@/components/pdf/RepairReport";

import { getReparationById } from "@/services/api/reparation/api";
import { getCompany, getCompanyLogo } from "@/services/api/company/api";

export const handleGenerateRepairReportPdf = async (reparationId: number) => {
  try {
    const { data: reparationDetails } = await getReparationById(reparationId);
    const { data: companyDetails } = await getCompany();

    // Ensure data is not null
    if (!reparationDetails || !companyDetails) {
      throw new Error("Données manquantes pour générer le rapport PDF.");
    }

   // const logoBlob = await getCompanyLogo(companyDetails.logoUrl || '');

    const blob = await pdf(
      <RepairReport
        reparationDetails={reparationDetails}
        companyDetails={companyDetails}
      
      />
    ).toBlob();

    const pdfWindow = window.open('', '_blank');
    if (pdfWindow) {
      const url = URL.createObjectURL(blob);
      pdfWindow.location.href = url;
    }
  } catch (error) {
    console.error("Erreur de génération du PDF :", error);
  }
};

