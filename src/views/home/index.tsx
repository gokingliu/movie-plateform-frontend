import React, { useEffect, useState, FC } from 'react';
import { Divider, Layout, Space, List } from 'antd';
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
  const [total, setTotal] = useState<number>(0); // 电影总数
  const [page, setPage] = useState<number>(1); // 页码
  const pageSize = 10; // 页面容量

  /** Life Cycle Hook */
  useEffect(() => {
    getList();
  }, [page]);

  /** Method */
  const getList = async () => {
    const {
      data: { result },
    } = await api.GetList({ pageNo: page, pageSize });
    setList(result.list);
    setTotal(result.count);
  };

  /** ReactDOM */
  return (
    <Layout className="home">
      <Content className="home-content">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{ total, onChange: (page) => setPage(page), pageSize }}
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              key={item.mid}
              actions={[
                { icon: EyeOutlined, num: item.mViews },
                { icon: LikeOutlined, num: item.mLikes },
                { icon: StarOutlined, num: item.mCollects },
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

      <Sider width={400}>
        <Divider orientation="left">热播榜</Divider>
        <List bordered dataSource={list} renderItem={(item) => <List.Item>{item.mName}</List.Item>} />
        <Divider orientation="left">点赞榜</Divider>
        <List bordered dataSource={list} renderItem={(item) => <List.Item>{item.mName}</List.Item>} />
        <Divider orientation="left">收藏榜</Divider>
        <List bordered dataSource={list} renderItem={(item) => <List.Item>{item.mName}</List.Item>} />
      </Sider>
    </Layout>
  );
};

export default Home;
