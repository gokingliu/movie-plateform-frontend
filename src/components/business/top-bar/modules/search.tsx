import React, { useRef, useState, FC } from 'react';
import { AutoComplete } from 'antd';
import api, { AxiosCanceler } from 'src/api';
import { ResponseList } from 'src/types';

const Search: FC = () => {
  /** DisplayName */
  Search.displayName = 'Search';

  /** Data */
  // 搜索结果
  const [result, setResult] = useState<ResponseList[]>([]);
  // 搜索接口取消方法
  const canceler = useRef<AxiosCanceler>(null);
  // AutoComplete option 选项
  const { Option } = AutoComplete;

  /** Method */
  // 搜索逻辑
  const handleSearch = async (value: string) => {
    try {
      canceler.current?.();
      setResult([]);
      const {
        data: { code, result },
      } = await api.GetList({ username: value }, canceler.current);
      if (code === 0) {
        setResult(result);
      }
    } catch (e) {
      setResult([{ mid: 1, mName: 'test1', mTypeName: 'test2' }]);
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
