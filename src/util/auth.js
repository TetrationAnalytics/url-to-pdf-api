const config = require('../config');
const logger = require('./logger')(__filename);

const getBaseUrl = () => `${config.PROTOCOL}://${config.BASEHOST}`;

const getAuth = async (page, username, passwd) => {
  const baseUrl = getBaseUrl();

  logger.info('baseUrl =', `${baseUrl}/${config.AUTH_PATH}`);
  logger.info('username =', username);
  logger.info('passwd =', passwd);

  await page.goto(`${baseUrl}/${config.AUTH_PATH}`);
  await page.click(config.USERNAME_SELECTOR);
  await page.keyboard.type(`${username}`);
  await page.click(config.PASSWD_SELECTOR);
  await page.keyboard.type(`${passwd}`);
  await page.click(config.SIGN_IN_SELECTOR);
};

module.exports = {
  getAuth,
};
