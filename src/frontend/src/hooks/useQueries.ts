import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { BookingRequest, BusinessInfo } from "../backend";
import { createActor } from "../backend";

export function useGetBusinessInfo() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BusinessInfo>({
    queryKey: ["businessInfo"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getBusinessInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor(createActor);
  const { identity } = useInternetIdentity();

  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useListBookingRequests(enabled: boolean) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<BookingRequest[]>({
    queryKey: ["bookingRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBookingRequests();
    },
    enabled: !!actor && !isFetching && enabled,
  });
}

export function useSetBookingRequestHandled() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: bigint; handled: boolean }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.setBookingRequestHandled(params.id, params.handled);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}

export function useDeleteBookingRequest() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteBookingRequest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingRequests"] });
    },
  });
}
