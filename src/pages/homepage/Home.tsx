import React from 'react';
import './index.less';
import { Button, Divider, Grid, Image, Segment } from 'semantic-ui-react';
import phone from '../../assets/pages/phone.png';
import styled from 'styled-components';
/*@ts-ignore*/
import VideoPlay from 'react-sublime-video';

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

export const Home = (props: any) => {
  return (
    <React.Fragment>
      <div className="bg">
        {/*1 - 首页*/}
        <section style={{ height: '100vh' }}>
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

                <Button size="large">下载客户端</Button>
                <Button size="large" color="teal">
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
                <Button
                  floated="right"
                  circular
                  color="twitter"
                  icon="twitter"
                />
                <Button
                  floated="right"
                  circular
                  color="linkedin"
                  icon="linkedin"
                />
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

        <section style={{ height: '100vh' }}>
          <Segment basic textAlign="center">
            <HeaderDesign $fontSize={'40px'} $color="black">
              集成三大引擎
            </HeaderDesign>
            <FontDesign $fontSize={'20px'} style={{ textAlign: 'center' }}>
              Envelope
              低代码整合平台旨在提供多种多样的低代码构建方式，因此集成更多的低代码引擎只为给你带来最棒的使用体验。
            </FontDesign>

            <Grid>
              <Grid.Row columns="equal">
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </section>
      </div>
    </React.Fragment>
  );
};
