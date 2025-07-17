import { DynamicPartner, EntityType } from "@/services/api/partner/types";

export const getStatusStyle = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return 'min-w-[70px] bg-yellow-100 text-yellow-800 px-2 py-1 rounded';
    case 'COMPLETED':
      return 'min-w-[70px] bg-green-100 text-green-800 px-2 py-1 rounded';
    default:
      return 'min-w-[70px] bg-gradient-to-r from-gray-400 to-gray-500 text-white px-2 py-1 rounded';
  }
};


export const getStatusText = (status: string) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'En cours';
      case 'COMPLETED':
        return 'Terminée';
      default:
        return status;
    }
}

export const RepairStatusMap = new Map<string, string>([
      ["ALL", "Toutes les réparations"],
      ["IN_PROGRESS", "En cours"],
      ["COMPLETED", "Terminée"],
]);


export type DistractedDynamicPartner = {
    id: number;
    partnerName: string;
    entityType: EntityType;
    email: string;
}


export const getPartnerName = (partner: DynamicPartner): string => {
  if (partner.entityType === 'PERSON') {
    const firstName = partner.firstName ?? '';
    const lastName = partner.lastName ?? '';
    return `${firstName} ${lastName}`.trim();
  } else {
    return partner.companyName ?? '';
  }
};

export const getDistractedDynamicPartner = (partners: DynamicPartner[]): DistractedDynamicPartner[] => {
  return partners.map((partner) => ({
    id: partner.id,
    partnerName: getPartnerName(partner),
    entityType: partner.entityType, 
    email: partner.email,
  }));
};
