import {
  HouseholdMember,
  TenureAsset,
  TenureType,
} from "@mtfh/common/lib/api/tenure/v1";

export interface TenureSearchResult {
  id: string;
  paymentReference: string;
  startOfTenureDate: string;
  endOfTenureDate: string | null;
  householdMembers: HouseholdMember[];
  tenureType: TenureType;
  tenuredAsset: TenureAsset;
}
