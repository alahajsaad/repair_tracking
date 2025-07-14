import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
import { toast } from "react-toastify";
import { Reparation } from "@/services/api/reparation/types";
import { useUpdateReparation } from "@/services/api/reparation/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Label } from "@/components/ui/shadcn/label";

const formSchema = z.object({
  customerComplaint: z.string(),

});

type FormValues = z.infer<typeof formSchema>;

type ReparationFormProps = {
  initialReparation: Reparation;
  toggleForm?: (isEditing: boolean) => void;
  onUpdateSuccess? : () => void;
};

const UpdateReparationForm: React.FC<ReparationFormProps> = ({ toggleForm, initialReparation,onUpdateSuccess}) => {
    const { mutate: updateReparation, isPending: isUpdateLoading } = useUpdateReparation();
  
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm<FormValues>({
        defaultValues: initialReparation ? { 
            customerComplaint: initialReparation.customerComplaint,


         } : undefined,
        resolver: zodResolver(formSchema),
    });
  
  const handleFormSubmit = (data: FormValues ) => {
   
      const updatedReparation: Reparation = {
        ...initialReparation,
        customerComplaint: data.customerComplaint
      };
      
      updateReparation(updatedReparation, {
        onSuccess: (response) => {
          reset();
          toggleForm?.(false);
          toast.success(response.message)
          onUpdateSuccess?.();
        }
      });
    
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input label="Description du probleme *" {...register("customerComplaint")} />
        {errors.customerComplaint && <p className="text-red-500">{errors.customerComplaint.message}</p>}
      </div>

      <div>
         <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-3">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
            </div>
           
        </RadioGroup>
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isUpdateLoading}>
          {isUpdateLoading ? "En cours..." : "Modifier" }
        </Button>
      </div>
    </form>
  );
};

export default UpdateReparationForm;