import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "src/components/ui";
import { z } from "zod";
import { toast } from "react-toastify";
import { Reparation, RepairStatus } from "@/services/api/reparation/types";
import { useUpdateReparation } from "@/services/api/reparation/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Label } from "@/components/ui/shadcn/label";
import { Textarea } from "@/components/ui/shadcn/textarea";

const formSchema = z.object({
  customerComplaint:z.string().nonempty("La description ne peut pas être vide."),
  machineRelatedItems: z.string().optional(),
  repairStatus:z.enum(["ALL","IN_PROGRESS", "COMPLETED"]),
});

type FormValues = z.infer<typeof formSchema>;

type ReparationFormProps = {
  initialReparation: Reparation;
  toggleForm?: (isEditing: boolean) => void;
  onUpdateSuccess?: () => void;
};

const UpdateReparationForm: React.FC<ReparationFormProps> = ({ toggleForm, initialReparation, onUpdateSuccess }) => {
  const { mutate: updateReparation, isPending: isUpdateLoading } = useUpdateReparation();

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      customerComplaint: initialReparation.customerComplaint,
      machineRelatedItems:initialReparation.machineRelatedItems,
      repairStatus: initialReparation.repairStatus as RepairStatus,
    },
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormValues) => {
    const updatedReparation: Reparation = {
      ...initialReparation,
      customerComplaint: data.customerComplaint,
      machineRelatedItems:data.machineRelatedItems,
      repairStatus: data.repairStatus,
    };

    updateReparation(updatedReparation, {
      onSuccess: (response) => {
        reset();
        toggleForm?.(false);
        toast.success(response.message);
        onUpdateSuccess?.();
      },
    });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Label htmlFor="customerComplaint" className="block mb-2 font-medium">
          Description du problème
        </Label>
        <Textarea 
          id="customerComplaint"
          aria-label="Description du problème" 
          placeholder="Décrivez le problème rencontré..."
          {...register("customerComplaint")} 
        />
        {errors.customerComplaint && (
          <p className="text-red-500 text-sm mt-1">{errors.customerComplaint.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="machineRelatedItems" className="block mb-2 font-medium">
          Accessoires amenés par le client
        </Label>
        <Textarea 
          id="machineRelatedItems"
          aria-label="Accessoires amenés par le client" 
          placeholder="Listez les accessoires ou pièces amenés par le client..."
          {...register("machineRelatedItems")} 
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Statut de réparation</p>
        <Controller
          name="repairStatus"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} value={field.value} onValueChange={field.onChange}>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="IN_PROGRESS" id="in-progress" />
                <Label htmlFor="in-progress">En cours</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="COMPLETED" id="completed" />
                <Label htmlFor="completed">Terminée</Label>
              </div>
            </RadioGroup>
          )}
        />
        {errors.repairStatus && <p className="text-red-500">{errors.repairStatus.message}</p>}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isUpdateLoading}>
          {isUpdateLoading ? "En cours..." : "Modifier"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateReparationForm;
