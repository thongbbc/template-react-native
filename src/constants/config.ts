// CONFIG API
const SSL = false;
const PORT: number = 3000;
const PORT_WEB: number = 9999;
const HOST = `${SSL ? 'https://' : 'http://'}xxx.xxx.xxx`;
const VERSION = '/v1';
const BASE_URL: string = HOST + `:${PORT}`;
const DEFAULT_TIMEOUT: number = 30000;

export {
  PORT_WEB,
  VERSION,
  BASE_URL,
  DEFAULT_TIMEOUT,
}