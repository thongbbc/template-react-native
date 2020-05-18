import BaseService from '.';
import { RequestMethod } from '@constants';

interface CreateNewAppAction {
  name: string
}
export default class AuthService {
  private baseService: BaseService;
  constructor(baseService: BaseService) {
    this.baseService = baseService;
  }

  public async createNewAppId(body: CreateNewAppAction): Promise<any> {
    try {
      const response = await this.baseService.request(
        RequestMethod.POST,
        '/app_id',
        {
          name: body.name,
        },
      );
      return response.data;
    } catch (err) {
      return Promise.reject(err);
    }
  };
}