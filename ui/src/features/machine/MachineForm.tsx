import { Button, Input } from "src/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Card, CardBody } from "@/components/ui/Card";
import SearchPartner from "../partner/components/SearchPartner";
import { useEffect, useState } from "react";
import { DynamicPartner } from "@/services/api/partner/types";
import { MachineCreationDto } from "@/services/api/machine/types";
import { useAddMachine } from "@/services/api/machine/hook";
import { Monitor } from "lucide-react";

export const formSchema = z.object({
  designation: z.string().min(1, "La désignation est obligatoire"),
  reference: z.string().min(1, "La référence est obligatoire"),
  partnerId: z.coerce.number().min(1, "Veuillez sélectionner un client"),
});



export type MachineSchemaType = z.infer<typeof formSchema>;


const MachineForm: React.FC = () => {
    const [partner,setPartner] =useState<DynamicPartner>()
    const {mutate:addMachine } = useAddMachine()
    const { 
        register, 
        handleSubmit, 
        reset, 
        setValue,
        formState: { errors, isSubmitting } 
    } = useForm<MachineSchemaType>({
        resolver: zodResolver(formSchema)
    });

    useEffect(() => {
        if(partner?.id){
            setValue("partnerId", partner?.id, { 
                shouldValidate: true,
                shouldDirty: true
            });
        }
    } , [partner,setValue])

    const handleFormSubmit = (data: MachineSchemaType) => {
        if (!partner) {
            toast.error("Partner is missing"); // optional: show error if partner missing
            return;
        }
        const product : MachineCreationDto = {
            designation:data.designation,
            reference:data.reference,
            partner:{
                id: partner?.id,
                entityType : partner?.entityType
                
            }
        }
        addMachine(product,{
            onSuccess : (response) => {
                toast.success(response.message)
                reset()
            },
            onError : (err : Error) => {
                toast.error(err.message)
            }
        })
   
   
    };

  return (
    <>

    <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl ">
            <Monitor className="h-6 w-6 text-white" />
        </div>
        <div>
        <h1 className="text-2xl font-bold text-foreground">Ajouter une Machine</h1>
        </div>
    </div>

    <Card>
      <CardBody>
      <form className="space-y-6 pt-5" onSubmit={handleSubmit(handleFormSubmit)}>
      
        
        
        <div>
        <Input label="Nom de la machine *" {...register("designation")} />
        {errors.designation && <p className="text-red-500">{errors.designation.message}</p>}
        </div>

        <div>
            <Input label="Référence *" {...register("reference")} />
            {errors.reference && <p className="text-red-500">{errors.reference.message}</p>}
        </div>
        
        <div>
        <SearchPartner label={"Rechercher un client *"} partnerType={"CLIENT"} partner={partner} setPartner={setPartner} />
        <input type="hidden" {...register("partnerId")} />
        {errors.partnerId && <p className="text-red-500">{errors.partnerId.message}</p>}

        </div>
        
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "En cours..." : "Ajouter"}
        </Button>
      </div>
      </form>
      </CardBody>
    </Card>
    </>
  );
};

export default MachineForm;