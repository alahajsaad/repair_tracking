import { Card, CardBody} from "src/components/ui/Card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Input } from "src/components/ui";
import InputFile from "src/components/ui/inputs/InputFile";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CompanyCreationDto, CompanyResponseDto } from "@/services/api/company/types";
import { useCreateCompany, useUpdateCompany, useGetCompanyLogo } from "@/services/api/company/hooks";

// Schema de validation avec logo optionnel pour la modification
const createFormSchema = () => 
  z.object({
    companyName: z.string().min(1, "Ajouter le nom de votre entreprise"),
    companyAddress: z.string().min(1, "Ajouter le numéro fiscal de votre entreprise"),
    companyEmail: z.string().email("L'email doit être rempli correctement"),
    companyPhoneNumber: z.string().min(8, "Le numéro de téléphone doit contenir au moins 8 caractères"),
    generalConditions: z.string().min(1, "Les conditions générales sont requises"),
    logo: z
      .any()
      .optional()
      .refine(
        (file) => !file || (file instanceof File && file.size > 0),
        "Veuillez importer un fichier valide."
      )
      .refine(
        (file) =>
          !file || ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
        "Le fichier doit être une image JPG ou PNG."
      ),
  });

type FormValues = z.infer<ReturnType<typeof createFormSchema>>;

type CompanyFormProps = {
  initialCompany?: CompanyResponseDto;
  onUpdateSuccess?:() => void
};

const CompanyForm: React.FC<CompanyFormProps> = ({ 
  initialCompany, 
  onUpdateSuccess
}) => {
  const { mutate: createCompany, isPending: isAddLoading } = useCreateCompany();
  const { mutate: updateCompany, isPending: isUpdateLoading } = useUpdateCompany();
  const { data: logoBlob, isPending: isLogoLoading } = useGetCompanyLogo(initialCompany?.logoUrl || '');
  
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [hasNewLogo, setHasNewLogo] = useState(false);

  const isEditMode = !!initialCompany;
  const isLoading = isEditMode ? isUpdateLoading : isAddLoading;

  // Schema dynamique basé sur le mode
  const formSchema = createFormSchema();

  const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode && initialCompany ? {
      companyName:initialCompany.companyName,
      companyAddress:initialCompany.companyAddress,
      companyEmail:initialCompany.companyEmail,
      companyPhoneNumber:initialCompany.companyPhoneNumber,
      generalConditions:initialCompany.generalConditions,
    } : undefined,
  });
  // Surveiller les changements du logo
  const watchedLogo = watch('logo');

  // Gérer l'aperçu du logo existant
  useEffect(() => {
    if (isEditMode && logoBlob && !hasNewLogo) {
      const logoUrl = URL.createObjectURL(logoBlob);
      setLogoPreview(logoUrl);
      
      // Nettoyer l'URL quand le composant est démonté
      return () => URL.revokeObjectURL(logoUrl);
    }
  }, [logoBlob, isEditMode, hasNewLogo]);

  // Gérer l'aperçu du nouveau logo
  useEffect(() => {
    if (watchedLogo && watchedLogo instanceof File) {
      const newLogoUrl = URL.createObjectURL(watchedLogo);
      setLogoPreview(newLogoUrl);
      setHasNewLogo(true);
      
      // Nettoyer l'URL précédente
      return () => URL.revokeObjectURL(newLogoUrl);
    }
  }, [watchedLogo]);

  const handleFormSubmit = (data: FormValues) => {
    if (isEditMode && initialCompany) {
      // Mode modification
      const updatedCompany: CompanyCreationDto = {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companyPhoneNumber: data.companyPhoneNumber,
        companyEmail: data.companyEmail,
        generalConditions:data.generalConditions,
        // Si pas de nouveau logo, ne pas envoyer le champ logo (garder l'existant)
        ...(hasNewLogo && { logo: data.logo }),
      };
      updateCompany(updatedCompany, {
        onSuccess: (response) => {
          onUpdateSuccess?.()
          toast.success(response.message);
        },
        onError: (response) => {
          toast.error(response.message);
        }
      });
    } else {
      // Mode création
      const newCompany: CompanyCreationDto = {
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        companyPhoneNumber: data.companyPhoneNumber,
        companyEmail: data.companyEmail,
        generalConditions:data.generalConditions,
        logo: data.logo,
      };
      console.log(newCompany.generalConditions)
      createCompany(newCompany, {
        onSuccess: (response) => {
          toast.success(response.message);
          reset(); 
          setLogoPreview(null);
          setHasNewLogo(false);
        },
        onError: (response) => {
          toast.error(response.message);
        }
      });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardBody>
        <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
          <div>
            <Input 
              placeholder="" 
              label="Nom de l'entreprise" 
              {...register('companyName')}
            />
            {errors.companyName && <p className='text-red-500 text-sm mt-1'>{errors.companyName.message}</p>}
          </div>

          <div>
            <Input 
              placeholder="" 
              label="Adresse de l'entreprise" 
              {...register('companyAddress')}
            />
            {errors.companyAddress && <p className='text-red-500 text-sm mt-1'>{errors.companyAddress.message}</p>}
          </div>

          <div>
            <Input 
              label="Numero de telephone" 
              {...register('companyPhoneNumber')}
            />
            {errors.companyPhoneNumber && <p className='text-red-500 text-sm mt-1'>{errors.companyPhoneNumber.message}</p>}
          </div>

          <div>
            <Input 
              type="email"
              label="Email" 
              {...register('companyEmail')}
            />
            {errors.companyEmail && <p className='text-red-500 text-sm mt-1'>{errors.companyEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conditions générales
            </label>
            <textarea 
              {...register('generalConditions')}
              rows={4}
              className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-blue-200"
              placeholder="Entrez chaque condition separer avec un /"
            />
            </div>


          <div>
            {/* Affichage du logo existant en mode édition */}
            {isEditMode && logoPreview && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo actuel
                </label>
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-gray-200">
                  {isLogoLoading ? (
                    <div className="text-gray-500 text-sm">Chargement...</div>
                  ) : (
                    <img
                      src={logoPreview}
                      alt="Logo de l'entreprise"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {hasNewLogo && (
                  <p className="text-sm text-blue-600 mt-2">
                    Nouveau logo sélectionné
                  </p>
                )}
              </div>
            )}

            <InputFile 
              name="logo" 
              label={`Logo d'entreprise ${isEditMode ? '(optionnel - laissez vide pour garder l\'actuel)' : ''}`}
              control={control} 
              testId="upload-input"
            />
            {errors.logo && <p className="text-red-500 text-sm mt-1">
              {typeof errors.logo.message === 'string' ? errors.logo.message : "Erreur avec l'upload du logo"}
            </p>}
          </div>

          <div className='flex justify-end mt-[20px]'>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "En cours..." : isEditMode ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default CompanyForm;