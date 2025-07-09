// src/App.tsx
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Paths } from './lib/Paths';
import AddClientPage from './features/partner/pages/AddClientPage';
import PartnerDetails from './features/partner/pages/PartnerDetails';
import ConsultPartnersPage from './features/partner/pages/ConsultPartnersPage';
import DashboardLayout from './utils/DashBoardLayout';
import Dashboard from './features/dashboard/dashboard';
import AddReparation from './features/reparation/AddReparation';
import ConsultReparations from './features/reparation/ConsultReparations';
import ReparationDetails from './features/reparation/ReparationDetails';
import MachineForm from './features/machine/MachineForm';
import ConsultMachines from './features/machine/ConsultMachines';
import MachineDetails from './features/machine/MachineDetails';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
    <Routes>
      <Route element={<DashboardLayout />}>
        {/* Par défaut, rediriger vers /clients */}
        <Route index element={<Navigate to={Paths.dashboard} replace />} />

        <Route path={Paths.dashboard} element={<Dashboard />} />
        
        <Route path={Paths.addReparation} element={<AddReparation />} />
        <Route path={Paths.reparations}>
          <Route index element={<ConsultReparations />} />
          <Route path={Paths.reparation} element={<ReparationDetails />} />
        </Route>

        <Route path={Paths.addMachine} element={<MachineForm />} />
        <Route path={Paths.machines}>
          <Route index element={<ConsultMachines />} />
          <Route path={Paths.machine} element={<MachineDetails />} />
        </Route>

        <Route path={Paths.addClient} element={<AddClientPage />} />
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
