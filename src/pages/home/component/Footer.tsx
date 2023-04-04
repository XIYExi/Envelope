import React from 'react';
import styled from 'styled-components';
import { Button, Grid, Header, Image } from 'semantic-ui-react';
import logo from '../../../assets/home/loleLogo.png';
import { Divider } from 'antd';

const FooterContainer = styled.footer`
  margin-top: 9em;
  margin-bottom: 20px;
`;

const FontDesign = styled.p`
  color: black;
  opacity: 0.6;
  font-size: 15px;
  margin-top: 2em;
  margin-bottom: 2em;
`;

const FontDesignItem = styled.p`
  color: black;
  opacity: 0.6;
  font-size: 15px;
`;

const SocialButton = styled(
  /*@ts-ignore*/
  Button,
)`
  margin-right: 1em !important;
`;

const Footer = (props: any) => {
  return (
    <React.Fragment>
      <FooterContainer>
        <Grid>
          <Grid.Column width={5}>
            <div style={{ paddingLeft: '6em' }}>
              <div style={{ display: 'flex' }}>
                <Image size="mini" src={logo} />
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    marginTop: '0.2em',
                    marginLeft: '1em',
                  }}
                >
                  Envelope
                </p>
              </div>

              <FontDesign>
                Envelope 低代码整合平台
                <br />
                使用自研引擎、Lowcode-Engine、AntV
                <br />
                致力于带给你最好的低代码体验
              </FontDesign>

              <SocialButton
                size="mini"
                circular
                color="facebook"
                icon="facebook"
              />
              <SocialButton
                size="mini"
                circular
                color="twitter"
                icon="twitter"
              />
              <SocialButton
                size="mini"
                circular
                color="linkedin"
                icon="linkedin"
              />
              <SocialButton
                size="mini"
                circular
                color="google plus"
                icon="google plus"
              />
            </div>
          </Grid.Column>

          <Grid.Column width={2}>
            <Header as="h4">团队</Header>

            <FontDesignItem>关于</FontDesignItem>
            <FontDesignItem>生命周期</FontDesignItem>
            <FontDesignItem>参考</FontDesignItem>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4">产品</Header>

            <FontDesignItem>H5 原生低代码编辑器</FontDesignItem>
            <FontDesignItem>LoeCode-Engine低代码编辑器</FontDesignItem>
            <FontDesignItem>原生模板编辑器</FontDesignItem>
            <FontDesignItem>AntV可视化流程图编辑器</FontDesignItem>
          </Grid.Column>
          <Grid.Column width={3}>
            <Header as="h4">资源</Header>

            <FontDesignItem>UI 框架设计稿</FontDesignItem>
            <FontDesignItem>Figma 设计资源</FontDesignItem>
            <FontDesignItem>Envelope 设计稿</FontDesignItem>
            <FontDesignItem>插件设计稿</FontDesignItem>
          </Grid.Column>

          <Grid.Column width={3}>
            <Header as="h4">更多</Header>

            <FontDesignItem>联系我们</FontDesignItem>
            <FontDesignItem>GitHub</FontDesignItem>
            <FontDesignItem>Gitee</FontDesignItem>
          </Grid.Column>
        </Grid>

        <Divider
          style={{
            marginTop: '7em',
          }}
        />

        <Grid>
          <Grid.Column width={4}>
            <FontDesignItem style={{ textAlign: 'right' }}>
              Envelope 开发团队
            </FontDesignItem>
          </Grid.Column>
          <Grid.Column width={8}>
            <FontDesignItem style={{ textAlign: 'center' }}>
              京海建工集团
            </FontDesignItem>
          </Grid.Column>
          <Grid.Column width={4}>
            <FontDesignItem>2023.04.04</FontDesignItem>
          </Grid.Column>
        </Grid>
      </FooterContainer>
    </React.Fragment>
  );
};

export default Footer;
