import React, { useEffect, useState, useRef, FC } from 'react';
import { Layout, Space, List } from 'antd';
import { EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import api from 'src/api';
import { ResponseListItem } from 'src/types';
import './index.less';

const Home: FC = () => {
  /** DisplayName */
  Home.displayName = 'Home';

  /** Data */
  const { Content, Sider } = Layout;
  const [list, setList] = useState<ResponseListItem[]>([]); // 电影列表
  const pageNo = useRef(1); // 页码
  const pageSize = 20; // 页面容量

  /** Life Cycle Hook */
  useEffect(() => {
    getList();
  }, []);

  /** Method */
  const getList = async () => {
    const {
      data: { result },
    } = await api.GetList({ pageNo: pageNo.current, pageSize });
    setList(result.list);
  };

  /** ReactDOM */
  return (
    <Layout className="home">
      <Content className="home-content">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => (pageNo.current = page),
            pageSize,
          }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.mid}
              actions={[
                { icon: EyeOutlined, num: 2 },
                { icon: LikeOutlined, num: 2 },
                { icon: StarOutlined, num: 2 },
              ].map((action, index) => (
                <Space key={index}>
                  {React.createElement(action.icon)}
                  {action.num}
                </Space>
              ))}
              extra={<img width={172} alt="poster" src="https://joeschmoe.io/api/v1/random" />}
            >
              <List.Item.Meta title={item.mName} />
              <div>
                <Space size="large">
                  <p>电影类型:{item.mTypeName}</p>
                  <p>豆瓣评分:{item.mDouBanScore}</p>
                  <p>年份:{item.mDateYear}</p>
                </Space>
              </div>
              <div>
                <Space size="large">
                  <p>导演:{item.mDirector}</p>
                  <p>国家:{item.mCountryName}</p>
                  <p>语言:{item.mLanguageName}</p>
                </Space>
              </div>
              <div>
                <Space size="large">
                  <p>演员:{item.mStarring}</p>
                </Space>
              </div>
            </List.Item>
          )}
        />
      </Content>

      <Sider width={400}>asdajsdhakjhsdjkahdkahdhajhkjhk</Sider>
    </Layout>
  );
};

export default Home;
