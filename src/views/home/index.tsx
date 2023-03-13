import React, { useEffect, useState, FC } from 'react';
import { Button, Divider, Descriptions, Form, Layout, Radio, Space, List, message } from 'antd';
import { CaretUpOutlined, CaretDownOutlined, EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import api from '@/api';
import { HomeFormValue, ResponseListItem } from '@/types';
import ConfigForm from '@/components/common/config-form';
import './index.less';

const Home: FC = () => {
  /** DisplayName */
  Home.displayName = 'Home';

  /** Mock */
  const typeOptions = [
    { label: '全部', value: 1 },
    { label: '喜剧', value: 2 },
    { label: '动作', value: 3 },
    { label: '爱情', value: 4 },
    { label: '科幻', value: 5 },
    { label: '魔幻', value: 6 },
    { label: '惊悚', value: 7 },
    { label: '战争', value: 8 },
    { label: '冒险', value: 9 },
    { label: '剧情', value: 10 },
    { label: '纪录片', value: 11 },
  ];
  const countryOptions = [
    { label: '全部', value: 1 },
    { label: '中国大陆', value: 2 },
    { label: '港澳台', value: 3 },
    { label: '美国', value: 4 },
    { label: '日本', value: 5 },
    { label: '韩国', value: 6 },
    { label: '英国', value: 7 },
    { label: '德国', value: 8 },
    { label: '加拿大', value: 9 },
    { label: '俄国', value: 10 },
    { label: '印度', value: 11 },
  ];
  const languageOptions = [
    { label: '全部', value: 1 },
    { label: '汉语', value: 2 },
    { label: '英语', value: 3 },
    { label: '韩语', value: 4 },
    { label: '日语', value: 5 },
    { label: '俄语', value: 6 },
    { label: '印度语', value: 7 },
  ];
  const yearOptions = [
    { label: '全部', value: 1 },
    { label: '2023', value: 2 },
    { label: '2022', value: 3 },
    { label: '2021', value: 4 },
    { label: '2020', value: 5 },
    { label: '2019', value: 6 },
    { label: '2018', value: 7 },
    { label: '2017', value: 8 },
  ];
  const scoreOptions = [
    { label: '全部', value: 1 },
    { label: '9分以上', value: 2 },
    { label: '8分以上', value: 3 },
    { label: '7分以上', value: 4 },
    { label: '6分以上', value: 5 },
    { label: '5分以上', value: 6 },
  ];

  /** Data */
  const { Content, Header, Sider } = Layout;
  const [form] = Form.useForm(); // 表单 Ref
  const [list, setList] = useState<ResponseListItem[]>([]); // 电影列表
  const [total, setTotal] = useState<number>(0); // 电影总数
  const [page, setPage] = useState<number>(1); // 页码
  const pageSize = 10; // 页面容量
  const [moreFormStatus, setMoreFormStatus] = useState<boolean>(false);
  const moreFormItemConfigs = [
    {
      name: 'mCountryID',
      label: '国家/地区',
      children: <Radio.Group options={countryOptions} optionType="button" buttonStyle="solid" />,
    },
    {
      name: 'mLanguageID',
      label: '语言',
      children: <Radio.Group options={languageOptions} optionType="button" buttonStyle="solid" />,
    },
    {
      name: 'mDateYear',
      label: '年份',
      children: <Radio.Group options={yearOptions} optionType="button" buttonStyle="solid" />,
    },
    {
      name: 'mDoubanScore',
      label: '豆瓣评分',
      children: <Radio.Group options={scoreOptions} optionType="button" buttonStyle="solid" />,
    },
  ];

  /** Life Cycle Hook */
  useEffect(() => {
    getList();
  }, [page]);

  /** Method */
  // 获取列表
  const getList = async (params: HomeFormValue | null = null) => {
    // TODO 支持筛选
    const {
      data: { result },
    } = await api.GetList({ pageNo: page, pageSize });
    console.log(params);
    setList(result.list);
    setTotal(result.count);
  };

  const getMoreFormItemConfigs = () => {
    setMoreFormStatus(!moreFormStatus);
  };

  // 点击搜索
  const onFinish = () => {
    try {
      form
        .validateFields()
        .then((values: HomeFormValue) => getList(values))
        .catch((error) => {
          message.error(error);
        });
    } catch (e) {
      console.error(e);
    }
  };

  /** ReactDOM */
  return (
    <Layout>
      <Layout className="home">
        <Header className="home-header">
          <ConfigForm
            formConfig={{
              form,
              name: 'home-search-form',
              className: 'home-search-form',
              size: 'small',
              labelCol: { span: 2 },
              labelAlign: 'left',
              initialValues: {
                mTypeID: 1,
                mCountryID: 1,
                mLanguageID: 1,
                mDateYear: 1,
                mDoubanScore: 1,
              },
              onFinish,
            }}
            formItemConfigs={[
              {
                name: 'mTypeID',
                label: '类型',
                children: <Radio.Group options={typeOptions} optionType="button" buttonStyle="solid" />,
              },
              ...(moreFormStatus ? moreFormItemConfigs : []),
              {
                children: (
                  <>
                    <Button className="home-search-form__button" type="primary" htmlType="submit">
                      检 索
                    </Button>
                    <Button
                      className="home-search-form__button"
                      onClick={() => {
                        console.log(1);
                      }}
                    >
                      重 置
                    </Button>
                  </>
                ),
              },
            ]}
          />

          <Button
            className="home-search-form-more"
            type="link"
            icon={moreFormStatus ? <CaretUpOutlined /> : <CaretDownOutlined />}
            onClick={getMoreFormItemConfigs}
          >
            更多检索条件
          </Button>
        </Header>

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
                extra={<img width={172} alt="poster" src="https://joesch.moe/api/v1/random" />}
              >
                <List.Item.Meta title={<a href={item.mName}>{item.mName}</a>} />

                <Descriptions>
                  {[
                    { name: '电影类型', value: item.mTypeName },
                    { name: '豆瓣评分', value: item.mDouBanScore },
                    { name: '年份', value: item.mDateYear },
                    { name: '导演', value: item.mDirector },
                    { name: '国家', value: item.mCountryName },
                    { name: '语言', value: item.mLanguageName },
                    { name: '演员', value: item.mStarring },
                  ].map((spaceItem, index) => (
                    <Descriptions.Item key={index} label={spaceItem.name}>
                      {spaceItem.value}
                    </Descriptions.Item>
                  ))}
                </Descriptions>
              </List.Item>
            )}
          />
        </Content>
      </Layout>

      <Sider width="30vw" style={{ backgroundColor: '#fff' }}>
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
