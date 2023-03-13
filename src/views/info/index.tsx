import React, { useRef, useState, CSSProperties, FC } from 'react';
import { Card, Divider, Layout, List, Space } from 'antd';
import { EyeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './index.less';

const Info: FC = () => {
  /** DisplayName */
  Info.displayName = 'Info';

  /** Data */
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoStyle, setVideoStyle] = useState<CSSProperties>({ width: 'auto', height: 'auto' });
  const data = [
    '2010年12月16日上映',
    '电影类型：喜剧',
    '豆瓣评分：9.5',
    '导演：罗伯特·泽米基斯',
    '国家：美国',
    '语言：英语',
    '演员：埃尔维斯·普雷斯利|汤姆·汉克斯|莎莉·菲尔德|库尔特·拉塞尔',
  ];

  /** Method */
  const videoLoadedData = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoElement = e.target as HTMLVideoElement;
    const { videoHeight, videoWidth } = videoElement;
    setVideoStyle(videoHeight / videoWidth > 1 ? { width: 'auto', height: '100%' } : { width: '100%', height: 'auto' });
  };

  /** ReactDOM */
  return (
    <Layout className="info">
      <Layout.Content className="info-content">
        <video ref={videoRef} style={videoStyle} onLoadedData={videoLoadedData} controls src="https://0.mp4" />
      </Layout.Content>

      <Layout.Sider className="info-sider" width="30vw">
        <Space direction="vertical" size="middle">
          <Space align="start" direction="horizontal">
            <Card
              style={{ width: 240 }}
              bordered={false}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Card.Meta
                description={
                  <Space split={<Divider type="vertical" />}>
                    {[
                      { icon: <EyeOutlined />, value: 12 },
                      { icon: <LikeOutlined />, value: 34 },
                      { icon: <StarOutlined />, value: 56 },
                    ].map((item, index) => (
                      <div className="actions-space" key={index}>
                        {item.icon}
                        {item.value}
                      </div>
                    ))}
                  </Space>
                }
              />
            </Card>

            <List
              size="small"
              header={<h3>电影名</h3>}
              bordered
              dataSource={data}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Space>

          <Card style={{ width: '100%' }}>
            <span>
              阿甘是个智商只有75的低能儿。在学校里为了躲避别的孩子的欺侮，听从一个朋友珍妮的话而开始“跑”。他跑着躲避别人的捉弄。在中学时，他为了躲避别人而跑进了一所学校的橄榄球场，就这样跑进了大学。阿甘被破格录取，并成了橄榄球巨星，受到了肯尼迪总统的接见。
            </span>
          </Card>
        </Space>
      </Layout.Sider>
    </Layout>
  );
};

export default Info;
