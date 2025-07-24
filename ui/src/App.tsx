// src/App.tsx
import './App.css';
import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Paths } from './lib/Paths';
import DashboardLayout from './utils/DashBoardLayout'; // layout is reused, no need to lazy load

const AddClientPage = lazy(() => import('./features/partner/pages/AddClientPage'));
const PartnerDetails = lazy(() => import('./features/partner/pages/PartnerDetails'));
const ConsultPartnersPage = lazy(() => import('./features/partner/pages/ConsultPartnersPage'));
const EditClientPage = lazy(() => import('./features/partner/pages/EditClientPage'));

const Dashboard = lazy(() => import('./features/dashboard/dashboard'));

const AddReparation = lazy(() => import('./features/reparation/AddReparationForm'));
const ConsultReparations = lazy(() => import('./features/reparation/ConsultReparations'));
const ReparationDetails = lazy(() => import('./features/reparation/ReparationDetails'));

const MachineForm = lazy(() => import('./features/machine/MachineForm'));
const ConsultMachines = lazy(() => import('./features/machine/ConsultMachines'));

const CompanyPage = lazy(() => import('./features/company/CompanyPage'));


function App() {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Par défaut, rediriger vers /clients */}
        <Route index element={<Navigate to={Paths.dashboard} replace />} />

        <Route path={Paths.dashboard} element={<Dashboard />} />
        <Route path={Paths.company} element={<CompanyPage />} />
        
       
        
        <Route path={Paths.addReparation} element={<AddReparation />} />
        <Route path={Paths.reparations}>
          <Route index element={<ConsultReparations />} />
          <Route path={Paths.reparation} element={<ReparationDetails />} />
        </Route>

        <Route path={Paths.addMachine} element={<MachineForm />} />
        <Route path={Paths.machines}>
          <Route index element={<ConsultMachines />} />
        </Route>

        <Route path={Paths.addClient} element={<AddClientPage />} />
        <Route path="/clients/:id/edit" element={<EditClientPage />} />
        <Route path={Paths.clients}>
          <Route index element={<ConsultPartnersPage />} />
          <Route path={Paths.client} element={<PartnerDetails />} />
        </Route>
      </Route>

      {/* Fallback pour les routes inconnues */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
    </Suspense>
    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }} // Très important pour apparaître devant les modals
      />
      </>
  );
}

export default App;
