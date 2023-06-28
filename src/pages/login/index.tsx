import React from 'react';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Grid,
  Header,
  Image,
  Popup,
  Segment,
} from 'semantic-ui-react';
import logo from '../../assets/home/loleLogo.png';
import signin from '../../assets/home/signin.png';
import signup from '../../assets/home/signup.png';
import axios from 'axios';
import { setJwtToken } from '@/utils/tools';
import { history } from 'umi';
import { back_port } from '@/utils/port';
import { message } from 'antd';
import styled from 'styled-components';

const DividerWrapper = styled(Divider)`
  margin-top: 3em !important;
  margin-bottom: 3em !important;
`;

const FormItemWrapper = styled(Form.Input)`
  margin-bottom: 1.5em !important;
`;

const SegmentWrapper = styled(Segment)`
  margin-top: 0 !important;
  padding-top: 0 !important;
`;

class LoginForm extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      inputTel: 0,
      inputPwd: 0,
      inputUsername: '',
      inputNickname: '',
      which: 'in',
    };
  }

  bindInputUsername = (e) => {
    const inputTel = e.target.value;
    this.setState({
      inputUsername: inputTel,
    });
  };

  bindInputNickname = (e) => {
    const inputTel = e.target.value;
    this.setState({
      inputNickname: inputTel,
    });
  };

  bindInputTel = (e) => {
    const inputTel = e.target.value;
    this.setState({
      inputTel: inputTel,
    });
  };

  bindInputPwd = (e) => {
    const inputPwd = e.target.value;
    this.setState({
      inputPwd: inputPwd,
    });
  };

  bindLoginBtn = () => {
    const { inputUsername, inputPwd } = this.state;
    //console.log(inputUsername,inputPwd)

    // TODO 部署github page删除后端，直接进入管理界面，用户名为admin则直接进入rbac
    if (inputUsername === 'admin') history.replace('/rbac');
    else history.replace('/inner');

    /*axios
      .post(
        back_port +
          '/user/login?username=' +
          inputUsername +
          '&pwd=' +
          inputPwd,
      )
      .then((response) => {
        console.log(response);

        if (response.data.message !== '用户不存在') {
          setJwtToken(response.data.message);

          if (inputUsername === 'admin') history.replace('/rbac');
          else history.replace('/inner');
        } else message.error(response.data.message);
      })
      .catch((error) => console.log(error));*/
  };

  bindSignUpBtn = () => {
    const { inputTel, inputUsername, inputNickname, inputPwd } = this.state;

    message.info('注册成功');

    /*axios
      .post(
        back_port +
          `/user/signup?username=` +
          inputUsername +
          '&nickname=' +
          inputNickname +
          '&pwd=' +
          inputPwd +
          '&tel=' +
          inputTel,
      )
      .then((response) => {
        //console.log(response)
        message.info(response.data.message === 'ok' ? '注册成功' : '注册失败');
      })
      .catch((error) => console.log(error));*/
  };

  jumpToSignUp = () => {
    const { which } = this.state;
    let _which = '';
    if (which === 'in') _which = 'out';
    else if (which === 'out') _which = 'in';
    this.setState({
      which: _which,
    });
  };

  render() {
    return (
      <div className="login">
        <Grid style={{ height: '100vh' }} verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={4}>
              <div style={{ paddingLeft: '3em' }}>
                <Header as="h2" color="teal" textAlign="center">
                  <Image style={{ width: '64px' }} src={logo} />
                  <p
                    style={{
                      marginTop: '0.3em',
                      fontSize: '24px',
                      fontWeight: 550,
                    }}
                  >
                    Envelope
                  </p>
                </Header>

                <DividerWrapper horizontal>
                  {this.state.which === 'in' ? '用户登录' : '新用户注册'}
                </DividerWrapper>

                {this.state.which === 'in' && (
                  <>
                    <Form size="large">
                      <Segment basic>
                        <Form.Field>
                          <label>用户名</label>
                          <FormItemWrapper
                            fluid
                            icon="user"
                            iconPosition="left"
                            onChange={(e) => this.bindInputUsername(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>密码</label>
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            onChange={(e) => this.bindInputPwd(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          {/*@ts-ignore*/}
                          <Checkbox label="记住我" />
                          <span style={{ position: 'absolute', right: '5px' }}>
                            {/*@ts-ignore*/}
                            <Popup
                              content="鬼"
                              position="bottom right"
                              trigger={<a>忘记密码？</a>}
                            />
                          </span>
                        </Form.Field>

                        <div style={{ marginTop: '3em' }}>
                          {/*@ts-ignore*/}
                          <Button
                            color="teal"
                            fluid
                            size="large"
                            onClick={this.bindLoginBtn}
                          >
                            登录
                          </Button>
                        </div>
                      </Segment>
                    </Form>
                    {/* @ts-ignore*/}
                    <SegmentWrapper basic textAlign={'center'}>
                      新用户？ <a onClick={this.jumpToSignUp}>立刻注册</a>
                    </SegmentWrapper>
                  </>
                )}
                {this.state.which === 'out' && (
                  <>
                    <Form size="large">
                      <Segment basic>
                        <Form.Field>
                          <label>请输入用户名</label>
                          <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="username"
                            onChange={(e) => this.bindInputUsername(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>请输入昵称</label>
                          <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="nickname"
                            onChange={(e) => this.bindInputNickname(e)}
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>请输入密码</label>
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            onChange={(e) => this.bindInputPwd(e)}
                            placeholder="password"
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>请确认密码</label>
                          <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            type="password"
                            placeholder="password"
                          />
                        </Form.Field>

                        <Form.Field>
                          <label>请输入联系方式</label>
                          <Form.Input
                            fluid
                            icon="phone"
                            iconPosition="left"
                            placeholder="Phone"
                            onChange={(e) => this.bindInputTel(e)}
                          />
                        </Form.Field>

                        <div style={{ marginTop: '3em' }}>
                          {/*@ts-ignore*/}
                          <Button
                            color="teal"
                            fluid
                            size="large"
                            onClick={this.bindSignUpBtn}
                          >
                            注册
                          </Button>
                        </div>
                      </Segment>
                    </Form>
                    {/* @ts-ignore*/}
                    <SegmentWrapper basic textAlign={'center'}>
                      已有账号 返回到 <a onClick={this.jumpToSignUp}>登录</a>
                    </SegmentWrapper>
                  </>
                )}
              </div>
            </Grid.Column>
            <Grid.Column width={12}>
              <Image
                centered
                src={this.state.which === 'in' ? signin : signup}
                size="big"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
