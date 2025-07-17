// src/App.tsx
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Paths } from './lib/Paths';
import AddClientPage from './features/partner/pages/AddClientPage';
import PartnerDetails from './features/partner/pages/PartnerDetails';
import ConsultPartnersPage from './features/partner/pages/ConsultPartnersPage';
import DashboardLayout from './utils/DashBoardLayout';
import Dashboard from './features/dashboard/dashboard';
import AddReparation from './features/reparation/AddReparationForm';
import ConsultReparations from './features/reparation/ConsultReparations';
import ReparationDetails from './features/reparation/ReparationDetails';
import MachineForm from './features/machine/MachineForm';
import ConsultMachines from './features/machine/ConsultMachines';
import { ToastContainer } from 'react-toastify';
import EditClientPage from './features/partner/pages/EditClientPage';
import CompanyPage from './features/company/CompanyPage';

function App() {
  return (
    <>
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
