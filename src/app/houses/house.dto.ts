export interface HouseDto {
  id: string;
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
