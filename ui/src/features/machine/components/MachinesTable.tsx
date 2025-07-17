import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import { Machine } from "@/services/api/machine/types";
import { DynamicPartner } from "@/services/api/partner/types";
import UpdateMachineForm from "../UpdateMachineForm";
import { useMemo, useState, useEffect } from "react";
import { useDeleteMachine } from "@/services/api/machine/hook";
import { toast } from "react-toastify";

type MachinesTableProps = {
    machines: Machine[]
    isPending: boolean
}

type TransformedData = {
    id: number
    designation: string
    reference: string
    partner: string
}

const MachinesTable: React.FC<MachinesTableProps> = ({ machines }) => {
    const [localMachines, setLocalMachines] = useState<Machine[]>(machines)
    const [machine, setMachine] = useState<Machine>()
    const [isUpdating, setIsUpdating] = useState<boolean>(false)
    const { mutate: deleteMachine } = useDeleteMachine()

    // Update localMachines when machines prop changes (navigation)
    useEffect(() => {
        setLocalMachines(machines)
    }, [machines])

    const head = ["Client", "Designation", "Reference"]
    
    const getPartner = (partner: DynamicPartner) => {
        if (partner.entityType === "PERSON") {
            return partner.fullName
        } else {
            return partner.companyName
        }
    }

    const tableData: TransformedData[] = useMemo(() => {
        return localMachines.map(machine => ({
            id: machine.id,
            partner: getPartner(machine.partner),
            designation: machine.designation,
            reference: machine.reference,
        }))
    }, [localMachines]);

    const onEdit = (tMachine: TransformedData) => {
        const foundMachine = localMachines.find((machine) => machine.id === tMachine.id)
        setMachine(foundMachine)
        setIsUpdating(true)
    }

    const onDelete = (id: number) => {
        deleteMachine(id, {
            onSuccess: (response) => {
                toast.success(response.message)
                setLocalMachines(prev => prev.filter(machine => machine.id !== id))
            },
            onError: (response) => {
                toast.error(response.message)
            }
        })
    }

    const onUpdateSuccess = (updatedMachine: Machine) => {
        setLocalMachines((prev) =>
            prev.map(machine =>
                machine.id === updatedMachine.id ? updatedMachine : machine
            )
        )
        setIsUpdating(false);
        setMachine(undefined);
    };

    return (
        <>
            <Table
                head={head}
                data={tableData}
                variant={"WithActions"}
                onDelete={onDelete}
                onEdit={onEdit}
            />
            <Modal
                title="Modifier détail de la machine"
                isOpen={isUpdating}
                onClose={() => setIsUpdating(false)}
                size="md"
            >
                <UpdateMachineForm
                    onUpdateSuccess={onUpdateSuccess}
                    initialMachine={machine}
                />
            </Modal>
        </>
    );
}

export default MachinesTable;