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
  // <- add this (optional so existing code still compiles)
  assignedBrokerCompanyName?: string | null;
}

interface BrokerDto {
  username: string | null;
  location: string | null;
}

export interface Typo {
  brokerUsername: string | null;
  brokerLocation: string | null;

  type: HouseType;
  property_type: PropertyType;

  location: string;
  price: number;
  bedroom: number | null;
  bathroom: number | null;
  area: string;

  searchLocation: string | null;
  searchPrice: { min: number | null; max: number | null };
  searchBedroom: { min: number | null; max: number | null };
  searchBathroom: { min: number | null; max: number | null };

  file: File | null;

  broker: BrokerDto | null;
  house: HouseDto | null;
  houses: HouseDto[];
  brokers: BrokerDto[];

  bookmarks: {
    id: string;
    house: HouseDto;
    user: { id: number; email: string };
  }[];

  notifications: {
    id: string;
    type: HouseType;
    house: HouseDto;
    user: { id: number };
  }[];

  priceOptions: number[];

  minPrice: number | null;
  maxPrice: number | null;
  minBedroom: number | null;
  maxBedroom: number | null;
  minBathroom: number | null;
  maxBathroom: number | null;

  uploading: boolean;
  notificationCounter: number;
}
