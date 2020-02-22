import AuthService from './auth.service';
import RegisterService from './register.service';
import { BASE_URL, VERSION, DEFAULT_TIMEOUT } from '@constants/config';
import axios, { AxiosError } from 'axios';
import { RequestMethod } from '@constants';

axios.interceptors.response.use(undefined, function (error: AxiosError) {
  (error as any).originalMessage = error.message;
  Object.defineProperty(error, "error", {
    get: function () {
      if (!error.response) {
        return (error as any).originalMessage;
      }
      return (error.response.data);
    }
  });
  return Promise.reject(error);
})
export default class BaseService {
  private readonly authApi: AuthService;
  private readonly registerApi: RegisterService;
  public static readonly instance: BaseService = new BaseService();

  public get register(): RegisterService {
    return this.registerApi;
  }

  public get auth(): AuthService {
    return this.authApi;
  }

  constructor() {
    if (BaseService.instance) {
      throw new Error("Error: Singleton, use BaseService.instance");
    }
    this.registerApi = new RegisterService(this);
    this.authApi = new AuthService(this);
  }



  public readonly request = (
    method: RequestMethod,
    endpoint: string,
    body?: Object,
    optionalHeaders?: Object,
  ) => {
    var options = {
      baseURL: BASE_URL,
      endpoint: `${VERSION}${endpoint}`,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        ...optionalHeaders
      }
    };

    return axios({
      baseURL: options.baseURL,
      headers: options.headers,
      timeout: DEFAULT_TIMEOUT,
      ...optionalHeaders,
      method: options.method,
      url: options.endpoint,
      data: method == 'GET' ? undefined : body
    });
  };



}