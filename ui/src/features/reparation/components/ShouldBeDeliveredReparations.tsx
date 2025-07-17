import { useGetShouldBeDelivred, useSetShouldBeDelivered } from "@/services/api/reparation/hooks";
import { Check, Wrench, Phone, User, Settings } from "lucide-react";
import { getPartnerName } from "./utils";

const ShouldBeDeliveredReparations: React.FC = () => {
    const { data: reparations, isPending } = useGetShouldBeDelivred();
    const { mutate: setIsDelivered } = useSetShouldBeDelivered();

    const handleMarkAsDelivered = (reparationId: number) => {
        setIsDelivered(reparationId);
    };

    return (
        <div className="p-4">
            {isPending ? (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
            ) : reparations && reparations.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {reparations.map((reparation) => (
                        <div key={reparation.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
                            {/* Header avec numéro d'appel et bouton */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <Settings className="w-5 h-5 text-blue-600" />
                                    <span className="text-sm font-medium text-gray-600">
                                        N° {reparation.callNumber}
                                    </span>
                                </div>
                                 <button
                                    onClick={() => handleMarkAsDelivered(reparation.id)}
                                    className="border-2 border-green-600 hover:bg-green-50 text-green-600 p-2 rounded transition-colors duration-200 cursor-pointer"
                                    title="Marquer comme livré"
                                >
                                    <Check className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Informations machine */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    {reparation.machine.designation}
                                </h3>
                                
                                {/* Client */}
                                <div className="flex items-center space-x-2 mb-3">
                                    <User className="w-4 h-4 text-gray-500" />
                                    <span className="text-gray-700 font-medium">
                                        {getPartnerName(reparation.machine.partner)}
                                    </span>
                                </div>

                                {/* Téléphones */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium text-gray-600">
                                            Téléphones
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 ml-6">
                                        {reparation.machine.partner.phoneNumbers.map((phone, index) => (
                                            <span key={index} className="text-sm text-gray-700 bg-gray-50 px-3 py-1 rounded-full border">
                                                {phone.number}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer avec statut */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                        Prêt pour livraison
                                    </span>
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <Wrench className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Aucune réparation à livrer
                    </h3>
                    <p className="text-gray-600">
                        Toutes les réparations complètes sont livrées
                    </p>
                </div>
            )}
        </div>
    );
};

export default ShouldBeDeliveredReparations;