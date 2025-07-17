import { Separator } from "@radix-ui/react-select";
import ShouldBeDeliveredReparations from "../reparation/components/shouldBeDeliveredReparations";
import Statistics from "./components.tsx/statistics";

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