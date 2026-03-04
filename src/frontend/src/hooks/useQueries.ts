import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Inquiry, type InquiryId, Sector } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      company,
      sector,
      staffCount,
      message,
    }: {
      name: string;
      company: string;
      sector: Sector;
      staffCount: bigint;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const timestamp = BigInt(Date.now());
      await actor.submitInquiry(
        name,
        company,
        sector,
        staffCount,
        message,
        timestamp,
      );
    },
  });
}

export function useDeleteInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: InquiryId) => {
      if (!actor) throw new Error("Not connected");
      await actor.deleteInquiry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export { Sector };
