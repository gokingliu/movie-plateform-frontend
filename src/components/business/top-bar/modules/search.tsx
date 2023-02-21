import React, { useRef, useState, FC } from 'react';
import { AutoComplete } from 'antd';
import api, { AxiosCanceler } from '@/api';
import { ResponseListItem } from '@/types';

const Search: FC = () => {
  /** DisplayName */
  Search.displayName = 'Search';

  /** Data */
  const [result, setResult] = useState<ResponseListItem[]>([]); // 搜索结果
  const canceler = useRef<AxiosCanceler>(null); // 搜索接口取消方法
  const { Option } = AutoComplete; // AutoComplete option 选项

  /** Method */
  // 搜索逻辑
  const handleSearch = async (value: string) => {
    try {
      canceler.current?.();
      setResult([]);
      const {
        data: { code, result },
      } = await api.GetList({ mName: value, pageNo: 1, pageSize: 10 }, canceler.current);
      if (code === 0) {
        setResult(result.list);
      }
    } catch (e) {
      setResult([]);
    }
  };

  /** ReactDOM */
  return (
    <AutoComplete style={{ width: '25%' }} allowClear autoFocus onSearch={handleSearch} placeholder="搜一搜电影">
      {result.map((movie) => (
        <Option key={movie.mid} value={movie.mName}>
          {movie.mName}
        </Option>
      ))}
    </AutoComplete>
  );
};

export default Search;
