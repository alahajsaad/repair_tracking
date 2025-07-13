import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchPartner from "../partner/components/SearchPartner";
import SelectMachine from "../machine/components/SelectMachine";
import { Button } from "@/components/ui";
import { DynamicPartner } from "@/services/api/partner/types";
import { useEffect, useId, useState } from "react";
import { Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useAddReparation, useGetCallNumber } from "@/services/api/reparation/hooks";
import Label from "@/components/ui/Label";
import { ReparationCreationDto } from "@/services/api/reparation/types";
import { toast } from "react-toastify";

export const formSchema = z.object({
  customerComplaint: z.string().min(1, "Designation is required"),
  partnerId: z.coerce.number().min(1, "Sélectionner un client"),
  machineId: z.coerce.number().min(1, "Sélectionner une machine"),
});


export type ReparationSchemaType = z.infer<typeof formSchema>;

const AddReparationForm : React.FC = () => {
    const { register, handleSubmit, setValue,reset,formState: { errors, isSubmitting } } = useForm<ReparationSchemaType>({
        resolver: zodResolver(formSchema)
    });
    const [partner,setPartner] = useState<DynamicPartner>()
    const {data:callNumber ,refetch}=useGetCallNumber()
    const {mutate:addReparation} = useAddReparation()
    const date = new Date()

    const id = useId();
    useEffect(() => {
        if(partner?.id){
            setValue("partnerId", partner?.id, { 
                shouldValidate: true,
                shouldDirty: true
            });
        }
    } , [partner,setValue])
    const onMachineSelect = (id:number) => {
        setValue("machineId",id)
    }

    const handleFormSubmit = (data: ReparationSchemaType) => {
      if (callNumber && partner) {
            const reparation: ReparationCreationDto = {
                callNumber: callNumber,
                customerComplaint:data.customerComplaint,
                machine: { id: data.machineId }
            };

           
            addReparation(reparation, {
                onSuccess(response) {
                    setPartner(undefined)
                    toast.success(response.message);
                    refetch()
                    reset()
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
      
        <div>
            <SearchPartner label={"Rechercher un client"} partner={partner} setPartner={setPartner} partnerType={"CLIENT"}/>
            <input type="hidden" {...register("partnerId")} />
            {errors.partnerId && <p className="text-red-500">{errors.partnerId.message}</p>}
        </div>
        <div>
            <SelectMachine partner={partner} onSelect={onMachineSelect}/>
            <input type="hidden" {...register("machineId")} />
            {errors.machineId && <p className="text-red-500">{errors.machineId.message}</p>}
        </div>
        <div>
       
        <Label id={id}>Decrire le problem de cette machine</Label>
        <textarea id={id} className="bg-gray-50 border p-2.5 border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" {...register("customerComplaint")} />
        {errors.customerComplaint && <p className="text-red-500">{errors.customerComplaint.message}</p>}
        </div>
      
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Ajouter"}
        </Button>
      </div>
      </form>
      </CardContent>
       </Card>
      </>
    );

    
}
export default AddReparationForm ;