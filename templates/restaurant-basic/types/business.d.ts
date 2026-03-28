// types/business.d.ts
export interface Business {
  id: string;
  name: string;
  tagline: string | null;
  category: (
    | "restaurant"
    | "cafe"
    | "bar"
    | "bakery"
    | "food truck"
    | "other"
  )[];
  description: string;
  phone: number;
  email: string;
  addressLine1: string;
  addressLine2: string | null;
  addressCity: string;
  addressState: string;
  addressZip: number;
  created_at: Date;
}

/*
 * Legal name
 * DBA
 * Hours
 * Integrations
 */
