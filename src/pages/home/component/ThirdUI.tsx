import React, { FC, memo } from 'react';
import { Typography } from 'antd';
import {
  Segment,
  Image,
  Header,
  Grid,
  Button,
  Divider,
  Icon,
} from 'semantic-ui-react';
import devices from '../../../assets/home/devices.png';
import CodeShow1 from '!@mdx-js/loader!./CodeShow.mdx';
import CodeShow2 from '!@mdx-js/loader!./CodeShow2.mdx';
import CodeShow3 from '!@mdx-js/loader!./CodeShow3.mdx';
import styled from 'styled-components';
import AText from '@/materials/absolute-antd/base/Text';
import SProgress from '@/materials/absolute-semantic/control/Progress';
/*@ts-ignore*/
import { history } from 'umi';

const FontDesign = styled.p`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
`;

const attrAtext = {
  text: '这一个标准的 Antd 文本域， 并对文本进行了标记',
  disabled: false,
  code: false,
  delete: false,
  strong: true,
  italic: false,
  underline: false,
  mark: true,
  color: 'rgba(60, 60, 60, 1)',
  fontSize: 14,
  indent: 20,
  lineHeight: 1.8,
  textAlign: 'left',
  bgColor: 'rgba(255, 255, 255, 0)',
  padding: 0,
  radius: 0,
};

const attrProgress = {
  defaultValue: '50',
  total: '100',
  color: 'teal',
  disabled: false,
  indicating: false,
  inverted: false,
  label: '这是一个进度条',
  progress: 'percent',
  size: 'medium',
  error: false,
  success: false,
  warning: false,
};

const MorePaddedDivider = styled(Divider)`
  margin-top: 3.5em !important;
  margin-bottom: 3.5em !important;
`;

const ThirdUI: FC<any> = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>第三方元件封装文档</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          基于dumi文档，展示封装后 Antd 和 semantic 元件
        </Typography.Paragraph>

        <Divider />
      </div>

      <Segment basic>
        <Image src={devices} size="huge" centered alt="" />

        <Header as="h1" textAlign="center">
          封装两大元件库
        </Header>

        <Segment basic textAlign="center">
          {/*@ts-ignore*/}
          <Button
            color="teal"
            onClick={() => {
              history.push('/~docs');
            }}
          >
            查看文档
            {/*@ts-ignore*/}
            <Icon name="arrow right" />
          </Button>
        </Segment>

        <MorePaddedDivider hidden />

        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Segment basic>
                <Header as="h3">人气框架</Header>

                <FontDesign>
                  国内现象级UI组件库Ant Design，
                  拥有庞大的用户群体，经历无数整合与迭代，拥有50多个风格鲜明的元件，可以适配90%的任务需求。
                </FontDesign>

                <FontDesign>
                  国外人气颇高的 Semantic UI React， 基于 Semantic UI 修改而来的
                  React
                  版本，是css驱动的元件库，风格清新脱俗，拥有40多个不同组件，
                  其中大多组件聚焦用户交互，拥有丰富的动画库，主要领域定位与社交平台。
                </FontDesign>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <CodeShow1 />
              </Segment>
              {/*@ts-ignore*/}
              <Button primary>一个标准的Semantic按钮</Button>
            </Grid.Column>
          </Grid.Row>

          <MorePaddedDivider />

          <Grid.Row>
            <Grid.Column width={8}>
              <Segment basic>
                <Header as="h3">精简封装</Header>

                <FontDesign>
                  组件精选，对Antd以及Semantic元件库进行精简，筛除不常用组件，筛除非通用组件，使得用户体验达到最佳。
                </FontDesign>

                <FontDesign>
                  对组件属性进行精简，提出冗余属性，保留基本交互以及样式属性，加速用户构建快速原型.
                </FontDesign>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <CodeShow2 />
              </Segment>
              {/*@ts-ignore*/}
              <AText isTpl={false} {...attrAtext} />
            </Grid.Column>
          </Grid.Row>

          <MorePaddedDivider />

          <Grid.Row>
            <Grid.Column width={8}>
              <Segment basic>
                <Header as="h3">迭代 - 递增</Header>

                <FontDesign>
                  不断递增。后续我们将继续继承更多的元件，如国外现象级的Material
                  UI，不断丰富平台的UI框架，给用户更多的选择。
                </FontDesign>

                <FontDesign>
                  不断迭代。对现有元件库进行调整，对现有元件库进行更加彻底的二次封装，开辟新的接口，提供更多方面快捷的属性入口。
                </FontDesign>
              </Segment>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment>
                <CodeShow3 />
              </Segment>
              {/*@ts-ignore*/}
              <SProgress isTpl={false} {...attrProgress} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </React.Fragment>
  );
};

export default memo(ThirdUI);
