import { useParams } from "react-router-dom";

export function useGetIdFromParams() {
  const { id } = useParams<{ id: string }>();
  const numericId = id ? parseInt(id, 10) : -1;

  return { numericId };
}
