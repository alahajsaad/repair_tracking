import { UseFormReturn, useFieldArray } from "react-hook-form";
import { Plus, Trash, MapPin } from "lucide-react";
import { Button, Input } from "../../../components/ui";
import { ClientForm, SupplierForm } from "@/lib/formSchema";

// Use a generic interface that doesn't depend on specific form types
interface AddressesSectionProps {
    form: UseFormReturn<ClientForm | SupplierForm>;
 
}

const AddressesSection = ({ form }: AddressesSectionProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "addresses",
  });

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Adresses</h3>
        <Button
          type="button"
          onClick={() =>
            append({
              streetAddress: "",
              city: "",
            })
          }
          className="flex items-center gap-1"
          variant={"secondary"}
        >
          <Plus className="h-4 w-4" /> Ajouter une adresse
        </Button>
      </div>

      {fields.length === 0 ? (
        <div className="flex items-center justify-center p-6 border border-dashed rounded-md">
          <div className="flex flex-col items-center text-muted-foreground">
            <MapPin className="h-8 w-8 mb-2" />
            <p>Aucune adresse ajoutée pour le moment</p>
            <Button
              onClick={() =>
                append({
                  streetAddress: "",
                  city: "",
                })
              }
              className="mt-2"
              variant={"secondary"}
            >
              Ajouter une adresse
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md bg-card">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Adresse {index + 1}</h4>
                
                <Button
                  variant={"destructive"}
                  onClick={() => remove(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <Input label="Ville" {...form.register(`addresses.${index}.city`)} />
                  {form.formState.errors.addresses?.[index]?.city && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.addresses[index]?.city?.message}
                    </p>
                  )}
                </div>

                <div className="col-span-full">
                 <Input label="Adresse" {...form.register(`addresses.${index}.streetAddress`)} />
                  {form.formState.errors.addresses?.[index]?.streetAddress && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.addresses[index]?.streetAddress?.message}
                    </p>
                  )}
                </div>
                
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesSection;