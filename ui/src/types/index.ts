


export type ApiResponse<T> = {
    status : "success" | "error",
    data : T | null,
    message : string 

}
export type Page<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number; // numéro de page actuel
}
  










