import { getPartnerName } from "@/features/reparation/components/utils";
import { DynamicPartner, EntityType } from "@/services/api/partner/types";
import { useMemo } from "react";
import Table from "src/components/ui/Table";

type PartnerTableProps = {
    partners: DynamicPartner[]
}
type TransformedData = {
       id:number
       partnerName : string
       entityType : EntityType
       phoneNumbers : string
}

const PartnerTable : React.FC<PartnerTableProps> = ({partners}) => {
const head = ["Partenaire", "Type", "Numéros de téléphone"];
   

     const tableData: TransformedData[] = useMemo(() => {
        return partners.map(partner => ({
            id: partner.id,
            partnerName: getPartnerName(partner),
            entityType: partner.entityType,
            phoneNumbers: partner.phoneNumbers.map(p => p.number).join(" / ")

        }))
    }, [partners]);
    return (
        <Table data={tableData} head={head} variant={"WithNavigation"} />
    );
}
export default PartnerTable ;