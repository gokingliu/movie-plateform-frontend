import axios, { AxiosResponse, Canceler } from 'axios';
import { AxiosResponseData, RequestList, ResponseList } from '@/types';
import http from '@/http';

const List = {
  /**
   * @description 获取搜索结果列表
   */
  GetList(
    data: RequestList,
    canceler: Canceler | null = null,
  ): Promise<AxiosResponse<AxiosResponseData<ResponseList>>> {
    return http.post(
      '/trpc.MovieService.operation.List/GetList',
      data,
      // eslint-disable-next-line no-param-reassign
      canceler ? { cancelToken: new axios.CancelToken((c) => (canceler = c)) } : {},
    );
  },
};

export default List;
