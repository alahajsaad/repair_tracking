import { useMutation } from "@tanstack/react-query";
import { Person } from "../types";
import { addPerson, updatePerson } from "./api";
import { ApiResponse } from "@/types";



export const useAddPerson = () => {
  
  return useMutation<ApiResponse<Person>, Error, Person>({
    mutationFn: (person: Person) =>
      addPerson(person).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Person>;
      }),
  });
};

export const useUpadtePerson = () => {
  
  return useMutation<ApiResponse<Person>, Error, Person>({
    mutationFn: (person: Person) =>
      updatePerson(person).then(response => {
        if (response.status === 'error') {
          throw new Error(response.message);
        }
        return response as ApiResponse<Person>;
      }),
  });
};