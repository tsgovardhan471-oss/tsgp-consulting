import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type InquiryId = bigint;
export interface Inquiry {
    id: InquiryId;
    name: string;
    sector: Sector;
    company: string;
    message: string;
    timestamp: bigint;
    staffCount: bigint;
}
export interface UserProfile {
    name: string;
}
export enum Sector {
    BPO = "BPO",
    BFSI = "BFSI",
    NBFC = "NBFC",
    Other = "Other"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteInquiry(id: InquiryId): Promise<void>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitInquiry(name: string, company: string, sector: Sector, staffCount: bigint, message: string, timestamp: bigint): Promise<void>;
}
