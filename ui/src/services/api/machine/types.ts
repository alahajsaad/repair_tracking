import { DynamicPartner } from "../partner/types"

export type MachineCreationDto = {
    reference: string
    designation:string
    partner:{
        id:number
        entityType: "PERSON" | "ORGANIZATION"
    }
}

export type Machine = {
    id:number
    reference: string
    designation:string
    partner: DynamicPartner
}

export type GetMachinesParams = {
    partnerId?:number
    page?:number
    size?:number
}