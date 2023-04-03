import React, { FC } from 'react';
import styles from '@/pages/home/index.less';
import {
  AntDesignOutlined,
  MobileOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Image } from 'semantic-ui-react';
import { Button, Card, Space, Typography } from 'antd';
import '../index.less';
import antd from '../../../../assets/home/antd.svg';
import antdLogo from '../../../../assets/home/antdlogo.svg';
import sem from '../../../../assets/home/sem.svg';
import semLogo from '../../../../assets/home/semlogo.png';
import lole from '../../../../assets/home/lole.svg';
import loleLogo from '../../../../assets/home/loleLogo.png';

const UISystem: FC<{
  ui: string;
  chooseUI: (e: string) => void;
  nextStep: () => void;
}> = (props) => {
  const { ui, chooseUI, nextStep } = props;

  return (
    <>
      <Space size={30}>
        <div className={styles.operation} style={{ paddingRight: '50px' }}>
          <div
            onClick={() => chooseUI('antd')}
            style={{ marginBottom: '15px' }}
          >
            <div
              className={styles.card}
              style={{
                borderColor: ui === 'antd' ? '#8db8ee' : '',
              }}
            >
              <Space className="ui-sys-space" size={90} align="center">
                <Image width={48} src={antdLogo} />
                <div style={{ margin: 0 }}>
                  Ant Design
                  <RightOutlined style={{ marginLeft: '20px' }} />
                </div>
              </Space>
            </div>
          </div>

          <div
            onClick={() => chooseUI('semantic')}
            style={{ marginBottom: '15px' }}
          >
            <div
              className={styles.card}
              style={{
                borderColor: ui === 'semantic' ? '#8db8ee' : '',
              }}
            >
              <Space className="ui-sys-space" size={90} align="center">
                <Image width={48} src={semLogo} />
                <div style={{ margin: 0 }}>
                  Semantic UI
                  <RightOutlined style={{ marginLeft: '20px' }} />
                </div>
              </Space>
            </div>
          </div>

          <div
            onClick={() => chooseUI('lole')}
            style={{ marginBottom: '15px' }}
          >
            <div
              className={styles.card}
              style={{
                borderColor: ui === 'lole' ? '#8db8ee' : '',
              }}
            >
              <Space className="ui-sys-space" size={90} align="center">
                <Image width={48} src={loleLogo} />
                <div style={{ margin: 0 }}>
                  Love Letter
                  <RightOutlined style={{ marginLeft: '20px' }} />
                </div>
              </Space>
            </div>
          </div>
        </div>

        {/*右侧选择卡片*/}
        <div className="ui-sys-card">
          {ui === 'antd' && (
            <React.Fragment>
              <Image
                preview={false}
                src={antd}
                alt=""
                width={300}
                height={350}
              />
              <Typography.Paragraph className="ui-sys-text">
                Stacks is a production-ready library of stackable content blocks
                built in React Native
              </Typography.Paragraph>
            </React.Fragment>
          )}

          {ui === 'semantic' && (
            <React.Fragment>
              <Image
                preview={false}
                src={sem}
                alt=""
                width={300}
                height={350}
              />
              <Typography.Paragraph className="ui-sys-text">
                Stacks is a production-ready library of stackable content blocks
                built in React Native
              </Typography.Paragraph>
            </React.Fragment>
          )}

          {ui === 'lole' && (
            <React.Fragment>
              <Image
                preview={false}
                src={lole}
                alt=""
                width={300}
                height={350}
              />
              <Typography.Paragraph className="ui-sys-text">
                Stacks is a production-ready library of stackable content blocks
                built in React Native
              </Typography.Paragraph>
            </React.Fragment>
          )}

          <Typography.Paragraph>
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
      </Space>
    </>
  );
};

export default UISystem;
