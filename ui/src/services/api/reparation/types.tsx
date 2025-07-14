import { Machine } from "../machine/types"
import { ReparationDetail } from "../reparation_details/types"

export type ReparationCreationDto = {
    callNumber:string
    customerComplaint:string
    machine:{
        id:number
    }
}

export type RepairStatus ="ALL" | "IN_PROGRESS" | "COMPLETED" | "DELIVERED"

export type Reparation = {
    id:number
    callNumber:string
    customerComplaint:string
    entryDate:string
    releaseDate:string
    repairStatus:RepairStatus
    detailsList:ReparationDetail[]
    machine:Machine

}


export type GetReparationParams = {
    fromDate?:string
    toDate?:string
    repairStatus?:RepairStatus
    partnerId?:number
    machineId?:number
    page?:number
    size?:number
}