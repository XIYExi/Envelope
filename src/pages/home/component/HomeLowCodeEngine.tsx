import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Button,
  Card,
  Grid,
  Segment,
  Image,
  Header,
  Container,
  Icon,
  List,
} from 'semantic-ui-react';
import { Divider, Typography } from 'antd';
import lowcodeEngineBar from '../../../assets/home/lowcodeEngineBar.png';
import Logo from '../../../assets/home/semlogo.png';
import GitHubButton from '@/pages/home/component/GitHubButton';

const CardWithNoShadow = styled(
  /*@ts-ignore*/
  Card,
)`
  box-shadow: none !important;
`;

const ImageCircular = styled(Image)`
  position: absolute !important;
  margin-top: -40px !important;
  margin-left: 40px !important;
`;

const ImageRounded = styled(Image)`
  border-top-left-radius: 1.25rem !important;
  border-top-right-radius: 1.25rem !important;
`;

const FontDesign = styled.p`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const SpanDesign = styled.span`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

const HeaderDesign = styled(Header)`
  margin-top: 2em !important;
`;

const HomeLowCodeEngine: FC<{ gotoLowcodeEngine: any }> = (props) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>Lowcode Engine响应式搭建</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          基于 lowcode-engine 快速构建响应式系统
        </Typography.Paragraph>

        <GitHubButton url="https://github.com/XIYExi/Envelope" />

        <Divider />
      </div>

      <Grid>
        <Grid.Column width={12}>
          <Segment basic>
            <ImageRounded
              rounded
              src={lowcodeEngineBar}
              alt="HomeLowCodeEngine抬头图片显示错误"
            />
            <ImageCircular
              size="tiny"
              src={Logo}
              alt="HomeLowCodeEngine圆形图片"
              circular
            />
            <div style={{ marginTop: '60px' }}>
              <Container text>
                <HeaderDesign as="h2">基于 Lowcode-Engine</HeaderDesign>
                <FontDesign>
                  Lowcode-Engine
                  是一款为低代码平台开发者提供的，具备强大定制扩展能力的低代码设计器研发框架。具备强大的低代码设计器，
                  可以承载着低代码平台的核心功能，包括入料、编排、组件配置、画布渲染等等。Lowcode-Engine
                  具备强大的拓展能力，
                  一方面我们可以快速拥有一份标准的低代码设计器，另外一方面如果有业务独特的功能需要，我们可以不用看它的源码、不用关心其实现，
                  可以使用 API、插件等方式快速完成能力的开发。
                </FontDesign>

                <FontDesign>
                  Envelope致力于打造低代码整合平台，团队认为没有一款设计可以满足所有的软件需求，只有最适合当前需求的工具与方法。因此强大的
                  Lowcode-Engine
                  正是我们构建低代码项目的神兵利器。Lowcode-Engine
                  具备强大的响应式布局以及栅格系统，弥补了原生Envelope系统在响应式项目以及PC等大显示
                  设备上的表现力。
                </FontDesign>

                <FontDesign>
                  Envelope
                  团队通过为原生引擎编写插件以及物料库，成功构建了低代码运行集，可以使用Fushion元件库，配合强大的编辑器构建响应式项目，并完成
                  预览、出码等功能。第三方引擎与Envelope
                  原生项目完全隔离，因此并不会产生环境或项目污染。
                </FontDesign>

                <Segment.Group horizontal>
                  <Segment>
                    <Header as="h5">Open Source</Header>
                    {/*@ts-ignore*/}
                    <Icon name="globe" />
                    <SpanDesign>完全开源</SpanDesign>
                  </Segment>
                  <Segment>
                    <Header as="h5">Technical Support</Header>
                    {/*@ts-ignore*/}
                    <Icon name="archive" />
                    <SpanDesign>支持隔离</SpanDesign>
                  </Segment>
                  <Segment>
                    <Header as="h5">Third Party</Header>
                    {/*@ts-ignore*/}
                    <Icon name="sitemap" />
                    <SpanDesign>允许接入</SpanDesign>
                  </Segment>
                  <Segment>
                    <Header as="h5">User Use</Header>
                    {/*@ts-ignore*/}
                    <Icon name="user" />
                    <SpanDesign>免费使用</SpanDesign>
                  </Segment>
                </Segment.Group>

                <HeaderDesign as="h2">自定义插件</HeaderDesign>

                <FontDesign>
                  Envelope Lowcode-Engine
                  通过编写插件实现对引擎的注入以及操控，在项目核心包{' '}
                  <mark>engine-lib-grid</mark>{' '}
                  中配置了关于第三方引擎的所有插件。
                </FontDesign>

                <List animated>
                  <List.Item>
                    <List.Icon name="folder" />
                    <List.Content>
                      <List.Header as="a">sample-plugins</List.Header>
                      <List.Description>
                        关于engine-lib-plugin的全部插件
                      </List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Icon name="folder" />
                    <List.Content>
                      <List.Header as="a">scenarios</List.Header>
                      <List.Description>物料</List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Icon name="folder" />
                    <List.Content>
                      <List.Header as="a">setters</List.Header>
                      <List.Description>注入器</List.Description>
                    </List.Content>
                  </List.Item>

                  <List.Item>
                    <List.Icon name="folder" />
                    <List.Content>
                      <List.Header as="a">universal</List.Header>
                      <List.Description>
                        Json Schema 等静态文件
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>

                <div style={{ marginTop: '2em' }}>
                  <Divider />

                  <Grid>
                    <Grid.Row>
                      <Grid.Column width={10}>
                        <Header as="h2">了解更多</Header>
                      </Grid.Column>
                      <Grid.Column width={6}>
                        {/*@ts-ignore*/}
                        <Button
                          primary
                          onClick={() => {
                            window.open('https://lowcode-engine.cn/');
                          }}
                        >
                          前往 Lowcode-Engine 官网
                          {/*@ts-ignore*/}
                          <Icon name="arrow right" />
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Container>
            </div>
          </Segment>
        </Grid.Column>

        <Grid.Column width={4}>
          <Card.Group>
            {/*@ts-ignore*/}
            <Card color="teal">
              <Card.Content>
                <Card.Header>Envelope Lowcode</Card.Header>
                {/*@ts-ignore*/}
                <Button fluid color="teal" onClick={props.gotoLowcodeEngine}>
                  立刻使用
                  {/*@ts-ignore*/}
                  <Icon name="arrow right" />
                </Button>
              </Card.Content>
            </Card>

            {/*@ts-ignore*/}
            <Card color="red">
              <Card.Content>
                <Card.Header>
                  <Image
                    size="huge"
                    avatar={true}
                    src="https://s1.ax1x.com/2023/03/27/ppsbWan.jpg"
                  />
                  <SpanDesign> 沙箱运行</SpanDesign>
                </Card.Header>
                <Card.Description>
                  <FontDesign>
                    Envelope Lowcode-Engine
                    封装后保留原引擎的强大特性，支持SandBox沙箱运行项目，可以快速预览，在线修改
                  </FontDesign>
                </Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                <a>
                  {/*@ts-ignore*/}
                  <Icon name="archive" />
                  SandBox
                </a>
              </Card.Content>
            </Card>

            {/*@ts-ignore*/}
            <Card color="black">
              <Card.Content>
                <Card.Header>
                  <Image
                    size="huge"
                    avatar={true}
                    src="https://s1.ax1x.com/2023/03/27/ppsbWan.jpg"
                  />
                  <SpanDesign> 在线编程</SpanDesign>
                </Card.Header>
                <Card.Description>
                  <FontDesign>
                    Lowcode-Engine
                    最强大的特性之一，可以在线编辑源代码，同时对元件事件进行绑定，快捷方便得设计低代码页面
                  </FontDesign>
                </Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                <a>
                  {/*@ts-ignore*/}
                  <Icon name="edit outline" />
                  Online Program
                </a>
              </Card.Content>
            </Card>

            {/*@ts-ignore*/}
            <Card color="red">
              <Card.Content>
                <Card.Header>
                  <Image
                    size="huge"
                    avatar={true}
                    src="https://s1.ax1x.com/2023/03/27/ppsbWan.jpg"
                  />
                  <SpanDesign> 出码模块</SpanDesign>
                </Card.Header>
                <Card.Description>
                  <FontDesign>
                    Lowcode-Engine 使用和 原生Envelope
                    一样得设计理念，均使用Json
                    Schema导出元件编辑数据，使用zip工具快速打包，支持源码导出
                  </FontDesign>
                </Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                <a style={{ marginRight: '20px' }}>
                  {/*@ts-ignore*/}
                  <Icon name="code" />
                  Code
                </a>
                <a>
                  {/*@ts-ignore*/}
                  <Icon name="modx" />
                  Module
                </a>
              </Card.Content>
            </Card>

            <CardWithNoShadow>
              <Card.Content>
                {/*@ts-ignore*/}
                <Button fluid color="blue">
                  Learn More
                </Button>
              </Card.Content>
            </CardWithNoShadow>
          </Card.Group>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

export default HomeLowCodeEngine;
