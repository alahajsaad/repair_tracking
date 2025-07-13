import { Badge } from "@/components/ui/shadcn/badge";
import Table from "@/components/ui/Table";
import { DynamicPartner } from "@/services/api/partner/types";
import { RepairStatus, Reparation } from "@/services/api/reparation/types";
import { getStatusStyle, getStatusText } from "./utils";

type ReparationsTableProps = {
  data: Reparation[];
};

type TransformedData = {
    id:number
    callNumber:string
    partner:string
    machine:string
    repairStatus:JSX.Element
    entryDate:string
    releaseDate:string
    

}
const ReparationsTable : React.FC<ReparationsTableProps> = ({data}) => {
    
    const head = ["Numéro d'appel", "Client", "Machine", "Statut de réparation", "Date d'entrée", "Date de sortie"];
    const getPartner = (partner:DynamicPartner)=>{
       if(partner.entityType === "PERSON") {
         return partner.fullName
        } else {
            return partner.companyName
        }
    }

    const getStatus = (repairStatus:RepairStatus) =>{
        return (
            <div className="flex flec-col items-center justify-center gap-0.5">
                <Badge className={getStatusStyle(repairStatus)}>
                    {getStatusText(repairStatus)}
                </Badge>
            </div>
        )
  }
  // Transformer les données des entreprises
  const tableData: TransformedData[] = data.map(reparation => ({
    id: reparation.id,
    callNumber:reparation.callNumber,
    partner: getPartner(reparation.machine.partner),
    machine:reparation.machine.designation,
    repairStatus:getStatus(reparation.repairStatus),
    entryDate:reparation.entryDate,
    releaseDate:reparation.releaseDate
  }));

  return (
    <Table head={head} data={tableData} variant={"WithNavigation"}/>
  );
}
export default ReparationsTable ;