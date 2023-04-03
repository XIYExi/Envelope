import React, { FC } from 'react';
import styles from '@/pages/home/index.less';
import { Button, Card, Space, Typography } from 'antd';

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
              <img
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
            new Array(10).fill(0).map((item, i) => {
              return (
                <Card
                  key={i}
                  hoverable
                  style={{
                    width: 240,
                    borderColor: template === 'test' ? '#8db8ee' : '',
                    margin: '5px',
                  }}
                  cover={
                    <img
                      alt="example"
                      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                    />
                  }
                  onClick={() => chooseTemplate('empty')}
                >
                  <Card.Meta
                    title="测试模板"
                    description="用于占位，后续从服务器拉去模板"
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
