import React from 'react';
import lole1 from '../../../../assets/home/lole1.png';
import lole2 from '../../../../assets/home/lole2.png';
import lole3 from '../../../../assets/home/lole3.png';
import { Divider, Typography } from 'antd';
import GitHubButton from '@/pages/home/component/common/GitHubButton';
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

const FontDesign = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  display: flex;
`;

const CheckDesign = styled(
  /*@ts-ignore*/
  Icon,
)`
  margin-right: 10px !important;
`;

const LoleIndex = (props: any) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>Love Letter UI 原生框架</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          Envelope 低代码整合平台内置 UI 框架
        </Typography.Paragraph>

        <GitHubButton url="https://github.com/XIYExi/Envelope" />

        <Divider />
      </div>

      <div style={{ paddingTop: '3em' }}>
        <Segment basic>
          <Grid>
            <Grid.Column width={8}>
              <div style={{ marginLeft: '1em', marginTop: '2em' }}>
                {/*@ts-ignore*/}
                <Label size="tiny">
                  {/*@ts-ignore*/}
                  <Icon name="user" /> 简单快捷
                </Label>
                <Header as="h1" color="teal">
                  开箱即用、随时访问，立即尝试 Love Letter UI ！
                </Header>

                <FontDesign>
                  Love Letter UI 是 Envelope 低代码整合平台的内置 UI
                  框架，秉承独立开发，统一集成的思想，两套系统并行开发，并实现完美对接。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  开箱即用，UI 框架打包上传 npm，通过命令行下载即可直接使用。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  批量导入，允许选择性导入需要的元件，支持导入框架运行最小集，提高项目性能，减少不必要的开销。
                </FontDesign>

                <FontDesign style={{ marginBottom: '2em' }}>
                  <CheckDesign name="check" color="green" />
                  完全开源，项目工程源码已经在 GitHub 开源
                </FontDesign>

                {/*@ts-ignore*/}
                <Button primary>
                  查看组件库
                  {/*@ts-ignore*/}
                  <Icon name="arrow right" />
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <Image centered size="large" src={lole1} alt="AntV lole1缺省" />
            </Grid.Column>
          </Grid>
        </Segment>

        <Divider />

        <Segment basic>
          <Grid>
            <Grid.Column width={8}>
              <Image centered size="large" src={lole2} alt="AntV lole2缺省" />
            </Grid.Column>
            <Grid.Column width={8}>
              <div style={{ marginLeft: '1em', marginTop: '2em' }}>
                {/*@ts-ignore*/}
                <Label size="tiny">
                  {/*@ts-ignore*/}
                  <Icon name="user" /> 模块化
                </Label>
                <Header as="h1" color="teal">
                  功能拆分，模块编写
                </Header>

                <FontDesign>
                  Love Letter UI 将组件拆分为 基础、交互、视图、其他
                  四个种类，每个种类中元件相互组合以完成具体某一类用户动作。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  组件繁多，Love Letter UI 开源 50+
                  元件，涉及Web设计的各种要素，可以完成绝大多数类型的开发需求。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  框架支持，Love Letter UI 支持 React 框架，同时推出原生版本以及
                  Vue 版本，适配前端开发绝大多数需求。
                </FontDesign>

                <FontDesign style={{ marginBottom: '2em' }}>
                  <CheckDesign name="check" color="green" />
                  风格鲜明，UI 系统以引人注目的{' '}
                  <span style={{ color: 'rgb(249,204,226)' }}>樱花色</span>{' '}
                  做为主题色。
                </FontDesign>

                {/*@ts-ignore*/}
                <Button primary>
                  设计文档
                  {/*@ts-ignore*/}
                  <Icon name="arrow right" />
                </Button>
              </div>
            </Grid.Column>
          </Grid>
        </Segment>

        <Divider />

        <Segment basic>
          <Grid>
            <Grid.Column width={8}>
              <div style={{ marginLeft: '1em', marginTop: '2em' }}>
                {/*@ts-ignore*/}
                <Label size="tiny">
                  {/*@ts-ignore*/}
                  <Icon name="user" /> 文档
                </Label>
                <Header as="h1" color="teal">
                  协助软件开发
                </Header>

                <FontDesign>
                  Love Letter UI 提供了完善的文档，包括设计文稿以及用户手册。
                  适配JavaScript以及TypeScript开发，对于框架的任何配置都可以在文件系统中找到解答。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  详细全面，UI 框架提供用户手册以及设计文稿。
                </FontDesign>

                <FontDesign>
                  <CheckDesign name="check" color="green" />
                  原型导出，Love Letter UI 原型通过 Figma
                  设计而来，有完善的设计支撑。
                </FontDesign>

                <FontDesign style={{ marginBottom: '2em' }}>
                  <CheckDesign name="check" color="green" />
                  接口丰富，开放了丰富的接入，支持后续开发者接入进行二次封装。
                </FontDesign>

                {/*@ts-ignore*/}
                <Button primary>
                  查看用户手册
                  {/*@ts-ignore*/}
                  <Icon name="arrow right" />
                </Button>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <Image centered size="large" src={lole3} alt="AntV lole3缺省" />
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    </React.Fragment>
  );
};

export default LoleIndex;
