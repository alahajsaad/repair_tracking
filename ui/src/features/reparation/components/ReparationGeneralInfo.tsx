import { Badge } from "@/components/ui/shadcn/badge";
import { Reparation } from "@/services/api/reparation/types";
import { getPartnerName, getStatusStyle, getStatusText } from "./utils";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import UpdateReparationForm from "../forms/UpdateReparationForm";
import { Button } from "@/components/ui";
import { SquarePen, FileText, Calendar, User, Wrench, Package, AlertCircle } from "lucide-react";
import { useReparationReport } from "../hooks/useReparationReportPdf";

type ReparationGeneralInfoProps = {
    reparation: Reparation | undefined;
};

const ReparationGeneralInfo: React.FC<ReparationGeneralInfoProps> = ({ reparation }) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const { isLoading :isReportLoading, error :reportError, generateReport } = useReparationReport();
    // const { isLoading :isTicketLoading, error : ticketError, generateTicket } = useReparationTicket();
    
    const formatDate = (date: string | null) => {
        if (!date) return "Non définie";
        return new Date(date).toLocaleDateString('fr-FR');
    };

    const onUpdateSuccess = () => {
        setIsUpdating(false);
    };

    const handleGenerateReportButton = (reparation: Reparation ) => {
        generateReport(reparation);
    };
    //  const handleGenerateTicketButton = (reparation: Reparation ) => {
    //     generateTicket(reparation);
    // };

    if (!reparation) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                        <p className="text-gray-500 text-sm">Chargement des informations...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500 rounded-lg">
                            <Wrench className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">
                                Réparation #{reparation.callNumber}
                            </h2>
                            <p className="text-sm text-gray-600">
                                Informations générales de la réparation
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsUpdating(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200 cursor-pointer"
                    >
                        <SquarePen className="h-4 w-4" />
                        Modifier
                    </button>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Status and Dates Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Entrée</p>
                            <p className="text-sm font-semibold text-gray-900">{formatDate(reparation.entryDate)}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Sortie</p>
                            <p className="text-sm font-semibold text-gray-900">
                                {reparation.releaseDate ? formatDate(reparation.releaseDate) : "Non terminé"}
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="h-5 w-5 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</p>
                            <Badge className={`${getStatusStyle(reparation.repairStatus)} text-xs`}>
                                {getStatusText(reparation.repairStatus)}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* PDF Button */}
                <div className="flex items-center gap-4 flex-wrap">
                    <div>
                    <Button 
                        onClick={() => handleGenerateReportButton(reparation)} 
                        disabled={isReportLoading}
                        className="flex items-center gap-2 px-6 py-2.5"
                    >
                        <FileText className="h-4 w-4" />
                        {isReportLoading ? "Génération..." : "Voir fiche de réparation"}
                    </Button>
                    {reportError && (
                        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                            <AlertCircle className="h-4 w-4" />
                            Erreur : {reportError.message}
                        </div>
                    )}
                    </div>
                    {/* <div>
                        <Button 
                        onClick={() => handleGenerateTicketButton(reparation)} 
                        disabled={isTicketLoading}
                        className="flex items-center gap-2 px-6 py-2.5"
                    >
                        <FileText className="h-4 w-4" />
                        {isTicketLoading ? "Génération..." : "Voir billet de réparation"}
                    </Button>
                    {ticketError && (
                        <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                            <AlertCircle className="h-4 w-4" />
                            Erreur : {ticketError.message}
                        </div>
                    )}
                    </div> */}
                    
                </div>

                {/* Information Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Machine Info */}
                    <div className="border border-blue-200 rounded-lg p-4 bg-blue-50/50">
                        <div className="flex items-center gap-2 mb-3">
                            <Wrench className="h-5 w-5 text-blue-600" />
                            <h3 className="font-semibold text-blue-900">Machine</h3>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-blue-700">Désignation:</span>
                                <p className="text-sm text-blue-900 font-medium">{reparation.machine.designation}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-blue-700">Référence:</span>
                                <p className="text-sm text-blue-900 font-medium">{reparation.machine.reference}</p>
                            </div>
                        </div>
                    </div>

                    {/* Client Info */}
                    <div className="border border-green-200 rounded-lg p-4 bg-green-50/50">
                        <div className="flex items-center gap-2 mb-3">
                            <User className="h-5 w-5 text-green-600" />
                            <h3 className="font-semibold text-green-900">Client</h3>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <span className="text-sm font-medium text-green-700">Nom:</span>
                                <p className="text-sm text-green-900 font-medium">{getPartnerName(reparation.machine.partner)}</p>
                            </div>
                            {reparation.machine.partner.phoneNumbers?.length > 0 && (
                                <div>
                                    <span className="text-sm font-medium text-green-700">Téléphones:</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {reparation.machine.partner.phoneNumbers.map((phone, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white text-green-900 border border-green-200"
                                            >
                                                {phone.number}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="space-y-4">
                    {/* Accessories */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <Package className="h-5 w-5 text-gray-600" />
                            <h3 className="font-semibold text-gray-900">Accessoires amenés</h3>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                            {reparation.machineRelatedItems || "Aucun accessoire n'est amené"}
                        </p>
                    </div>

                    {/* Customer Complaint */}
                    <div className="border border-orange-200 rounded-lg p-4 bg-orange-50/50">
                        <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                            <h3 className="font-semibold text-orange-900">Problème signalé par le client</h3>
                        </div>
                        <p className="text-sm text-orange-900 leading-relaxed font-medium">
                            {reparation.customerComplaint}
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
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