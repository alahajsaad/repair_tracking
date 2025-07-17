import { Separator } from "@radix-ui/react-select";
import Statistics from "./components.tsx/statistics";
import ShouldBeDeliveredReparations from "../reparation/components/ShouldBeDeliveredReparations";

const Dashboard : React.FC = () => {
    return (
        <>
        <Statistics />
        <Separator className="pt-4 pb-4" />
        <ShouldBeDeliveredReparations />
        </>
    );
}
export default Dashboard ;