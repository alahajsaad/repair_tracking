import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchPartner from "../partner/components/SearchPartner";
import SelectMachine from "../machine/components/SelectMachine";
import { Button } from "@/components/ui";
import { DynamicPartner } from "@/services/api/partner/types";
import { useState } from "react";
import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useAddReparation, useGetCallNumber } from "@/services/api/reparation/hooks";
import { ReparationCreationDto } from "@/services/api/reparation/types";
import { toast } from "react-toastify";
import SearchMachine from "../machine/components/SearchMachine";
import { Label } from "@/components/ui/shadcn/label";
import { Switch } from "@/components/ui/shadcn/switch";

export const formSchema = z.object({
  customerComplaint: z.string().min(1, "Designation is required"),
  machineRelatedItems: z.string().optional(),
  machineId: z.coerce.number().min(1, "Sélectionner une machine"),
});

export type ReparationSchemaType = z.infer<typeof formSchema>;

const AddReparationForm: React.FC = () => {
    const { register, handleSubmit, setValue, reset, formState: { errors, isSubmitting } } = useForm<ReparationSchemaType>({
        resolver: zodResolver(formSchema)
    });
    
    const [partner, setPartner] = useState<DynamicPartner>();
    const [searchByReference, setSearchByReference] = useState(false);
    const { data: callNumber, refetch } = useGetCallNumber();
    const { mutate: addReparation } = useAddReparation();
    const date = new Date();

    const onMachineSelect = (id: number) => {
        setValue("machineId", id);
    };

    // Reset machine selection when switching search methods
    const handleSwitchChange = (checked: boolean) => {
        setSearchByReference(checked);
        setValue("machineId", 0); // Reset machine selection
        if (checked) {
            setPartner(undefined); // Clear partner when switching to reference search
        }
    };

    const handleFormSubmit = (data: ReparationSchemaType) => {
        if (callNumber && (partner || searchByReference)) {
            const reparation: ReparationCreationDto = {
                callNumber: callNumber,
                customerComplaint: data.customerComplaint,
                machineRelatedItems: data.machineRelatedItems,
                machine: { id: data.machineId }
            };

            addReparation(reparation, {
                onSuccess(response) {
                    setPartner(undefined);
                    toast.success(response.message);
                    refetch();
                    reset();
                    setValue("machineId", 0);
                },
                onError: (error) => {
                    toast.error(`Erreur lors de la création: ${error.message}`);
                }
            });
        }
    };

    return (
        <>
            <div className="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <Wrench className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Ajouter une Réparation
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Créer une nouvelle entrée de réparation dans le système
                    </p>
                </div>
            </div>

            <Card className="w-full shadow-sm border py-0">
                <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Numéro d'appel</p>
                            <p className="text-lg font-semibold text-gray-900">{callNumber}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Date</p>
                            <p className="text-lg font-semibold text-gray-900">{date.toLocaleDateString('fr-FR')}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-5">
                <CardContent>
                    <form className="space-y-5 pt-3" onSubmit={handleSubmit(handleFormSubmit)}>
                        {/* Switch for search method */}
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                            <Label htmlFor="search-method" className="text-sm font-medium">
                                Méthode de recherche :
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="search-method" className={`text-sm ${!searchByReference ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
                                    Par client
                                </Label>
                                <Switch
                                    id="search-method"
                                    checked={searchByReference}
                                    onCheckedChange={handleSwitchChange}
                                />
                                <Label htmlFor="search-method" className={`text-sm ${searchByReference ? 'font-semibold text-blue-600' : 'text-gray-600'}`}>
                                    Par référence
                                </Label>
                            </div>
                        </div>

                        {/* Machine selection based on switch */}
                        <div className="border rounded-lg p-4">
                            {!searchByReference ? (
                                <div className="space-y-4">
                                    <p className="font-semibold text-gray-700">
                                        Rechercher un client puis sélectionner une machine
                                    </p>
                                    <div>
                                        <SearchPartner
                                            label={"Rechercher un client"}
                                            partner={partner}
                                            setPartner={setPartner}
                                            partnerType={"CLIENT"}
                                        />
                                    </div>
                                    <div>
                                        <SelectMachine partner={partner} onMachineSelect={onMachineSelect} />
                                        {errors.machineId && (
                                            <p className="text-red-500 text-sm mt-1">{errors.machineId.message}</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <p className="font-semibold text-gray-700">
                                        Rechercher une machine par sa référence
                                    </p>
                                    <SearchMachine onMachineSelect={onMachineSelect} />
                                    {errors.machineId && (
                                        <p className="text-red-500 text-sm mt-1">{errors.machineId.message}</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Hidden input for machineId */}
                        <input type="hidden" {...register("machineId")} />

                        <div className="flex flex-row gap-2 items-start w-full">
                            <div className="flex-1">
                                <label htmlFor="customerComplaint" className="block text-sm font-medium text-gray-700 mb-2">
                                    Décrire le problème de cette machine
                                </label>
                                <textarea
                                    id="customerComplaint"
                                    rows={4}
                                    className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    {...register("customerComplaint")}
                                />
                                {errors.customerComplaint && (
                                    <p className="text-red-500 text-sm mt-1">{errors.customerComplaint.message}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label htmlFor="machineRelatedItems" className="block text-sm font-medium text-gray-700 mb-2">
                                    Accessoires amenés avec la machine
                                </label>
                                <textarea
                                    id="machineRelatedItems"
                                    rows={4}
                                    className="bg-gray-50 border p-2.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full"
                                    {...register("machineRelatedItems")}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <Button type="submit" disabled={isSubmitting || !callNumber}>
                                {isSubmitting ? "En cours..." : "Ajouter"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
};

export default AddReparationForm;