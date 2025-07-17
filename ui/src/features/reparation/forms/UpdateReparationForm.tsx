import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
import { toast } from "react-toastify";
import { Reparation, RepairStatus } from "@/services/api/reparation/types";
import { useUpdateReparation } from "@/services/api/reparation/hooks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/shadcn/radio-group";
import { Label } from "@/components/ui/shadcn/label";

const formSchema = z.object({
  customerComplaint: z.string().nonempty("La description ne peut pas être vide."),
  repairStatus: z.enum(["ALL","IN_PROGRESS", "COMPLETED"]),
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
      repairStatus: initialReparation.repairStatus as RepairStatus,
    },
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormValues) => {
    const updatedReparation: Reparation = {
      ...initialReparation,
      customerComplaint: data.customerComplaint,
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
        <Input label="Description du problème *" {...register("customerComplaint")} />
        {errors.customerComplaint && <p className="text-red-500">{errors.customerComplaint.message}</p>}
      </div>

      <div>
        <p className="mb-2 font-medium">Statut de réparation *</p>
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
