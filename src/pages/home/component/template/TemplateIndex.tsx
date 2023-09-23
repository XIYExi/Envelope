import React, { useState } from 'react';
import { Divider, Typography } from 'antd';
import GitHubButton from '@/pages/home/component/common/GitHubButton';
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  Popup,
  Segment,
} from 'semantic-ui-react';
import template from '../../../../assets/home/template.png';
import styled from 'styled-components';
import templatelogo1 from '../../../../assets/home/templatelogo1.png';
import templatelogo2 from '../../../../assets/home/templatelogo2.png';
import templatelogo3 from '../../../../assets/home/templatelogo3.png';
import templatelogobg from '../../../../assets/home/templatelogobg.png';

const HeaderDesign = styled.h1<{
  $color: string;
  $fontSize: string;
  $fontWeight: number;
}>`
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
  font-weight: ${(props) => props.$fontWeight};
`;

const FontDesign = styled.p`
  margin-top: 2em;
  margin-bottom: 3em;
  color: rgba(0, 0, 0, 0.5);
  font-size: 15px;
`;

const SegmentDesign = styled(Segment)<{
  $bgColor?: string;
}>`
  padding-left: 5em !important;
  background-color: ${(props) =>
    props.$bgColor ? props.$bgColor : undefined}!important;
`;

const ImageBGDesign = styled(
  /*@ts-ignore*/
  Image,
)`
  width: 100% !important;
  height: 400px !important;
`;

const CardDesign = styled(
  /*@ts-ignore*/
  Card,
)<{
  $bgColor: string;
  $color: string;
}>`
  background-color: ${(props) => props.$bgColor}!important;
  height: 400px !important;
  width: 370px !important;
  border: none !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  border-radius: 12px !important;
  color: ${(props) => props.$color}!important;
  margin: auto !important;
`;

const ImageDesign = styled(Image)`
  margin-top: 4em !important;
  margin-bottom: 4em !important;
  padding-left: 2em !important;
`;

const TemplateDesign = styled(Image)`
  width: 400px !important;
  height: 450px !important;
  box-shadow: 0 8px 24px rgba(163, 177, 191, 0.35) !important;
  margin: auto !important;
  object-fit: cover !important;
  object-position: top !important;
  transition: object-position 2s !important;
  &:hover {
    object-position: bottom !important;
  }
`;

const TemplateIndex = (props: any) => {
  const [email, setEmail] = useState<string>('');
  const handleInput = (e: any, data: any) => {
    //console.log(data)
    setEmail(data.value);
  };

  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>React 模板搭建</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          快速搭建动效官网
        </Typography.Paragraph>
        <GitHubButton url="https://github.com/XIYExi/Envelope" />
        <Divider />
      </div>

      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <SegmentDesign basic>
              <HeaderDesign
                $fontSize="35px"
                $fontWeight={550}
                $color="black"
                style={{
                  marginBottom: '5px',
                  marginTop: '1em',
                }}
              >
                模板网页开发
              </HeaderDesign>
              <HeaderDesign $fontSize="26px" $fontWeight={500} $color="black">
                Ink 原生引擎,
                <br />
                React, 动效, 简单操作, 源码导出
              </HeaderDesign>

              <FontDesign style={{ width: '640px' }}>
                模板编辑器基于 Ink 原生引擎，继续参照 JSON Schema
                规范构建低代码项目，
                为了弥补原生引擎在大屏幕设备上遗留的缺陷，我们设计了模块化网页模板编辑器。
                Ink Template Engine 拥有丰富的各类首页模板，
                下载模板代码包，即可快速使用，
                也可以使用首页编辑器，快速搭建一个属于你的专属首页。
              </FontDesign>

              {/*@ts-ignore*/}
              <Input
                type="text"
                placeholder="输入邮箱获取激活码..."
                action
                onChange={(e, data) => handleInput(e, data)}
              >
                <input
                  style={{
                    width: '380px',
                  }}
                />
                {/*@ts-ignore*/}
                <Button
                  primary
                  type="submit"
                  onClick={(event, data) => {
                    //console.log('hello', email)
                    //TODO 检验邮箱
                  }}
                >
                  免费使用
                </Button>
              </Input>
              <FontDesign
                style={{
                  marginTop: '0.5em',
                  color: 'rgba(255,75,75,0.8)',
                  fontSize: '14px',
                }}
              >
                * 模板编辑器仍在测试中，通过邮箱验证即可免费使用
              </FontDesign>
            </SegmentDesign>
          </Grid.Column>
          <Grid.Column width={6}>
            <Image size="big" floated="right" src={template} />
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div style={{ marginTop: '5em' }} />

      <SegmentDesign $bgColor="#004050">
        <Grid>
          <Grid.Row columns="equal">
            <Grid.Column>
              <HeaderDesign
                $fontWeight={450}
                $color="white"
                $fontSize="40px"
                style={{
                  paddingTop: '2.2em',
                  paddingLeft: '2.45em',
                }}
              >
                三大特性
              </HeaderDesign>
            </Grid.Column>
            <Grid.Column>
              <FontDesign
                style={{
                  marginTop: '5em',
                  marginBottom: '5em',
                  color: 'white',
                  opacity: 0.7,
                  height: '100px',
                  width: '400px',
                }}
              >
                所有的模块与模板都基于 Ant Design 以及 Ink
                内部约定的设计规范设计，你可以直接下载我们的模板以及源码，
                也可以使用我们的编辑器，快速搭建一个属于你的专属首页。
              </FontDesign>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="equal">
            <Grid.Column>
              <CardDesign raised={true} $color="black" $bgColor="#FFE377">
                <Card.Content>
                  <ImageDesign size="tiny" src={templatelogo1} />

                  <Divider />

                  <Card.Header>
                    <div
                      style={{
                        paddingLeft: '0.9em',
                        fontSize: '20px',
                        marginBottom: '16px',
                      }}
                    >
                      设计指引
                    </div>
                  </Card.Header>
                  <Card.Description>
                    <div style={{ paddingLeft: '1em' }}>
                      提供详细的设计指南，讲解动效模板实现思路，采用内置dumi部署文档，快捷访问。
                      我们将持续迭代，逐步沉淀和总结出更多首页模块的代码实现，阐述首页(Ink
                      page)的最佳实践， 也十分期待你的参与和共建。
                    </div>
                  </Card.Description>
                </Card.Content>
              </CardDesign>
            </Grid.Column>
            <Grid.Column>
              <CardDesign
                raised
                $bgColor="rgba(255,255,255,0.04)"
                $color="white"
              >
                <Card.Content>
                  <ImageDesign size="tiny" src={templatelogo2} />

                  <Divider />

                  <Card.Header>
                    <div
                      style={{
                        paddingLeft: '0.9em',
                        fontSize: '20px',
                        marginBottom: '16px',
                        color: 'white',
                      }}
                    >
                      Figma 资源包
                    </div>
                  </Card.Header>
                  <Card.Description>
                    <div style={{ paddingLeft: '1em', color: 'white' }}>
                      Ink 模板设计器所有模板均来自 Figma
                      设计稿，我们提供了大量的设计手稿供参考、下载。
                      任何人都可以在我们的官网上下载我们的设计资源，此外更多的设计资源正在整理和完善中。
                    </div>
                  </Card.Description>
                </Card.Content>
              </CardDesign>
            </Grid.Column>
            <Grid.Column>
              <CardDesign
                raised
                $bgColor="rgba(255,255,255,0.04)"
                $color="white"
              >
                <Card.Content>
                  <ImageDesign size="tiny" src={templatelogo3} />

                  <Divider />

                  <Card.Header>
                    <div
                      style={{
                        paddingLeft: '0.9em',
                        fontSize: '20px',
                        marginBottom: '16px',
                        color: 'white',
                      }}
                    >
                      响应式布局
                    </div>
                  </Card.Header>
                  <Card.Description>
                    <div style={{ paddingLeft: '1em', color: 'white' }}>
                      Ink 模板编辑器完美解决了 H5
                      引擎中无法适配响应式的问题，采用 Ant Design 元件库以及
                      React Animate
                      动画库，制作具有动效动画的响应式网站首页。目前设计器模板采用24栅格布局(Grid)，
                      后续将添加Layout布局(网站骨架)。
                    </div>
                  </Card.Description>
                </Card.Content>
              </CardDesign>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </SegmentDesign>

      <div style={{ marginTop: '5em' }} />

      <Segment basic>
        <HeaderDesign
          $color={'black'}
          style={{
            textAlign: 'center',
            marginBottom: '4em',
          }}
          $fontSize={'32px'}
          $fontWeight={450}
        >
          丰富的模板
        </HeaderDesign>

        <Grid>
          <Grid.Row columns="4">
            {new Array(8).fill(0).map((item, index) => {
              return (
                <Grid.Column>
                  <div style={{ marginTop: '1.5em', marginBottom: '1.5em' }}>
                    <TemplateDesign src="https://gw.alipayobjects.com/mdn/rms_ae7ad9/afts/img/A*NLz5QayvKkkAAAAAAAAAAABkARQnAQ" />
                    <div
                      style={{
                        textAlign: 'center',
                        marginTop: '14px',
                        fontSize: '18px',
                        color: 'rgba(0,0,0,0.5)',
                      }}
                    >
                      中后台模板
                    </div>
                  </div>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        </Grid>
      </Segment>

      <div style={{ marginTop: '8em' }} />

      <div style={{ position: 'relative' }}>
        <ImageBGDesign src={templatelogobg} />
        <div
          style={{
            position: 'absolute',
            textAlign: 'left',
            marginTop: '-20em',
            marginLeft: '8em',
          }}
        >
          <HeaderDesign
            $color={'white'}
            $fontSize={'28px'}
            $fontWeight={450}
            style={{ marginBottom: '2.5em' }}
          >
            立刻使用 Ink page 编辑器，
            <br />
            使用风格迥异的模板快速构建你的网页
          </HeaderDesign>
          {/*@ts-ignore*/}
          <Button primary>
            立刻访问
            {/*@ts-ignore*/}
            <Icon name="arrow right" />
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TemplateIndex;
