import React, { FC } from 'react';
import styles from '@/pages/home/index.less';
import { Button, Card, Space, Typography } from 'antd';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const ShowImage = styled(Image)`
  width: 240px !important;
  height: 360px !important;
  object-fit: cover !important;
`;

const TemplateSystem: FC<{
  template: string;
  chooseTemplate: (e: string) => void;
  prevStep: () => void;
  nextStep: () => void;
}> = (props) => {
  const { template, chooseTemplate, prevStep, nextStep } = props;

  return (
    <div>
      <div className={styles.operation}>
        <Space wrap size={30}>
          <Card
            hoverable
            style={{
              width: 240,
              borderColor: template === 'empty' ? '#8db8ee' : '',
              margin: '5px',
            }}
            cover={
              <ShowImage
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
            onClick={() => chooseTemplate('empty')}
          >
            <Card.Meta
              title="空白"
              description="不适用任何模板，直接通过UI框架构建系统"
            />
          </Card>

          {
            //TODO 后续从服务器拉取数据，这里通过数组先填充
            templateList.map((item, i) => {
              return (
                <Card
                  key={i}
                  hoverable
                  style={{
                    width: 240,
                    borderColor: template === 'test' ? '#8db8ee' : '',
                    margin: '5px',
                  }}
                  cover={<ShowImage alt={item.description} src={item.src} />}
                  onClick={() => chooseTemplate(item.key)}
                >
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                </Card>
              );
            })
          }
        </Space>
      </div>

      <Typography.Paragraph
        style={{
          marginTop: '20px',
        }}
      >
        <Button
          size={'large'}
          style={{
            width: '120px',
            borderRadius: '20px',
            marginRight: '30px',
          }}
          onClick={() => prevStep()}
        >
          Previous
        </Button>

        <Button
          type={'primary'}
          size={'large'}
          style={{ width: '120px', borderRadius: '20px' }}
          onClick={() => nextStep()}
        >
          Next
        </Button>
      </Typography.Paragraph>
    </div>
  );
};

export default TemplateSystem;

const templateList = [
  {
    key: 'activity',
    title: '活动模板',
    description: '适用于移动端促销活动或额外信息的页面模板',
    src: 'https://s1.ax1x.com/2023/04/11/ppOiEAs.png',
  },
  {
    key: 'text',
    title: '文字模板',
    description: '适用于移动端文字介绍页面的模板',
    src: 'https://s1.ax1x.com/2023/04/11/ppOiQuF.jpg',
  },
  {
    key: 'wx_text',
    title: '微信公众号模板',
    description: '适用于微信公众号文案展示的模板',
    src: 'https://s1.ax1x.com/2023/04/11/ppOi8E9.jpg',
  },
  {
    key: 'shop',
    title: '商店页面模板',
    description: '适用于移动端网购商品展示页面的模板',
    src: 'https://s1.ax1x.com/2023/04/11/ppOit9x.jpg',
  },
  {
    key: 'friend',
    title: '朋友圈模板',
    description: '适用于构建移动端朋友圈的模板',
    src: 'https://s1.ax1x.com/2023/04/11/ppOiUgK.jpg',
  },
];
