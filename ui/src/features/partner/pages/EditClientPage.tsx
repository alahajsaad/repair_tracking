import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate } from 'react-router-dom';
import { ClientForm, clientFormSchema } from '@/lib/formSchema';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui/shadcn/button';
import EntityTypeSelection from '../forms/EntityTypeSelection';
import PersonInfoFields from '../forms/PersonInfoFields';
import CompanyInfoFields from '../forms/CompanyInfoFields';
import PhoneNumbersSection from '../forms/PhoneNumbersSection';
import AddressesSection from '../forms/AddressesSection';
import { useGetPartnerById } from '@/services/api/partner/hooks';
import { useUpdateOrganization } from '@/services/api/partner/organization/hooks';
import { Organization, Person } from '@/services/api/partner/types';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useUpdatePerson } from '@/services/api/partner/person/hooks';

const EditClientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const numericId = id ? parseInt(id, 10) : -1;
  
  // Récupération des données du partenaire
  const { data: partner, isPending: isLoadingPartner, error } = useGetPartnerById(numericId);
  
  // Hooks de modification
  const { mutate: updatePerson, isPending: isUpdatingPerson } = useUpdatePerson(partner?.id || 0);
  const { mutate: updateOrganization, isPending: isUpdatingOrganization } = useUpdateOrganization(partner?.id || 0);
  
  const isUpdating = isUpdatingPerson || isUpdatingOrganization;

  const form = useForm<ClientForm>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      email: "",
      phoneNumbers: [{ number: "" }],
      addresses: [{ streetAddress: "", city: "" }],
      basicInfo: {
        firstName: '',
        lastName: '',
      },
    },
  });

  // Remplir le formulaire avec les données du partenaire une fois chargées
  useEffect(() => {
    if (partner) {
      form.reset({
        entityType: partner.entityType,
        email: partner.email || "",
        phoneNumbers: partner.phoneNumbers?.length > 0 
          ? partner.phoneNumbers.map(phone => ({ number: phone.number }))
          : [{ number: "" }],
        addresses: partner.addresses?.length > 0 
          ? partner.addresses.map(addr => ({ 
              streetAddress: addr.streetAddress, 
              city: addr.city 
            }))
          : [{ streetAddress: "", city: "" }],
        basicInfo: partner.entityType === "PERSON" 
          ? {
              firstName: (partner as Person).firstName || '',
              lastName: (partner as Person).lastName || '',
            }
          : {
              companyName: (partner as Organization).companyName || '',
              registrationNumber: (partner as Organization).registrationNumber || '',
              taxNumber: (partner as Organization).taxNumber || '',
            },
      });
    }
  }, [partner, form]);

  const entityType = form.watch('entityType');

  const onSubmit = async (data: ClientForm) => {
  if (!partner) return;

  
  const mappedPhoneNumbers = data.phoneNumbers.map(phone => ({
    number: phone.number,
   
  }));

  const mappedAddresses = data.addresses.map(address => ({
    streetAddress: address.streetAddress,
    city: address.city,
  }));

  if (data.entityType === "PERSON") {
      const personInfo = data.basicInfo as { firstName: string; lastName: string };

    const updatedPerson: Person = {
      ...partner,
      entityType: "PERSON",
      email: data.email,
      phoneNumbers: mappedPhoneNumbers, // ✅ Properly mapped
      addresses: mappedAddresses,       // ✅ Properly mapped
      firstName: personInfo.firstName,
      lastName: personInfo.lastName
    } as Person;
    
    console.log("updated person:", updatedPerson);
    updatePerson(updatedPerson, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(`/clients/${partner.id}`);
      },
      onError: (response) => {
        toast.error(response.message);
        console.log("error : " + response.message)
      }
    });
  } else {
    const companyInfo = data.basicInfo as {
    companyName: string;
    registrationNumber?: string;
    taxNumber?: string;
  };
    const updatedOrganization: Organization = {
      ...partner,
      entityType: "ORGANIZATION",
      email: data.email,
      phoneNumbers: mappedPhoneNumbers, // ✅ Properly mapped
      addresses: mappedAddresses,       // ✅ Properly mapped
      companyName: companyInfo.companyName,
      registrationNumber: companyInfo.registrationNumber,
      taxNumber: companyInfo.taxNumber
    }  as Organization ;
  
    console.log("updated organization:", updatedOrganization);
    updateOrganization(updatedOrganization, {
      onSuccess: (response) => {
        toast.success(response.message);
        navigate(`/clients/${partner.id}`);
      },
      onError: (response) => {
        toast.error(response.message);
      }
    });
  }
};

  const handleCancel = () => {
    navigate(`/clients/${partner?.id || ''}`);
  };

  // État de chargement
  if (isLoadingPartner) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-center items-center min-h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Chargement des données du client...</p>
          </div>
        </div>
      </div>
    );
  }

  // Erreur ou client non trouvé
  if (error || !partner) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">⚠️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Client non trouvé
            </h3>
            <p className="text-gray-500 mb-4">
              Le client que vous essayez de modifier n'existe pas ou n'est plus disponible.
            </p>
            <Button onClick={() => navigate('/clients')}>
              Retour à la liste des clients
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ID invalide
  if (numericId === -1) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              ID client invalide
            </h3>
            <p className="text-gray-500 mb-4">
              L'identifiant du client fourni n'est pas valide.
            </p>
            <Button onClick={() => navigate('/clients')}>
              Retour à la liste des clients
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header avec navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/clients')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la liste
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Modifier le client
                </h1>
                <p className="text-sm text-gray-600">
                  {partner.entityType === 'PERSON' 
                    ? partner.fullName 
                    : partner.companyName}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate(`/clients/${partner.id}`)}
              className="text-gray-600 hover:text-gray-900"
            >
              Voir les détails
            </Button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Section principale avec sélection du type d'entité et informations de base */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sélection du type d'entité (désactivée en mode édition) */}
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardBody>
                  <EntityTypeSelection 
                    value={entityType} 
                    onChange={() => {}} // Pas de changement en mode édition
                  
                  />
                </CardBody>
              </Card>
            </div>
            
            {/* Informations de base */}
            <div className="lg:col-span-8">
              <Card className="h-full">
                <CardBody>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Informations de base</h2>
                    
                    {entityType === "PERSON" ? (
                      <PersonInfoFields form={form} />
                    ) : (
                      <CompanyInfoFields form={form} />
                    )}
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="exemple@email.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        {...form.register("email")}
                      />
                      {form.formState.errors.email && (
                        <p className="text-sm text-red-500">
                          {form.formState.errors.email?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          
          {/* Section contact avec numéros de téléphone et adresses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Section numéros de téléphone */}
            <div>
              <Card className="h-full">
                <CardBody>
                  <PhoneNumbersSection form={form} />
                </CardBody>
              </Card>
            </div>
            
            {/* Section adresses */}
            <div>
              <Card className="h-full">
                <CardBody>
                  <AddressesSection form={form} />
                </CardBody>
              </Card>
            </div>
          </div>
          
          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200">
            <Button 
              type="button" 
              onClick={handleCancel}
              disabled={isUpdating}
              variant="outline"
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              disabled={isUpdating}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              {isUpdating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Modification en cours...
                </div>
              ) : (
                'Modifier client'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClientPage;