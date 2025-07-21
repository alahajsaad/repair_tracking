import { Badge } from "@/components/ui/shadcn/badge";
import { Reparation } from "@/services/api/reparation/types";
import { getPartnerName, getStatusStyle, getStatusText } from "./utils";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import UpdateReparationForm from "../forms/UpdateReparationForm";
import { Button } from "@/components/ui";
import useReparationReportPdf from "../hooks/useReparationReportPdf";

type ReparationGeneralInfoProps = {
    reparation: Reparation | undefined;
};

const ReparationGeneralInfo: React.FC<ReparationGeneralInfoProps> = ({ reparation }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    //const { data: pdfBlob, isLoading, error  } = useGetReparationReport(reparation?.id ?? 0);
    const { isLoading, error ,setSelectedReparation } = useReparationReportPdf(); 
    
    const formatDate = (date: string | null) => {
        if (!date) return "Non définie";
        return new Date(date).toLocaleDateString('fr-FR');
    };

    const onUpdateSuccess = () => {
        setIsUpdating(false);
    };

     const handleClickPdfButton = (reparation: Reparation) => {
        setSelectedReparation(reparation); 
    };
   

    if (!reparation) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-500">Chargement des informations...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Réparation #{reparation.callNumber}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">Informations générales</p>
                </div>
                <Button onClick={() => setIsUpdating(true)}>Modifier</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-md p-4">
                        <h3 className="font-medium text-gray-900 mb-2">Problème signalé</h3>
                        <p className="text-gray-700">{reparation.customerComplaint}</p>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Date d'entrée</span>
                            <span className="text-sm text-gray-900">{formatDate(reparation.entryDate)}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Date de sortie</span>
                            <span className="text-sm text-gray-900">
                                {reparation.releaseDate ? formatDate(reparation.releaseDate) : "Non terminé"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Statut</span>
                            <Badge className={getStatusStyle(reparation.repairStatus)}>
                                {getStatusText(reparation.repairStatus)}
                            </Badge>
                        </div>

                        <Button 
                           onClick={() => handleClickPdfButton(reparation)} disabled={isLoading}
                        >
                            {isLoading ? "Génération..." : "Voir fiche de réparation"}
                        </Button>
                        {error && <p className="text-red-500 text-sm mt-2">Erreur : {error.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-blue-50 rounded-md p-4">
                        <h3 className="font-medium text-blue-900 mb-3">Machine</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-700">Désignation</span>
                                <span className="text-sm text-blue-900">{reparation.machine.designation}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-blue-700">Référence</span>
                                <span className="text-sm text-blue-900">{reparation.machine.reference}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-green-50 rounded-md p-4">
                        <h3 className="font-medium text-green-900 mb-3">Client</h3>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-green-700">Nom</span>
                                <span className="text-sm text-green-900">{getPartnerName(reparation.machine.partner)}</span>
                            </div>

                            {reparation.machine.partner.phoneNumbers?.length > 0 && (
                                <div>
                                    <span className="text-sm font-medium text-green-700 block mb-1">Téléphones</span>
                                    <div className="space-y-1">
                                        {reparation.machine.partner.phoneNumbers.map((phone, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="text-sm text-green-900 bg-white px-2 py-1 rounded border">
                                                    {phone.number}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Mettre à jour la réparation"
                isOpen={isUpdating}
                onClose={() => setIsUpdating(false)}
                size="md"
            >
                <UpdateReparationForm onUpdateSuccess={onUpdateSuccess} initialReparation={reparation} />
            </Modal>
        </div>
    );
};

export default ReparationGeneralInfo;
