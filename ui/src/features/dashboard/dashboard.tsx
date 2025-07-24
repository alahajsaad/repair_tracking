import { Separator } from "@radix-ui/react-select";
import Statistics from "./components.tsx/statistics";
import ShouldBeDeliveredReparations from "../reparation/components/ShouldBeDeliveredReparations";
import ReparationByCallNumberForm from "./components.tsx/ReparationByCallNumberForm";

const Dashboard : React.FC = () => {
    return (
        <>
        <Statistics />
        <Separator className="pt-4 pb-4" />
        <ReparationByCallNumberForm />
        <Separator className="pt-4 pb-4" />
        <ShouldBeDeliveredReparations />
        </>
    );
}
export default Dashboard ;