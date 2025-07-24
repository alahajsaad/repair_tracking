import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "src/components/ui";
import { z } from "zod";
import { toast } from "react-toastify";
import { ReparationDetail } from "@/services/api/reparation_details/types";
import { AddReparationDetailVariables, useAddReparationDetail, useUpdateReparationDetail } from "@/services/api/reparation_details/hooks";

const formSchema = z.object({
  description: z.string().min(1, "Veuillez ajouter une description de maintenance effectuée"),
  price: z.number().min(0.01, "Ajouter un prix valide"),
});

type FormValues = z.infer<typeof formSchema>;

type ReparationDetailFormProps = {
  initialReparationDetail?: ReparationDetail;
  toggleForm?: (isEditing: boolean) => void;
  onUpdateSuccess?: (detail:ReparationDetail) => void;
  onAddSuccess?: (detail:ReparationDetail) => void;
  reparationId?:number
};

const ReparationDetailForm: React.FC<ReparationDetailFormProps> = ({ 
  toggleForm, 
  initialReparationDetail, 
  onUpdateSuccess, 
  onAddSuccess,
  reparationId 
}) => {
  // Utiliser les hooks conditionnellement selon le mode (ajout ou modification)
  const { mutate: addReparationDetail, isPending: isAddLoading } = useAddReparationDetail();
  const { mutate: updateReparationDetail, isPending: isUpdateLoading } = useUpdateReparationDetail();

  // Déterminer si on est en mode édition
  const isEditMode = !!initialReparationDetail;

  // Déterminer l'état de chargement en fonction du mode
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      description: initialReparationDetail?.description || "",
      price: initialReparationDetail?.price || 0
    },
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialReparationDetail) {
      // Mode édition: mettre à jour la réparation existante
      const updatedReparationDetail: ReparationDetail = {
        ...initialReparationDetail,
        description: data.description,
        price: data.price
      };

      updateReparationDetail(updatedReparationDetail, {
        onSuccess: () => {
          reset();
          toggleForm?.(false);
          onUpdateSuccess?.(updatedReparationDetail);
          toast.success("Réparation modifiée avec succès");
        },
        onError: (error) => {
          toast.error("Erreur lors de la modification");
          console.error(error);
        }
      });
    } else if (reparationId) {
        const newReparationDetail: AddReparationDetailVariables = {
        detail:{
            description: data.description,
            price: data.price
        },
        id:reparationId! 
      };

      addReparationDetail(newReparationDetail, {
        onSuccess: (response) => {
          reset();
          toast.success(response.message);
          toggleForm?.(false);
          onAddSuccess?.(response.data!);
        },
        onError: (response) => {
          toast.error(response.message);
        }
      });
    } 
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <Input 
          label="Description *" 
          {...register("description")} 
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>
      
      <div>
        <Input 
          label="Prix *" 
          type="number" 
          step="0.01" 
          min="0" 
          {...register("price", { valueAsNumber: true })} 
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

export default ReparationDetailForm;