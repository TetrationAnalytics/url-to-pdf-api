/* eslint-disable no-process-env */

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  ALLOW_HTTP: process.env.ALLOW_HTTP === 'true',
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  IGNORE_HTTPS_ERRORS: process.env.IGNORE_HTTPS_ERRORS === 'true',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  API_TOKENS: [],
  BASEHOST: process.env.BASEHOST,
  PROTOCOL: process.env.PROTOCOL,
  USERNAME_SELECTOR: process.env.USERNAME_SELECTOR,
  PASSWD_SELECTOR: process.env.PASSWD_SELECTOR,
  SIGN_IN_SELECTOR: process.env.SIGN_IN_SELECTOR,
  AUTH_PATH: process.env.AUTH_PATH,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  ALLOW_UNKNOWN_BODY: process.env.ALLOW_UNKNOWN_BODY,
  HDFS_USER: process.env.HDFS_USER,
  HDFS_HOST: process.env.HDFS_HOST,
  HDFS_PORT: process.env.HDFS_PORT,
  HDFS_PATH: process.env.HDFS_PATH,
};

if (process.env.API_TOKENS) {
  config.API_TOKENS = process.env.API_TOKENS.split(',');
}

module.exports = config;
