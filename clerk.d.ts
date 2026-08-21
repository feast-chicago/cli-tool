import { BusinessMetadata } from "./schema";

export {};

declare global {
  interface UserPublicMetadata {
    businesses: BusinessMetadata[];
  }

  interface ClerkError {
    message: string;
    long_message: string;
    code: string;
    meta: unknown;
    clerk_trace_id: string;
  }

  interface ClerkErrorResponse {
    errors: ClerkError[];
    meta: unknown;
    clerk_trace_id: string;
  }
}
