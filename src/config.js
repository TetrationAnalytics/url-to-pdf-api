/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PDF_PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.PDF_LOG_LEVEL,
  ALLOW_HTTP: process.env.PDF_ALLOW_HTTP === 'true',
  DEBUG_MODE: process.env.PDF_DEBUG_MODE === 'true',
  IGNORE_HTTPS_ERRORS: process.env.PDF_IGNORE_HTTPS_ERRORS === 'true',
  CORS_ORIGIN: process.env.PDF_CORS_ORIGIN || '*',
  API_TOKENS: [],
  BASEHOST: process.env.PDF_BASEHOST,
  PROTOCOL: process.env.PDF_PROTOCOL,
  USERNAME_SELECTOR: process.env.PDF_USERNAME_SELECTOR,
  PASSWD_SELECTOR: process.env.PDF_PASSWD_SELECTOR,
  SIGN_IN_SELECTOR: process.env.PDF_SIGN_IN_SELECTOR,
  AUTH_PATH: process.env.PDF_AUTH_PATH,
  AUTH_USERNAME: process.env.PDF_AUTH_USERNAME,
  AUTH_PASSWORD: process.env.PDF_AUTH_PASSWORD,
  ALLOW_UNKNOWN_BODY: process.env.PDF_ALLOW_UNKNOWN_BODY,
  HDFS_USER: process.env.PDF_HDFS_USER,
  HDFS_HOST: process.env.PDF_HDFS_HOST,
  HDFS_PORT: process.env.PDF_HDFS_PORT,
  WEBHDFS_URL: process.env.PDF_WEBHDFS_URL,
};

if (process.env.PDF_API_TOKENS) {
  config.API_TOKENS = process.env.PDF_API_TOKENS.split(',');
}

module.exports = config;
