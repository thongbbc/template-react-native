import BaseService from '.';
// import { RegisterAction, AnnotatedData, Registration } from '../types';
import { RequestMethod } from '../constants/action-names';

export default class RegisterService {
  private baseService: BaseService;
  constructor(baseService: BaseService) {
    this.baseService = baseService;
  }

  // public async signUp(body: RegisterAction): Promise<AnnotatedData<Registration>> {
  //   try {
  //     const response: AnnotatedData<AnnotatedData<Registration>> = await this.baseService.request(
  //       RequestMethod.POST,
  //       '/users',
  //       {
  //         email: body.email,
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