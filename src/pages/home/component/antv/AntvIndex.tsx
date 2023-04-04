import React from 'react';
import { Divider, Typography } from 'antd';
import GitHubButton from '@/pages/home/component/common/GitHubButton';
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Reveal,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

const FontDesign = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  display: flex;
`;

const ImageDesign = styled(Image)<{
  width: string;
  height: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const CheckDesign = styled(
  /*@ts-ignore*/
  Icon,
)`
  margin-right: 10px !important;
`;

const AntVIndex = (props: any) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>流程图编辑器</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          基于 AntV/X6 图引擎快速搭建流程图
        </Typography.Paragraph>

        <GitHubButton url="https://github.com/XIYExi/Envelope" />

        <Divider />
      </div>

      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={9}>
              {/*   <div style={{
                backgroundImage: 'url("https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*W9g1S7W-TOoAAAAAAAAAAAAAARQnAQ")',
                backgroundSize: 'cover',
                width: '1028.67px',
                height: '480px'
              }}/>*/}
              <Reveal animated="move">
                <Reveal.Content visible>
                  <ImageDesign
                    width="1028.67px"
                    height="510px"
                    src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*W9g1S7W-TOoAAAAAAAAAAAAAARQnAQ"
                  />
                </Reveal.Content>
                <Reveal.Content hidden>
                  <div style={{ marginTop: '2em' }} />
                  <Segment basic>
                    <Header as="h2" color="blue">
                      AntV X6
                    </Header>
                    <FontDesign style={{ marginTop: '2em' }}>
                      X6 是 AntV
                      旗下的图编辑引擎，提供了一系列开箱即用的交互组件和简单易用的节点定制能力，方便我们快速搭建流程图、DAG
                      图、ER 图等图应用。
                    </FontDesign>

                    <FontDesign>
                      🌱　极易定制：支持使用 SVG/HTML/React/Vue
                      定制节点样式和交互；
                      <br />
                      🚀　开箱即用：内置 10+
                      图编辑配套扩展，如框选、对齐线、小地图等；
                      <br />
                      🧲　数据驱动：基于 MVC
                      架构，用户更加专注于数据逻辑和业务逻辑；
                      <br />
                      💯　事件驱动：可以监听图表内发生的任何事件。
                    </FontDesign>

                    <FontDesign>
                      Envelope团队通过 X6 引擎提供的 API
                      接口，进行二次封装，保留原生引擎操作手感，并提供了更多自定义操作，方便用户迅速进行图操作。
                    </FontDesign>
                  </Segment>
                </Reveal.Content>
              </Reveal>
            </Grid.Column>

            <Grid.Column width={4}>
              <Grid>
                <Grid.Row>
                  <Reveal animated="move down">
                    <Reveal.Content visible>
                      <ImageDesign
                        src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*_0vpQ5sFL-8AAAAAAAAAAAAAARQnAQ"
                        width="514.333px"
                        height="240px"
                      />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <div style={{ marginTop: '2em' }} />
                      <Segment basic>
                        <Header as="h2" color="teal">
                          流程图
                        </Header>
                        <FontDesign style={{ marginTop: '2em' }}>
                          流程图编辑器主要聚焦于流程图绘制，提供
                          起始节点、条件判断、一般操作
                          等多种流程图节点，同时提供 ReactNode
                          等组件支持自定义。
                          编辑器目前提供通用控制栏，可以一键导出配置，支持项目间快速集成。
                        </FontDesign>
                      </Segment>
                    </Reveal.Content>
                  </Reveal>
                </Grid.Row>
                <Grid.Row>
                  <Reveal animated="move down">
                    <Reveal.Content visible>
                      <ImageDesign
                        src="https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*AVRUSrPL_dEAAAAAAAAAAAAAARQnAQ"
                        width="514.333px"
                        height="240px"
                      />
                    </Reveal.Content>
                    <Reveal.Content hidden>
                      <div style={{ marginTop: '2em' }} />
                      <Segment basic>
                        <Header as="h2">更多图表</Header>
                        <FontDesign style={{ marginTop: '2em' }}>
                          Envelope 流程图编辑器后续将添加E - R实体图、DFD
                          数据流图、时序图、UML实例图等一系列图标组件。 Envelope
                          低代码整合平台持续集成，持续交付。
                        </FontDesign>
                      </Segment>
                    </Reveal.Content>
                  </Reveal>
                </Grid.Row>
              </Grid>
            </Grid.Column>

            <Grid.Column width={3}>
              <div style={{ marginTop: '2em' }}>
                <Header as="h2" icon>
                  {/*@ts-ignore*/}
                  <Icon name="database" />
                  数据驱动的图编辑器
                  <Header.Subheader>
                    基于 X6 和 React 打造开箱即用的数据流图设计器
                  </Header.Subheader>
                </Header>

                {/*@ts-ignore*/}
                <Button primary fluid onClick={() => props.gotoAntv()}>
                  立即使用
                  {/*@ts-ignore*/}
                  <Icon name="arrow right" />
                </Button>
              </div>

              <Divider />

              <Header as="h2" icon>
                {/*@ts-ignore*/}
                <Icon name="database" />
                更多用法
                <Header.Subheader>
                  前往AntV X6 设计文档查看更多接入时守则
                </Header.Subheader>
              </Header>

              {/*@ts-ignore*/}
              <Button
                fluid
                onClick={() => {
                  window.open('https://x6.antv.vision/zh/docs/tutorial/about');
                }}
              >
                前往查看
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default AntVIndex;
