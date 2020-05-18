// CONFIG API
const SSL = false;
const PORT: number = 3000;
const PORT_WEB: number = 9999;
const HOST = `${SSL ? 'https://' : 'http://'}sms.creta.tech`;
const VERSION = '';
const BASE_URL: string = HOST + `:${PORT}`;
const DEFAULT_TIMEOUT: number = 30000;

export {
  PORT_WEB,
  VERSION,
  BASE_URL,
  DEFAULT_TIMEOUT,
}