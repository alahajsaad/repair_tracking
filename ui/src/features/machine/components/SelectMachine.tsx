import { useId, useState } from "react";
import { Select, SelectTrigger, SelectValue,SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/shadcn/select";
import { useGetMachinesByClientId } from "@/services/api/machine/hook";
import { DynamicPartner } from "@/services/api/partner/types";
import Label from "@/components/ui/Label";

type SelectMachineProps = {
  partner: DynamicPartner | undefined;
  onSelect: (machineId: number) => void; // callback to parent
}

const SelectMachine: React.FC<SelectMachineProps> = ({ partner, onSelect }) => {
  const { data: machines } = useGetMachinesByClientId(partner?.id);
  const [selectedMachineId, setSelectedMachineId] = useState<string>("");
  const id = useId();
  const handleChange = (value: string) => {
    setSelectedMachineId(value);
    onSelect(parseInt(value, 10));
  };

  const isDisabled = !machines || machines.data.length === 0;

  return (
    <>
    <Label id={id}>Sélectionnez une machine</Label>
    <Select  value={selectedMachineId} onValueChange={handleChange} disabled={isDisabled}>
      <SelectTrigger id={id} className="w-full">
         <SelectValue placeholder={isDisabled ? "Aucune machine trouvée" : "Sélectionner une machine"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Machines disponibles</SelectLabel>
          {machines?.data.map((machine) => (
            <SelectItem key={machine.id} value={machine.id.toString()}>
              {machine.designation + " | " + machine.reference}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </>
  );
};

export default SelectMachine;
