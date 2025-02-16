import { PHASE_PRODUCTION_BUILD } from "next/dist/shared/lib/constants";

// Environment constants.

export enum ENVIRONMENT {
  Production = "production",
  Staging = "staging",
  Development = "development",
  Local = "local",
}

export const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV || ENVIRONMENT.Local;

export const IS_PRODUCTION = NODE_ENV === ENVIRONMENT.Production;

export const IS_STAGING = NODE_ENV === ENVIRONMENT.Staging;

export const IS_DEVELOPMENT = NODE_ENV === ENVIRONMENT.Development;

export const IS_LOCAL = NODE_ENV === ENVIRONMENT.Local;

export const SCHEME = IS_LOCAL ? "http" : "https";

// Next.js constants.

export const NEXT_PHASE = process.env.NEXT_PHASE || "";

export const NEXT_REVALIDATE_DURATION = IS_LOCAL ? 0 : 60 * 60;

export const NEXT_IMAGE_QUALITY = 75;

export const IS_BUILDING = NEXT_PHASE === PHASE_PRODUCTION_BUILD;

// Websites constants.

export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "localhost:3000";
