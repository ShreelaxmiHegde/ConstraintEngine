import "dotenv/config";

export const NODE_ENV = process.env.NODE_ENV;
export const fastapiURL = process.env.FASTAPI_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
export const ACCESS_TTL = '1m';
export const REFRESH_TTL_SEC = 60 * 60 * 24 * 7; // 7days