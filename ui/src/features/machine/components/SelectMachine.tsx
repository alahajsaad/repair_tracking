import { DynamicPartner } from "@/services/api/partner/types";

type SelectMachineProps = {
    partner : DynamicPartner | undefined
}
const SelectMachine : React.FC<SelectMachineProps> = ({partner}) => {
    return (
        <><p>ConsultMachines</p></>
    );
}
export default SelectMachine ;