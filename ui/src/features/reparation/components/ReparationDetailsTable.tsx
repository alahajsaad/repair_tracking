import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import { Reparation } from "@/services/api/reparation/types";
import { useDeleteReparationDetail } from "@/services/api/reparation_details/hooks";
import { ReparationDetail } from "@/services/api/reparation_details/types";
import { useEffect, useState } from "react";
import ReparationDetailForm from "../forms/ReparationDetailForm";
import { Button } from "@/components/ui";
import { toast } from "react-toastify";
type ReparationDetailsTableTypes = {
    reparation: Reparation | undefined;
};
const ReparationDetailsTable : React.FC<ReparationDetailsTableTypes> = ({reparation}) => {
    const [isUpdating,setIsUpdating]=useState<boolean>(false)
    const [reparationDetail,setReparationDetail] =useState<ReparationDetail>()
    const [isAdding,setIsAdding]=useState<boolean>(false)
    const [reparationDetails,setReparationDetails] = useState<ReparationDetail[]>(reparation?.detailsList || [])
    const {mutate:deleteReparationDetail} = useDeleteReparationDetail()

    useEffect(() => {
        if(reparation){
            setReparationDetails(reparation?.detailsList)
        }
        
    },[reparation])
    console.log("1 : " +  reparation?.detailsList)
    console.log("2 : " +  reparationDetails)
    const head = ["Description","Prix"]
    const onEdit = (detail:ReparationDetail) => {
        setReparationDetail(detail)
        setIsUpdating(true)
    }
    const onDelete = (id: number) => {
        setReparationDetails((prev) => prev.filter((detail) => detail.id !== id));
        deleteReparationDetail(id,{
            onSuccess: (response) => {
            
                toast.success(response.message);
            },
            onError: (response) => {
                toast.error(response.message);
                
            }
        }
        );
    };

    const onUpdateSuccess = (detail: ReparationDetail) => {
        setReparationDetails((prev) => prev.map((d) => (d.id === detail.id ? detail : d)));
        setIsUpdating(false);
        setReparationDetail(undefined);
    };

    const onAddSuccess = (detail:ReparationDetail) => {
        setReparationDetails((prev) => [...prev, detail]); 
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
        <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-semibold text-gray-800">Détails de la réparation</p>
            <Button onClick={() => setIsAdding(true)}>Ajouter</Button>
        </div>

        <Table head={head} data={reparationDetails} variant={"WithActions"} onEdit={onEdit} onDelete={onDelete} />
       
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
            <ReparationDetailForm onAddSuccess={onAddSuccess}  reparationId={reparation.id}/>
        </Modal>
        </>
    );
}
export default ReparationDetailsTable ;