import { Separator } from "@radix-ui/react-select";
import Statistics from "./components.tsx/statistics";
import ShouldBeDeliveredReparations from "../reparation/components/ShouldBeDeliveredReparations";
import ReparationByCallNumberForm from "./components.tsx/ReparationByCallNumberForm";

const Dashboard : React.FC = () => {
    return (
        <>
        <Statistics />
        <Separator className="pt-3 pb-3" />
        <ReparationByCallNumberForm />
        
        <ShouldBeDeliveredReparations />
        </>
    );
}
export default Dashboard ;