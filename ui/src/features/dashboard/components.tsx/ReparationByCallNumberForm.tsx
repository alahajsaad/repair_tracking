import { Button, Input } from "src/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardBody } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getReparationByCallNumber } from "@/services/api/reparation/api";
import { toast } from "react-toastify";

export const formSchema = z.object({
  callNumber: z.string().min(1, "numero d'appel doit etre correct"),
});

type SchemaType = z.infer<typeof formSchema>;

const ReparationByCallNumberForm: React.FC = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SchemaType>({
    resolver: zodResolver(formSchema)
  });

const handleFormSubmit = async (data: SchemaType) => {
  try {
    const result = await getReparationByCallNumber(data.callNumber);

    if (result?.data) {
      navigate(`/reparations/${result.data.id}`);
    } else {
      toast.warn(`Il n'y a pas de réparation avec ce numéro : ${data.callNumber}`);
    }
  } catch (error) {
    console.error(error);
    toast.error("Une erreur est survenue lors de la recherche de la réparation.");
  }
};


  return (
    <Card>
  <CardBody>
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <p>Numero d'appel :</p>
        <div className="flex items-center gap-2">
            <Input placeholder="EX:25A001" {...register("callNumber")} />
            <Button type="submit" className="">
                <ArrowRight />
            </Button>
       </div>
       {errors.callNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.callNumber.message}</p>
        )}
      
    </form>
  </CardBody>
</Card>

  );
};

export default ReparationByCallNumberForm;