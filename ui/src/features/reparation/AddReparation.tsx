import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SearchPartner from "../partner/components/SearchPartner";
import SelectMachine from "../machine/components/SelectMachine";
import { Button } from "@/components/ui";
import { DynamicPartner } from "@/services/api/partner/types";
import { useState } from "react";

export const formSchema = z.object({
  customerComplaint: z.string().min(1, "Designation is required"),
  partnerId: z.coerce.number().min(1, "Sélectionner un client"),
  machineId: z.coerce.number().min(1, "Sélectionner une machine"),
});


export type ReparationSchemaType = z.infer<typeof formSchema>;

const AddReparation : React.FC = () => {
    const { register, handleSubmit, setValue,reset, watch,formState: { errors, isSubmitting } } = useForm<ProductSchemaType>({
        resolver: zodResolver(formSchema)
    });
    const [partner,setPartner] = useState<DynamicPartner>()
    const selectedPartner = watch("partnerId");
    const selectedMachineId = watch("machineId");


    const handleFormSubmit = (data: ReparationSchemaType) => {
    };
    return (
        <form className="space-y-6 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
      
        <div>
            <SearchPartner partner={partner} setPartner={setPartner} partnerType={"CLIENT"}/>
            <input type="hidden" {...register("partnerId")} />
            {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
        </div>
        <div>
            <SelectMachine partner={partner}/>
            <input type="hidden" {...register("machineId")} />
            {errors.vatId && <p className="text-red-500">{errors.vatId.message}</p>}
        </div>
        <div>
        <textarea {...register("customerComplaint")} />
        {errors.criticalThreshold && <p className="text-red-500">{errors.criticalThreshold.message}</p>}
        </div>
      
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Ajouter"}
        </Button>
      </div>
      </form>
    );
}
export default AddReparation ;