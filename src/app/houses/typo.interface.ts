import { HouseDto, HouseType, PropertyType } from './house.dto';

interface BrokerDto {
  id: string;
  username: string | null;
  location: string | null;
  secure_url: File;
  status: 'pending' | 'active' | 'deleted' | 'rejected';
}

export interface Typo {
  authModal: boolean;
  ad: boolean;
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
  searchedLocationDisplay: string | null;
  searchPrice: { min: number | null; max: number | null };
  searchBedroom: { min: number | null; max: number | null };
  searchBathroom: { min: number | null; max: number | null };

  file: File | null;

  house: HouseDto | null;
  houses: HouseDto[];
  pendingHouses: HouseDto[];
  brokers: BrokerDto[];
  pendingBrokers: BrokerDto[];

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
  bedroomCounts: number[];
  bathroomCounts: number[];

  minPrice: number | null;
  maxPrice: number | null;
  minBedroom: number | null;
  maxBedroom: number | null;
  minBathroom: number | null;
  maxBathroom: number | null;

  uploading: boolean;
  notificationCounter: number;
}

export const typoValue: Omit<Typo, 'bookmarks'> = {
  authModal: false,
  ad: true,
  brokerUsername: null,
  brokerLocation: null,

  type: 'for rent', // make sure this matches HouseType
  property_type: 'house', // make sure this matches PropertyType

  location: '',
  price: 0,
  bedroom: null,
  bathroom: null,
  area: '',

  file: null,
  house: null,
  houses: [],
  pendingHouses: [],
  brokers: [],
  pendingBrokers: [],

  notifications: [],

  searchLocation: null,
  searchedLocationDisplay: null,
  searchPrice: { min: null, max: null },
  searchBedroom: { min: null, max: null },
  searchBathroom: { min: null, max: null },

  priceOptions: [50000, 100000, 150000, 200000, 250000, 300000, 400000, 500000, 750000, 1000000],
  bedroomCounts: [1, 2, 3, 4, 5],
  bathroomCounts: [1, 2, 3, 4, 5],

  minPrice: null,
  maxPrice: null,
  minBedroom: null,
  maxBedroom: null,
  minBathroom: null,
  maxBathroom: null,

  uploading: false,
  notificationCounter: 0,
};
