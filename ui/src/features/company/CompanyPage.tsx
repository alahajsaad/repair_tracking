import React, { useState } from 'react';
import { useGetIsCompanyExist , useGetCompany , useGetCompanyLogo } from '@/services/api/company/hooks';
import CompanyForm from './components/CompanyForm';
import Modal from '@/components/ui/Modal';

const CompanyPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: companyExists, isLoading: isCheckingExistence, error: existenceError } = useGetIsCompanyExist();
  const { data: company, isLoading: isLoadingCompany, error: companyError } = useGetCompany();
  const { data: logoBlob, isLoading: isLoadingLogo } = useGetCompanyLogo(company?.logoUrl || '');

   const onUpdateSuccess = () => {
          setIsEditing(false); 
    };
  // Show loading state while checking if company exists
  if (isCheckingExistence) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Vérification du statut de l'entreprise...</div>
      </div>
    );
  }

  // Handle existence check error
  if (existenceError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Erreur lors de la vérification du statut de l'entreprise : {existenceError.message}</div>
      </div>
    );
  }

  // If company doesn't exist, show the form to create one
  if (!companyExists) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <CompanyForm />
        </div>
      </div>
    );
  }

  

  // Show loading state while fetching company data
  if (isLoadingCompany) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Chargement des détails de l'entreprise...</div>
      </div>
    );
  }

  // Handle company data fetch error
  if (companyError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Erreur lors du chargement de l'entreprise : {companyError.message}</div>
      </div>
    );
  }

  // Show company details
  return (
    <div className="container mx-auto px-4 py-8 bg-white rounded-lg shadow-md">
      <div className="max-w-4xl mx-auto">
       
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Détails de l'entreprise</h1>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Mettre à jour l'entreprise
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Logo and Company Information */}
            <div className="space-y-6">
              {/* Company Logo */}
              <div className="flex justify-center">
                {company?.logoUrl && (
                  <div className="w-48 h-48  rounded-lg flex items-center justify-center overflow-hidden">
                    {isLoadingLogo ? (
                      <div className="text-gray-500">Chargement du logo...</div>
                    ) : logoBlob ? (
                      <img
                        src={URL.createObjectURL(logoBlob)}
                        alt="Logo de l'entreprise"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500">Aucun logo disponible</div>
                    )}
                  </div>
                )}
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise : <span className='font-bold'>{company?.companyName}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse : <span className='font-bold'>{company?.companyAddress}</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de téléphone : <span className='font-bold'>{company?.companyPhoneNumber}</span>
                  </label>
                 
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email : <span className='font-bold'>{company?.companyEmail}</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Column - General Conditions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conditions générales
              </label>
              <div className="text-lg text-gray-900 border border-gray-200 p-3 rounded-lg h-full min-h-[300px]">
                {company?.generalConditions}
              </div>
            </div>
          </div>
      </div>

      <Modal
            title="Mettre à jour votre entreprise"
            isOpen={isEditing}
            onClose={() => setIsEditing(false)}
            size="lg"
            >
            <CompanyForm initialCompany={company}  onUpdateSuccess={onUpdateSuccess}/>
        </Modal>
    </div>
  );
};

export default CompanyPage;