import {
  AssetAddress,
  AssetTenure,
  AssetType,
} from "@mtfh/common/lib/api/asset/v1";

export interface AssetSearchResult {
  id: string;
  assetId: string;
  assetType: AssetType;
  assetAddress: AssetAddress;
  tenure: AssetTenure;
}
