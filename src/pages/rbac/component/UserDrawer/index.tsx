import { Avatar, Button, Descriptions, Drawer } from 'antd';
import React, { Component, useEffect, useRef, useState } from 'react';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import { history } from 'umi';

const UserDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  const { cstate, dispatch } = props;
  const [user, setUser] = useState<any>({});
  const drawRef = useRef<any>(null);

  useEffect(() => {
    console.log('当前cstate', cstate);
    if (cstate.visible) {
      setVisible(true);
      setUser(cstate.user);
    }
  }, [cstate]);

  const onClose = () => {
    dispatch({
      type: 'rbacModal/changeDrawer',
      payload: {
        visible: false,
        user: {},
      },
    });
    setVisible(false);
    setUser({});
  };

  return (
    <React.Fragment>
      <div>
        <Drawer
          title="用户信息"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <Avatar size={64} src={user.userAvatar} />
          <Descriptions column={1}>
            <div style={{ margin: '20px' }} />
            <Descriptions.Item label="编号">{user.userId}</Descriptions.Item>
            <Descriptions.Item label="昵称">
              {user.userNickname}
            </Descriptions.Item>
            <Descriptions.Item label="用户名">
              {user.userUsername}
            </Descriptions.Item>
            <Descriptions.Item label="电话">{user.userPhone}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user.userEmail}</Descriptions.Item>
            <Descriptions.Item label="角色">{user.userRole}</Descriptions.Item>
            <Descriptions.Item label="备注">
              {user.userDescription}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ margin: '50px' }} />
          <Button
            danger
            icon={<PoweroffOutlined />}
            block={true}
            onClick={() => {
              history.replace('/login');
            }}
          >
            退出
          </Button>
        </Drawer>
      </div>
    </React.Fragment>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.rbacModal,
  };
})(UserDrawer);
