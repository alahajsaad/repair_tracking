import { DynamicPartner } from "@/services/api/partner/types";
import { getShowPartnerDtos } from "@/services/api/partner/utils";
import Table from "src/components/ui/Table";

type PartnerTableProps = {
    partners: DynamicPartner[]
}

const PartnerTable : React.FC<PartnerTableProps> = ({partners}) => {
    const head = ["Partenaire", "type", "e-mail"];
    return (
        <Table data={getShowPartnerDtos(partners)} head={head} variant={"WithNavigation"} />
    );
}
export default PartnerTable ;