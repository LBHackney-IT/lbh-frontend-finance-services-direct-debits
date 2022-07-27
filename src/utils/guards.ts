import type { PersonSearchResult } from "@mtfh/common/lib/api/person/v1";

import type { AssetSearchResult, TenureSearchResult } from "../types";

export const isPerson = (
  person: Record<string, any>
): person is PersonSearchResult => {
  return (person as PersonSearchResult).firstname !== undefined;
};

export const isTenure = (
  tenure: Record<string, any>
): tenure is TenureSearchResult => {
  return (tenure as TenureSearchResult).paymentReference !== undefined;
};

export const isAsset = (
  asset: Record<string, any>
): asset is AssetSearchResult => {
  return (asset as AssetSearchResult).assetId !== undefined;
};
