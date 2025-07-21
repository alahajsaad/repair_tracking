import { useMutation, useQueryClient } from "@tanstack/react-query";
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

export const useUpdatePerson = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Person>, Error, Person>({
    mutationFn: async (person: Person) => {
      const response = await updatePerson(person);
      if (response.status === 'error') {
        throw new Error(response.message);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners', id] });
    },
  });
};