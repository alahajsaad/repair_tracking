import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import { Reparation } from "@/services/api/reparation/types";
import { useDeleteReparationDetail } from "@/services/api/reparation_details/hooks";
import { ReparationDetail } from "@/services/api/reparation_details/types";
import { useState } from "react";
import ReparationDetailForm from "../forms/ReparationDetailForm";
import { Button } from "@/components/ui";
type ReparationDetailsTableTypes = {
    reparation: Reparation | undefined;
};
const ReparationDetailsTable : React.FC<ReparationDetailsTableTypes> = ({reparation}) => {
    const [isUpdating,setIsUpdating]=useState<boolean>(false)
    const [reparationDetail,setReparationDetail] =useState<ReparationDetail>()
    const [isAdding,setIsAdding]=useState<boolean>(false)

    const {mutate:deleteReparationDetail} = useDeleteReparationDetail()
    
    const head = ["Description","Prix"]
    const onEdit = (detail:ReparationDetail) => {
        setReparationDetail(detail)
        setIsUpdating(true)
    }
    const onDelete = (id:number) => {
        deleteReparationDetail(id)
    }
    
    const onUpdateSuccess = () => {
        setIsUpdating(false);
        setReparationDetail(undefined);
    };
    const onAddSuccess = () => {
        setIsAdding(false);
        setReparationDetail(undefined);
    };

     // Gestion du cas où reparation est undefined
    if (!reparation) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-500">Chargement des informations...</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
        <div className="flex justify-end mt-4 mb-2">
            <Button onClick={() => setIsAdding(true)}>Ajouter</Button>
        </div>
        <Table head={head} data={reparation.detailsList} variant={"WithActions"} onEdit={onEdit} onDelete={onDelete} />
        <Modal
            title="Modifier detail du reparation"
            isOpen={isUpdating}
            onClose={() => setIsUpdating(false)}
            size="md"
            >
            <ReparationDetailForm onUpdateSuccess={onUpdateSuccess} initialReparationDetail={reparationDetail} />
        </Modal>

        <Modal
            title="Ajouter un nouveau detail"
            isOpen={isAdding}
            onClose={() => setIsAdding(false)}
            size="md"
            >
            <ReparationDetailForm onAddSuccess={onAddSuccess}  partnerId={reparation.machine.partner.id}/>
        </Modal>
        </>
    );
}
export default ReparationDetailsTable ;