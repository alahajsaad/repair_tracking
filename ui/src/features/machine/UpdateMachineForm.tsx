import { Button, Input } from "@/components/ui";
import { useUpadteMachine } from "@/services/api/machine/hook";
import { Machine } from "@/services/api/machine/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useEffect } from "react";

const formSchema = z.object({
    designation: z.string().min(1, "Remplir le champ avec une désignation correcte"),
    reference: z.string().min(1, "Remplir le champ avec une référence correcte"),
});

type FormValues = z.infer<typeof formSchema>;

type UpdateMachineFormProps = {
    initialMachine: Machine | undefined,
    onUpdateSuccess: (machine: Machine) => void
}

const UpdateMachineForm: React.FC<UpdateMachineFormProps> = ({ initialMachine, onUpdateSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            designation: initialMachine?.designation || "",
            reference: initialMachine?.reference || "",
        },
        resolver: zodResolver(formSchema),
    });

    const { mutate: updateMachine, isPending } = useUpadteMachine()

    // Réinitialiser le formulaire quand initialMachine change
    useEffect(() => {
        if (initialMachine) {
            reset({
                designation: initialMachine.designation || "",
                reference: initialMachine.reference || "",
            });
        }
    }, [initialMachine, reset]);

    const handleFormSubmit = (data: FormValues) => {
        if (!initialMachine) {
            toast.error("Aucune machine sélectionnée");
            return;
        }

        const updatedMachine: Machine = {
            ...initialMachine,
            designation: data.designation,
            reference: data.reference,
        };

        updateMachine(updatedMachine, {
            onSuccess: (response) => {
                toast.success(response.message);
                onUpdateSuccess?.(response.data!);
            },
            onError: (error) => {
                toast.error(error.message || "Erreur lors de la mise à jour");
            }
        });
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
            <div>
                <Input 
                    label="Désignation *" 
                    {...register("designation")} 
                />
                {errors.designation && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.designation.message}
                    </p>
                )}
            </div>
            <div>
                <Input 
                    label="Référence *" 
                    {...register("reference")} 
                />
                {errors.reference && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.reference.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end mt-4">
                <Button type="submit" disabled={isPending}>
                    {isPending ? "En cours..." : "Modifier"}
                </Button>
            </div>
        </form>
    );
}

export default UpdateMachineForm;