// CONFIG API
const SSL = true;
const PORT: number = 80;
const PORT_WEB: number = 9999;
const HOST = `${SSL ? 'https://' : 'http://'}sms-creta-tech.herokuapp.com`;
// const HOST = `${SSL ? 'https://' : 'http://'}172.16.1.27`;
const VERSION = '';
const BASE_URL: string = HOST + (PORT != 80 ? `:${PORT}` : '');
const DEFAULT_TIMEOUT: number = 30000;

export {
  PORT_WEB,
  VERSION,
  BASE_URL,
  DEFAULT_TIMEOUT,
}