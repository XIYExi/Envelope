import { Menu, Avatar } from 'antd';
import {
  AppstoreOutlined,
  BookOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
/*@ts-ignore*/
import { history } from 'umi';
import { rbac_port } from '@/utils/port';
import axios from 'axios';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';

const { SubMenu } = Menu;

const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

const bookList = [
  { key: 10, title: 'Swagger文档', path: '/back/sysswagger' },
  { key: 11, title: '数据库文档', path: '/back/sysdatabase' },
  { key: 12, title: '数据接口文档', path: '/back/sysinterface' },
];

const MenuBar = (props: any) => {
  const [openKeys, setOpenKeys] = React.useState(['sub1']);

  const { cstate, dispatch } = props;

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const handleOpenUserCenter = async () => {
    // TODO 从后端获取数据
    await axios.post(rbac_port + '/back/center').then((res) => {
      const { data } = res.data;
      // console.log(data);
      dispatch({
        type: 'rbacModal/changeDrawer',
        payload: {
          visible: true,
          user: data,
        },
      });
    });
  };

  return (
    <Menu mode="inline">
      <Menu.Item
        icon={<UserOutlined />}
        onClick={() => {
          history.push('/rbac/');
        }}
      >
        首页
      </Menu.Item>

      <Menu.Item icon={<UserOutlined />} onClick={handleOpenUserCenter}>
        用户中心
      </Menu.Item>

      <Menu.Item
        icon={<MailOutlined />}
        onClick={() => {
          history.push('/rbac/userlist');
        }}
      >
        用户管理
      </Menu.Item>

      <Menu.Item icon={<BookOutlined />} onClick={() => {}}>
        模板管理
      </Menu.Item>

      <Menu.Item icon={<AppstoreOutlined />} onClick={() => {}}>
        日志查询
      </Menu.Item>

      <Menu.Item icon={<SettingOutlined />} onClick={() => {}}>
        微服务查询
      </Menu.Item>

      <Menu.Item icon={<SettingOutlined />} onClick={() => {}}>
        数据库查询
      </Menu.Item>

      <SubMenu icon={<BookOutlined />} title="开发内档">
        {bookList.map((_item, index) => {
          return (
            <Menu.Item key={_item.key} onClick={() => {}}>
              {_item.title}
            </Menu.Item>
          );
        })}
      </SubMenu>
    </Menu>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.rbacModal,
  };
})(MenuBar);
