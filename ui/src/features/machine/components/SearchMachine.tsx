import { SearchInput } from "@/components/ui";
import List from "@/components/ui/List";
import { getPartnerName } from "@/features/reparation/components/utils";
import { useGetMachines } from "@/services/api/machine/hook";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type MachineDto = {
    id: number;
    partnerName: string;
    designation: string;
    reference: string;
}

type SearchMachineProps = {
    onMachineSelect: (machineId: number) => void;
}

const SearchMachine: React.FC<SearchMachineProps> = ({ onMachineSelect }) => {
    const [searchKey, setSearchKey] = useState<string>("");
    const [displayValue, setDisplayValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const justSelected = useRef(false);
    const [selectedMachine, setSelectedMachine] = useState<MachineDto>();

    const { data: machines, isPending, refetch } = useGetMachines({
        machineRef: searchKey,
        page: 0,
        size: 10
    });

    // Fixed: Added return statement and proper type annotation
    const MachineDtos: MachineDto[] = useMemo(() => {
        return machines?.content?.map((machine) => ({
            id: machine.id,
            partnerName: getPartnerName(machine.partner),
            designation: machine.designation,
            reference: machine.reference
        })) || [];
    }, [machines]);

    useEffect(() => {
        if (searchKey && !selectedMachine) {
            refetch();
        }
    }, [searchKey, refetch, selectedMachine]);

    const handleSearchChange = useCallback((value: string) => {
        // Prevent opening immediately after selection
        if (justSelected.current) {
            justSelected.current = false;
            return;
        }
        setDisplayValue(value);
        setSearchKey(value);

        // Only open the dropdown if there's search text
        if (value.trim() !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, []);

    const handleMachineSelect = (selectedMachine: MachineDto) => {
        justSelected.current = true;
        setSelectedMachine(selectedMachine);
        onMachineSelect(selectedMachine.id);
        setDisplayValue(`${selectedMachine.reference} - ${selectedMachine.designation}`);
        setIsOpen(false);
    };

    const handleFocus = () => {
        if (selectedMachine) {
            setSelectedMachine(undefined);
            setDisplayValue("");
            setSearchKey("");
        }
        // Open dropdown if there's text to search
        if (displayValue?.trim()) {
            setIsOpen(true);
        }
    };

    return (
        <div className="relative">
            <SearchInput
                placeholder={"EX: A50012"}
                setSearchKey={handleSearchChange}
                isPending={isPending}
                value={displayValue}
                onfocus={handleFocus}
                label={"Rechercher une machine avec référence"}
            />

            <List
                data={MachineDtos}
                setSelectedItem={handleMachineSelect}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                showedAttribute={["partnerName", "designation", "reference"]}
            />
        </div>
    );
};

export default SearchMachine;