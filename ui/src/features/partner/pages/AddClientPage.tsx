import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientForm, clientFormSchema, EntityType } from '@/lib/formSchema';
import { Card, CardBody } from '@/components/ui/Card';
import { Button } from '@/components/ui';
import EntityTypeSelection from '../forms/EntityTypeSelection';
import PersonInfoFields from '../forms/PersonInfoFields';
import CompanyInfoFields from '../forms/CompanyInfoFields';
import PhoneNumbersSection from '../forms/PhoneNumbersSection';
import AddressesSection from '../forms/AddressesSection';
import { useAddPerson } from '@/services/api/partner/person/hooks';
import { useAddOrganization } from '@/services/api/partner/organization/hooks';
import { Organization, Person } from '@/services/api/partner/types';
import { toast } from 'react-toastify';



const AddClientPage = () => {
  const {mutate : addPerson , isPending : isAddPersonPending } = useAddPerson()
  const {mutate : addOrganization , isPending : isAddOrganizationPending } = useAddOrganization()
  const isPending = isAddPersonPending || isAddOrganizationPending
  const form = useForm<ClientForm>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      entityType: "PERSON",
      email: "",
      phoneNumbers: [
        {
          number: "",
        }
      ],
      addresses: [
        {
          streetAddress: "",
          city: ""
        }
      ],
      basicInfo: {
        firstName: '',
        lastName: '',
      },
    },
  });
  
  const entityType = form.watch('entityType');
  
  const handleEntityTypeChange = (value: EntityType) => {
    form.setValue('entityType', value);
    if (value === 'PERSON') {
      form.setValue('basicInfo', {
        firstName: '',
        lastName: '',
      });
    } else {
      form.setValue('basicInfo', {
        companyName: '',
        registrationNumber: '',
        taxNumber: '',
      });
    }
  };
  
  const resetForm = () => {
    form.reset({
      entityType: "PERSON",
      email: "",
      phoneNumbers: [{ number: "" }],
      addresses: [{ streetAddress: "", city: "" }],
      basicInfo: {
        firstName: '',
        lastName: '',
        //entityType: 'PERSON',
      },
    });
  }


  const onSubmit = async (data: ClientForm) => {
    let querry : Person | Organization;
    
    if (data.entityType === "PERSON") {
        const personInfo = data.basicInfo as { firstName: string; lastName: string };

      querry  = {
        partnerType: "CLIENT",
        entityType:"PERSON",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        firstName: personInfo.firstName,
        lastName: personInfo.lastName
      };

      addPerson(querry as Person,{
        onSuccess: (response) => {
          toast.success(response.message)
          resetForm()
        },
        onError:(response) =>{
          toast.error(response.message)
        }
      }

      )
    } else {
      const companyInfo = data.basicInfo as {
        companyName: string;
        registrationNumber?: string;
        taxNumber?: string;
      };
      querry = {
        partnerType: "CLIENT",
        entityType:"ORGANIZATION",
        email: data.email,
        phoneNumbers: data.phoneNumbers,
        addresses: data.addresses,
        companyName: companyInfo.companyName,
        registrationNumber: companyInfo.registrationNumber,
        taxNumber: companyInfo.taxNumber
      };

      addOrganization(querry as Organization,{
        onSuccess: (response) => {
          toast.success(response.message)
          resetForm()
        },
        onError:(response)=>{
          toast.error(response.message)
        }
      })
    }
    
    console.log('Form data to submit:', querry);
    
    
  };
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ajouter un nouveau client</h1>
      </div>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Section principale avec sélection du type d'entité et informations de base */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sélection du type d'entité */}
          <div className="lg:col-span-4">
            <Card className="h-full">
              <CardBody>
                <EntityTypeSelection 
                  value={entityType} 
                  onChange={handleEntityTypeChange}
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
            onClick={resetForm}
            disabled={isPending}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Annuler
          </Button>
          <Button 
            type="submit"
            disabled={isPending}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Ajout en cours...
              </div>
            ) : (
              "Ajouter client"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddClientPage;