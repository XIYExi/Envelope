import React from 'react';
import './index.less';
import {
  Button,
  Divider,
  Grid,
  Image,
  Label,
  Segment,
} from 'semantic-ui-react';
import phone from '../../assets/pages/phone.png';
import styled from 'styled-components';
/*@ts-ignore*/
import VideoPlay from 'react-sublime-video';
import cell1 from '../../assets/pages/cell1.png';
import cell2 from '../../assets/pages/cell2.png';
import cell3 from '../../assets/pages/cell3.png';
import ui from '../../assets/pages/ui.png';
import more from '../../assets/pages/more.png';
import asserts from '../../assets/pages/assets.png';
import Footer from '@/pages/home/component/Footer';
/*@ts-ignore*/
import { history } from 'umi';

const SegmentWrapper = styled(Segment)`
  padding-top: 5em !important;
`;

const HeaderDesign = styled.h1<{
  $fontSize: string;
  $color?: string;
}>`
  color: ${(props) => (props.$color === undefined ? 'white' : props.$color)};
  font-size: ${(props) => props.$fontSize};
`;

const FontDesign = styled.p<{
  $fontSize: string;
}>`
  color: rgba(0, 0, 0, 0.5);
  font-size: ${(props) => props.$fontSize};
`;

const ButtonSocialLast = styled(
  /*@ts-ignore*/
  Button,
)`
  margin-right: 4em !important;
`;

const VideoWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  max-width: 800px;
  margin: auto;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  video {
    display: block;
    margin: auto;
  }
`;

const FeatureCardCss = {
  maxWidth: '350px',
  paddingTop: '7.5em',
  margin: 'auto',
};

export const Home = (props: any) => {
  return (
    <React.Fragment>
      <div>
        {/*1 - 首页*/}
        <section className="bg" style={{ height: '100vh' }}>
          <div style={{ paddingTop: '6.5em' }} />
          <div style={{ paddingLeft: '9em', paddingTop: '2.5em' }}>
            <Grid>
              <Grid.Column width={8}>
                <HeaderDesign $fontSize={'65px'}>
                  Envelope&nbsp;&nbsp;Platform
                </HeaderDesign>
                <HeaderDesign $fontSize={'55px'}>
                  充满无限可能的
                  <br />
                  低代码整合平台
                </HeaderDesign>

                <Divider hidden />

                <FontDesign $fontSize={'18px'}>
                  提供H5应用、响应式网站、模板网站、数据可视化等低代码搭建
                </FontDesign>

                {/*@ts-ignore*/}
                <Button
                  size="large"
                  onClick={() => {
                    window.open(
                      'https://github.com/XIYExi/Envelope/releases/tag/Envelope2.0.0',
                      'blank',
                    );
                  }}
                >
                  下载客户端
                </Button>
                {/*@ts-ignore*/}
                <Button
                  size="large"
                  color="teal"
                  onClick={() => {
                    history.push('/inner');
                  }}
                >
                  立即使用
                </Button>
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src={phone} />

                <ButtonSocialLast
                  floated="right"
                  circular
                  color="facebook"
                  icon="facebook"
                />
                {/*@ts-ignore*/}
                <Button
                  floated="right"
                  circular
                  color="twitter"
                  icon="twitter"
                />
                {/*@ts-ignore*/}
                <Button
                  floated="right"
                  circular
                  color="linkedin"
                  icon="linkedin"
                />
                {/*@ts-ignore*/}
                <Button
                  floated="right"
                  circular
                  color="google plus"
                  icon="google plus"
                />
              </Grid.Column>
            </Grid>
          </div>
        </section>

        {/*2 - 视频介绍*/}
        <section
          style={{ paddingTop: '4em', marginTop: '6em', height: '100vh' }}
        >
          <Segment basic textAlign="center">
            <HeaderDesign $color={'black'} $fontSize={'40px'}>
              Envelope 超乎想象的活力
            </HeaderDesign>

            <FontDesign $fontSize={'20px'}>
              CI / CD ， 持续集成 持续交付
            </FontDesign>

            <div style={{ marginTop: '6em' }} />

            <VideoWrapper>
              <VideoPlay
                loop
                width="100%"
                poster={
                  'https://zos.alipayobjects.com/rmsportal/HZgzhugQZkqUwBVeNyfz.jpg'
                }
              >
                <source
                  src={
                    'https://os.alipayobjects.com/rmsportal/EejaUGsyExkXyXr.mp4'
                  }
                  type={`video/mp4`}
                />
              </VideoPlay>
            </VideoWrapper>
          </Segment>
        </section>

        {/*3 - 三大特点*/}

        <section
          style={{ height: '100vh', background: 'rgba(232,229,229,0.6)' }}
        >
          <Segment basic textAlign="center">
            <div style={{ paddingTop: '3em' }} />
            {/*@ts-ignore*/}
            <Label color="teal">FEATURE</Label>
            <Divider hidden />
            <HeaderDesign $fontSize={'35px'} $color="black">
              集成三大引擎
            </HeaderDesign>

            <FontDesign $fontSize={'18px'} style={{ textAlign: 'center' }}>
              Envelope
              低代码整合平台旨在提供多种多样的低代码构建方式，因此集成更多的低代码引擎
              <br />
              只为给你带来最棒的使用体验。
            </FontDesign>

            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column>
                  <div style={FeatureCardCss}>
                    <Image centered size="tiny" src={cell1} />

                    <HeaderDesign $fontSize={'19px'} $color="black">
                      Envelope 原生引擎
                    </HeaderDesign>

                    <FontDesign $fontSize={'14px'}>
                      Envelope 团队自研的原生低代码引擎，基于 umi
                      框架的动态加载技术，使用 dva 以及 JSON schema
                      实现低代码元件的编辑与设计。 原生引擎采用
                      Antd、Semantic、原生UI三套样式，在 H5
                      移动端表现效果良好，同时具备模板网页搭建技术。
                    </FontDesign>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div style={FeatureCardCss}>
                    <Image centered size="tiny" src={cell2} />

                    <HeaderDesign $fontSize={'19px'} $color="black">
                      Lowcode Engine 二次开发
                    </HeaderDesign>

                    <FontDesign $fontSize={'14px'}>
                      为解决原生引擎在大屏幕设备上的表现不足，对Lowcode-Engine进行二次开发，编辑注入插件以及物料，实现支持响应式栅格布局的低代码设计器。
                    </FontDesign>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div style={FeatureCardCss}>
                    <Image centered size="tiny" src={cell3} />

                    <HeaderDesign $fontSize={'19px'} $color="black">
                      AntV 数据可视化
                    </HeaderDesign>

                    <FontDesign $fontSize={'14px'}>
                      Envelope Platform 集成 Antv / x6 图引擎，在 x6 提供的 API
                      基础上进行二次开发，实现流程图， E-R
                      图，UML统一类图等多种图表绘制，
                      实现数据可视化需求，支持导出 JSON。
                    </FontDesign>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </section>

        {/*4 - UI系统*/}
        <section style={{ paddingTop: '6em' }}>
          <div />

          <div style={{ paddingTop: '3em', paddingBottom: '3em' }}>
            <Grid>
              <Grid.Column width={9}>
                <Image size="large" centered src={ui} />
              </Grid.Column>
              <Grid.Column width={7}>
                <div style={{ marginTop: '3em' }}>
                  {/*@ts-ignore*/}
                  <Label color="pink">UI FRAMEWORK</Label>

                  <Divider hidden />

                  <HeaderDesign $fontSize={'34px'} $color="black">
                    多套 UI，
                    <br />
                    多种选择 !
                  </HeaderDesign>

                  <FontDesign
                    $fontSize={'15px'}
                    style={{
                      maxWidth: '430px',
                    }}
                  >
                    Envelope Platform 提供了多套 UI 框架，其中包含Envelope
                    低代码整合平台的内置 UI 框架 Love Letter UI， UI
                    框架秉承独立开发，统一集成的思想，两套系统并行开发，并实现完美对接。
                    框架打包上传 npm ，开箱即用，可以在平台外独立使用 ...
                  </FontDesign>

                  <FontDesign
                    $fontSize={'15px'}
                    style={{
                      maxWidth: '430px',
                    }}
                  >
                    平台对Ant Design 以及 Semantic UI
                    进行二次封装，基于dumi文档，展示封装后元件两大 UI
                    框架封装后总计暴露 60+ 不同的交互组件...
                  </FontDesign>

                  <Divider hidden />
                  {/*@ts-ignore*/}
                  <Button color="teal">原生组件库</Button>
                  {/*@ts-ignore*/}
                  <Button primary>封装组件库</Button>
                </div>
              </Grid.Column>
            </Grid>
          </div>

          <div style={{ marginTop: '8em' }}>
            <Grid>
              <Grid.Column width={7}>
                <div style={{ paddingLeft: '14em' }}>
                  {/*@ts-ignore*/}
                  <Label color="pink">ASSETS</Label>

                  <Divider hidden />

                  <HeaderDesign $fontSize={'34px'} $color="black">
                    资源、设计、源码
                    <br />
                    完全开源 !
                  </HeaderDesign>

                  <FontDesign
                    $fontSize={'15px'}
                    style={{
                      maxWidth: '430px',
                    }}
                  >
                    Envelope Platform 秉承开源思想，Envelope
                    开发中所有产生的物料都已在GitHub等仓库开源。 Envelope
                    提供了完善的设计手稿，包含原生引擎设计文档，原生引擎功能流图。提供了软件工程开发全周期的各项资料，
                    支持其余爱好者进行独立二次开发 ...
                  </FontDesign>

                  <FontDesign
                    $fontSize={'15px'}
                    style={{
                      maxWidth: '430px',
                    }}
                  >
                    Envelope Platform 设计中产出的所有设计文稿均采导出为 Figma
                    文档，包含设计中所有参考的 Figma 设计项目， 目前均以上传
                    GitHub 供各位参考查阅 ...
                  </FontDesign>

                  <Divider hidden />
                  {/*@ts-ignore*/}
                  <Button primary>GitHub</Button>
                </div>
              </Grid.Column>
              <Grid.Column width={9}>
                <Image size="large" centered src={asserts} />
              </Grid.Column>
            </Grid>
          </div>
        </section>

        {/*5 - 更多*/}
        <section style={{ marginTop: '6em', background: '#6A7EDA' }}>
          <Grid>
            <Grid.Row>
              <Grid.Column width={12}>
                <SegmentWrapper basic textAlign="center">
                  <HeaderDesign $fontSize={'30px'}>更多特性</HeaderDesign>
                  <FontDesign $fontSize={'16px'} style={{ color: 'white' }}>
                    UI框架、用户手册、设计手稿、设计资源、可视化编程、更多的低代码产品
                    <br />
                    持续集成 持续交付 给你最棒的低代码体验
                  </FontDesign>
                  {/*@ts-ignore*/}
                  <Button color="orange">立刻访问</Button>
                </SegmentWrapper>
              </Grid.Column>
              <Grid.Column width={4}>
                <Image size={'massive'} src={more} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};
