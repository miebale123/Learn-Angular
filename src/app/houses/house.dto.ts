export const HOUSE_TYPES = ['for sale', 'for rent'] as const;
export type HouseType = (typeof HOUSE_TYPES)[number];

export const PROPERTY_TYPES = ['condo', 'house', 'land'] as const;
export type PropertyType = (typeof PROPERTY_TYPES)[number];

export interface HouseDto {
  id: string;
  type: HouseType;
  property_type: PropertyType;
  secure_url: string;
  location: string;
  previousPrice?: number;
  priceReduced?: boolean;
  price: number;
  bedroom: number | null;
  bathroom: number | null;
  area: string;
  userId: number;
  assignedBrokerCompanyName?: string | null;
}
