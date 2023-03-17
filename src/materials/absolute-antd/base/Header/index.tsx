import React, { FC, memo, useState } from 'react';
import Logo from '../../../../assets/absolute/Logo.png';
import { Avatar, Button, Image } from 'antd';
import styled from 'styled-components';
import { IHeaderConfig } from '@/materials/absolute-antd/base/Header/schema';

const HeaderWrapper = styled.div`
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & button + button {
    margin-left: 10px;
  }
`;

const WelcomeWrapper = styled.div`
  color: #333;
  font-size: 14px;
  margin-right: 10px;
`;

const Svg = styled.div`
  margin-right: 10px;
  max-width: 160px;
  max-height: 46px;
  height: 46px;
  overflow: hidden;
  img {
    height: 100%;
    object-fit: contain;
  }
`;

const H1 = styled.h1<{
  $color: string;
  $fontSize: number;
}>`
  font-weight: 900;
  line-height: 1;
  margin: 6px 0 6px 10px;
  display: inline-block;
  vertical-align: top;
  color: ${(props) => props.$color};
  font-size: ${(props) => props.$fontSize};
`;

const Index = styled.header<{ props: IHeaderConfig }>`
  box-sizing: content-box;
  padding: 3px 12px;
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  position: absolute;
  background-color: ${(props) => props.props.bgColor};
  width: ${(props) => props.props.baseWidth}%;
  height: ${(props) => props.props.baseHeight}%;
  border-radius: ${(props) => props.props.baseRadius};
  transform: translate(
      ${(props) => props.props.baseLeft}px,
      ${(props) => props.props.baseTop}
    )
    scale(${(props) => props.props.baseScale / 100})
    rotate(${(props) => props.props.baseRadius}deg);
`;

export interface IHeaderProProps extends IHeaderConfig {
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

export const AHeader: FC<IHeaderProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    user,
    title,
    logo,
    fontSize,
    color,
    size,
    shape,
    onLogin,
    onLogout,
    onCreateAccount,
  } = restProps;

  const [name, setName] = useState(user);

  const handleOnLogout = () => {
    setName('');
    onLogout && onLogout();
  };

  const handleOnLogin = () => {
    //TODO... 使用redux等组件，动态更新用户名
    setName('xiye');
    onLogin && onLogin();
  };

  const handleOnCreateAccount = () => {
    //TODO... 使用redux等组件，动态更新用户名
    setName('xiye');
    onCreateAccount && onCreateAccount();
  };

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={Logo} alt="" />
        </div>
      )}
      {!isTpl && (
        <Index props={props}>
          <HeaderWrapper>
            <div style={{ display: 'flex' }}>
              <Svg>
                <Avatar
                  shape={shape}
                  size={size}
                  src={logo && logo[0].url}
                  alt={title}
                />
              </Svg>
              <H1 $fontSize={fontSize} $color={color}>
                {title}
              </H1>
            </div>
            <div>
              {name.length > 0 ? (
                <>
                  <WelcomeWrapper>
                    Welcome, <b>{name}</b>!
                  </WelcomeWrapper>
                  <Button size="small" onClick={handleOnLogout}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button size="small" onClick={handleOnLogin}>
                    Log in
                  </Button>
                  <Button
                    type={'primary'}
                    size="small"
                    onClick={handleOnCreateAccount}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </HeaderWrapper>
        </Index>
      )}
    </React.Fragment>
  );
};

export default memo(AHeader);
