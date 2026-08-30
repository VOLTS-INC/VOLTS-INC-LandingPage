import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface BookingRequest {
    id: bigint;
    service: string;
    contact: string;
    handled: boolean;
    name: string;
    createdAt: Time;
    message: string;
    preferredTime: string;
}
export interface Service {
    id: bigint;
    duration: string;
    name: string;
    description: string;
    price: string;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface DayHours {
    hours: string;
    days: string;
}
export interface GalleryImage {
    id: bigint;
    url: string;
    caption: string;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface BusinessInfo {
    tagline: string;
    name: string;
    email: string;
    address: string;
    openingHours: Array<DayHours>;
    phone: string;
}
export interface TeamMember {
    id: bigint;
    bio: string;
    name: string;
    role: string;
    photo: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Testimonial {
    id: bigint;
    quote: string;
    author: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBookingRequest(id: bigint): Promise<void>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getBusinessInfo(): Promise<BusinessInfo>;
    getCallerUserRole(): Promise<UserRole>;
    getGallery(): Promise<Array<GalleryImage>>;
    getServices(): Promise<Array<Service>>;
    getTeam(): Promise<Array<TeamMember>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    isCallerAdmin(): Promise<boolean>;
    listBookingRequests(): Promise<Array<BookingRequest>>;
    schema(): Promise<string>;
    setBookingRequestHandled(id: bigint, handled: boolean): Promise<void>;
    submitBookingRequest(name: string, contact: string, service: string, preferredTime: string, message: string): Promise<bigint>;
}
