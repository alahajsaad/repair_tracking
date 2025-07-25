import { SearchInput } from "@/components/ui";
import List from "@/components/ui/List";
import { DistractedDynamicPartner, getDistractedDynamicPartner } from "@/features/reparation/components/utils";
import { useGetPartners } from "@/services/api/partner/hooks";
import { DynamicPartner, PartnerType } from "@/services/api/partner/types";
import { useCallback, useEffect, useRef, useState } from "react";


type SearchPartnerProps = {
    partnerType: PartnerType;
    setPartner: (partner: DynamicPartner | undefined) => void;
    partner:DynamicPartner | undefined
    label? : string
}

const SearchPartner: React.FC<SearchPartnerProps> = ({ partnerType, setPartner ,partner,label}) => {
    const [searchKey, setSearchKey] = useState<string>();
    const [displayValue, setDisplayValue] = useState<string>(); // Separate display value
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedPartner, setSelectedPartner] = useState<DistractedDynamicPartner | null>(null);
    const justSelected = useRef(false);
    
    const { data: partners, isPending, refetch } = useGetPartners({
        keyword: searchKey,
        partnerType: partnerType,
        page: 0,
        size: 10
    });
    
    const PartnerDtos: DistractedDynamicPartner[] = getDistractedDynamicPartner(partners?.content || []);

    useEffect(()=>{
         if (!partner) {
            setSelectedPartner(null)
            setDisplayValue(undefined)
        }
    },[partner]) 

   
    useEffect(() => {
        if (searchKey && !selectedPartner) {
            refetch();
        }
    }, [searchKey, refetch, selectedPartner]);
    
    const handleSearchChange = useCallback((value: string)=>{
        // Prevent opening immediately after selection
        if (justSelected.current) {
            justSelected.current = false;
            return;
        }
        setDisplayValue(value);
        setSearchKey(value);
        setSelectedPartner(null); // Clear selection when typing
        
        // Only open the dropdown if there's search text
        if (value.trim() !== '') {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    } ,[])

    const getDisplayValue = (selectedPartner: DistractedDynamicPartner) => {
    const phones = selectedPartner.phoneNumbers
        .map(phone => phone.number)
        .join(" | ");
        
    return `${selectedPartner.partnerName} | ${phones}`;
    };


    const handlePartnerSelect = (selectedPartner: DistractedDynamicPartner) => {
            justSelected.current = true; // Prevent immediate reopen
            setSelectedPartner(selectedPartner);
            setPartner(partners?.content.find((partner) => partner.id === selectedPartner.id));
            setDisplayValue(getDisplayValue(selectedPartner));
            setIsOpen(false);
           
    };

    const handleFocus = () => {
        if (selectedPartner) {
            setSelectedPartner(null);
            setDisplayValue(undefined);
            setSearchKey(undefined);
        }
        // Open dropdown if there's text to search
        if (displayValue?.trim()) {
             setIsOpen(true);
        }
       
    };

    
    return (
        <div className="relative">
            <SearchInput
                placeholder={partnerType === "SUPPLIER" ? "Rechercher un fournisseur..." : "Rechercher un client..."}
                setSearchKey={handleSearchChange}
                isPending={isPending}
                value={displayValue}
                onfocus={handleFocus}
                label={label}
            />
           
            <List
                data={PartnerDtos}
                setSelectedItem={handlePartnerSelect}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                showedAttribute={["partnerName"]}
            />
        </div>
    );
}

export default SearchPartner;