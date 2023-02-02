import React, { FC, useEffect, useState } from 'react';
import styles from './index.less';
import { Tabs, message, Typography, Menu, MenuProps, Steps, Button } from 'antd';
import { history } from 'umi';
import {
  MobileOutlined,
  ConsoleSqlOutlined,
  CodeOutlined,
  IdcardOutlined,
  SettingOutlined,
  DesktopOutlined,
  BorderOuterOutlined,
  CodepenCircleOutlined,
  FieldBinaryOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { HomeTitle } from '@/pages/home/component/Component';
import { AppstoreOutlined } from '@ant-design/icons';
import UISystem from '@/pages/home/component/UISystem';
import styled from 'styled-components';
import TemplateSystem from '@/pages/home/component/TemplateSystem';
import ConfirmSystem from '@/pages/home/component/ConfirmSystem';

const StepsContent = styled.div`
  min-height: 200px;
  margin-top: 16px;
  padding-top: 40px;
  padding-bottom: 40px;
  text-align: center;
  background-color: #fafafa;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;

`


const Home:FC = () => {

  const handleGo = (type: string) => {
    if (type === 'H5') {
      history.push('/editor?tid=123456');
    } else if (type === 'PC') {
      window.open('http://v6.dooring.cn/beta');
    } else {
      history.push('/ide');
    }
  };

  // Test
/*  const handleOk = async () => {
    const { default: Graph } = await import('@/materials/absolute-antd/base/Alert');
    const Component = Graph;
    console.log(Component)
  }*/

  const [current, setCurrent] = useState('lowcode');

  const onClick: MenuProps['onClick'] = e => {
    //console.log('click ', e);
    setCurrent(e.key);
  };

  const [ui, setUI] = useState<string>('antd')
  const chooseUI = (e:string) => {
    console.log(e)
    setUI(e);
  }

  const [stepCurrent, setStepCurrent] = useState<number>(0);
  const nextStep = () => {
    setStepCurrent(stepCurrent + 1);
  };
  const prevStep = () => {
    setStepCurrent(stepCurrent - 1);
  };

  const [template, setTemplate] = useState<string>('empty')
  const chooseTemplate = (e:string) => {
    console.log(e)
    setTemplate(e);
  }



  return(
    <div className={styles.homeWrap}>

      <div className={styles.leftArea}>
        <div style={{padding: '0 40px'}}>
          <HomeTitle level={3} copyable={false}>Envelope</HomeTitle>
        </div>

        <div>
          <Menu
            onClick={onClick}
            mode="inline"
            selectedKeys={[current]}
            inlineCollapsed={false}
          >
            <Menu.SubMenu key="lowcode" title="低代码开发" icon={<SettingOutlined />}>
              <Menu.Item key="absolute" icon={<AppstoreOutlined />}>
                手机H5搭建
              </Menu.Item>
              <Menu.Item key="grid" icon={<BorderOuterOutlined />}>
                响应式搭建
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key='template' title='模板开发' icon={<DesktopOutlined />}>
              <Menu.Item key='html' icon={<FormOutlined />}>
                React模板搭建
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key='visual' title='可视化构建' icon={<CodepenCircleOutlined />}>
                <Menu.Item key='math' icon={<FieldBinaryOutlined />}>
                  数学公式
                </Menu.Item>
                <Menu.Item key='program' icon={<ConsoleSqlOutlined />}>
                  可视化编程
                </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>

      </div>

      <div className={styles.contentArea}>
        {
          current === 'absolute' && (
            <>
              <div className={styles.logoTip}>
                <div className={styles.logo}>
            <span className={styles.logoText} title="H5-Dooring可视化编辑器">
              H5-Dooring
            </span>
                  可视化编辑器
                </div>
                <p style={{ display: 'inline-block', width: '520px', fontSize: '16px', lineHeight: '2' }}>
                  H5-Dooring是一款功能强大，开源免费的H5可视化页面配置解决方案，
                  致力于提供一套简单方便、专业可靠、无限可能的H5落地页最佳实践。 技术栈以react为主，
                  后台采用nodejs开发。
                </p>
              </div>

              <Steps current={stepCurrent} items={[
                {
                  title: 'UI system',
                  description: '选择UI系统'
                },
                {
                  title: 'Template',
                  description: '选择模板'
                },
                {
                  title: 'Confirm',
                  description: '确认信息'
                }
              ]} />
              <StepsContent>
                {
                  stepCurrent === 0 &&
                  <UISystem ui={ui} chooseUI={chooseUI} nextStep={nextStep}/>
                }
                {
                  stepCurrent === 1 &&
                    <TemplateSystem
                      template={template}
                      chooseTemplate={chooseTemplate}
                      prevStep={prevStep}
                      nextStep={nextStep}
                    />
                }
                {
                  stepCurrent === 2 &&
                    <ConfirmSystem
                      ui={ui}
                      template={template}
                      done={() => message.success('Processing complete!')}
                      prev={prevStep}
                    />
                }
              </StepsContent>

            </>
          )
        }


        <footer className={styles.footer}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ marginTop: '30px' }}>
              <span>TEST!!!</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '500px', marginLeft: '40px', marginTop: '32px' }}>
              <span style={{ marginRight: '24px' }}>更多产品: </span>
              <a href="http://v6.dooring.cn/beta" style={{ marginRight: '24px' }} target="_blank">
                v6.dooring可视化大屏编辑器
              </a>
              <a href="http://h5.dooring.cn/qt" style={{ marginRight: '24px' }} target="_blank">
                在线gif动图制作平台
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  )
}


export default Home;


