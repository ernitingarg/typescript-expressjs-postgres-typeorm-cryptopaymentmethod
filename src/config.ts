import * as dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 8000;

export const postgresConfig = {
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10),
};

export const tripleAPaymentProviderConfig = {
  merchant_key: process.env.TRIPLEA_PAYMENT_PROVIDER_MERCHANT_KEY,
  url: process.env.TRIPLEA_PAYMENT_PROVIDER_URL,
  client_id: process.env.TRIPLEA_PAYMENT_PROVIDER_CLIENT_ID,
  client_secret: process.env.TRIPLEA_PAYMENT_PROVIDER_CLIENT_SECRET,
  test_btc: process.env.TRIPLEA_PAYMENT_PROVIDER_TESTBTC,
};
