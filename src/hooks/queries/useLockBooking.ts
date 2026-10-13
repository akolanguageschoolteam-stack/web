import { useMutation } from "@tanstack/react-query";
import { lockBookingApi } from "@/api/client/apiRoutes";
import { ApiResponseType } from "@/types/GlobalTypes";

export interface LockBookingData {
    lock_id: number;
    property_id: number;
    property_room_id: number;
    check_in: string;
    check_out: string;
    rooms: number;
    expires_at: string;
    expires_in_seconds: number;
    status: string;
}

export interface LockBookingFilters {
    platform?: string;
    property_room_id?: string | number;
    property_slug?: string;
    check_in?: string;
    check_out?: string;
    rooms?: number;
}

export interface LockBookingApiResponse extends Omit<ApiResponseType, 'data'> {
    data: LockBookingData;
}

export const useLockBooking = () => {
    return useMutation<LockBookingApiResponse, Error, LockBookingFilters>({
        mutationFn: async (filters: LockBookingFilters) => {
            try {
                const response = await lockBookingApi({
                    platform: 'web',
                    property_room_id: filters.property_room_id,
                    property_slug: filters.property_slug,
                    check_in: filters.check_in,
                    check_out: filters.check_out,
                    rooms: filters.rooms,
                });
                if (response?.error) {
                    throw new Error(response?.message || "Failed to lock booking");
                }
                return response as LockBookingApiResponse;
            } catch (error: any) {
                const apiMessage =
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to lock booking";
                throw new Error(apiMessage);
            }
        },
    });
};