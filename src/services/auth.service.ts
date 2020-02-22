import BaseService from '.';
import { RequestMethod } from '@constants';

export default class AuthService {
  private baseService: BaseService;
  constructor(baseService: BaseService) {
    this.baseService = baseService;
  }

  // public async login(body: AuthAction): Promise<AnnotatedData<Authentication>> {
  //   try {
  //     const response: AnnotatedData<AnnotatedData<Authentication>> = await this.baseService.request(
  //       RequestMethod.POST,
  //       '/users/login',
  //       {
  //         password: body.password,
  //         username: body.userName
  //       },
  //     );
  //     return response.data;
  //   } catch (err) {
  //     return Promise.reject(err);
  //   }
  // };
}