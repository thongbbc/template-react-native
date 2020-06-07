import BaseService from '.';
import { RequestMethod } from '@constants';
import AsyncStorage from '@react-native-community/async-storage';

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

  public async syncMessages(): Promise<any> {
    try {
      const _id = await AsyncStorage.getItem('_id');
      const response = await this.baseService.request(
        RequestMethod.GET,
        `/messages/app_id/${_id}/sync`,
      );
      const syncList = await AsyncStorage.getItem('syncList');
      let jsonSyncList = syncList ? JSON.parse(syncList) : [];
      if (jsonSyncList && jsonSyncList.length) {
        jsonSyncList = [...jsonSyncList, ...response.data]
      } else {
        jsonSyncList = response.data;
      }
      await AsyncStorage.setItem('syncList', JSON.stringify(jsonSyncList));
      return jsonSyncList;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  public async updateStatus(messId: string, listSync: any, isDelete = false): Promise<any> {
    try {
      const _id = await AsyncStorage.getItem('_id');
      await this.baseService.request(
        RequestMethod.PUT,
       `/messages/${messId}/app_id/${_id}`,
       {status: isDelete ? 'Deleted' : 'Completed'}
      );
      listSync = listSync.filter((item: any) => item._id !== messId);
      await AsyncStorage.setItem('syncList', JSON.stringify(listSync));
      return listSync;
    } catch (err) {
      throw new Error(err);
    }
  };
}