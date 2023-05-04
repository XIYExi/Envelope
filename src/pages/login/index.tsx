import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import logo from '../../assets/home/loleLogo.png';
import axios from 'axios';
import { setJwtToken } from '@/utils/tools';
import { history } from 'umi';
import { back_port } from '@/utils/port';
import { message } from 'antd';

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

    axios
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

          history.replace('/inner');
        } else message.error(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  bindSignUpBtn = () => {
    const { inputTel, inputUsername, inputNickname, inputPwd } = this.state;

    axios
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
      .catch((error) => console.log(error));
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
        <Grid
          textAlign="center"
          style={{ height: '100vh' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Image style={{ width: '50px' }} src={logo} /> Envelop
              低代码整合平台
            </Header>
            {this.state.which === 'in' && (
              <>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="用户名"
                      onChange={(e) => this.bindInputUsername(e)}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="密码"
                      type="password"
                      onChange={(e) => this.bindInputPwd(e)}
                    />
                    {/*@ts-ignore*/}
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      onClick={this.bindLoginBtn}
                    >
                      登录
                    </Button>
                  </Segment>
                </Form>
                {/*@ts-ignore*/}
                <Message>
                  新用户？ <a onClick={this.jumpToSignUp}>立刻注册</a>
                </Message>
              </>
            )}
            {this.state.which === 'out' && (
              <>
                <Form size="large">
                  <Segment stacked>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="请输入用户名"
                      onChange={(e) => this.bindInputUsername(e)}
                    />
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="请输入昵称"
                      onChange={(e) => this.bindInputNickname(e)}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="请输入密码"
                      type="password"
                      onChange={(e) => this.bindInputPwd(e)}
                    />
                    <Form.Input
                      fluid
                      icon="lock"
                      iconPosition="left"
                      placeholder="请确认输入密码"
                      type="password"
                    />
                    <Form.Input
                      fluid
                      icon="phone"
                      iconPosition="left"
                      placeholder="请输入电话"
                      onChange={(e) => this.bindInputTel(e)}
                    />
                    {/*@ts-ignore*/}
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      onClick={this.bindSignUpBtn}
                    >
                      注册
                    </Button>
                  </Segment>
                </Form>
                {/*@ts-ignore*/}
                <Message>
                  返回到 <a onClick={this.jumpToSignUp}>登录</a>
                </Message>
              </>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default LoginForm;
