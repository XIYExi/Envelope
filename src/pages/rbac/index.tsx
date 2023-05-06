import { Avatar, Image, Layout, Typography } from 'antd';
import React, { useState } from 'react';
import { IRouteComponentProps } from 'umi';
import MenuBar from '@/pages/rbac/component/MenuBar';
import UserDrawer from '@/pages/rbac/component/UserDrawer';
import { history } from 'umi';
import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';

import logo from '../../assets/home/loleLogo.png';

const { Header, Content, Footer, Sider } = Layout;

export default function Rbac({ children }: IRouteComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };

  return (
    <React.Fragment>
      <Layout style={{ minHeight: '100vh' }}>
        <Header>
          <Image preview={false} src={logo} width="36px" height="36px" />
        </Header>

        <Layout style={{ backgroundColor: '#fff' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={300}
            style={{ minHeight: '100vh' }}
            theme="light"
          >
            <MenuBar />
          </Sider>

          <Layout>
            <Content id="rbac-layout-content">
              {children}
              {/*<Switch>
                <Route path='/back/systea' component={SysTea}/>
                <Route path='/back/sysstu' component={SysStu}/>
                <Route path='/back/sysorg' component={SysOpt}/>
                <Route path='/back/syslog' component={SysLog}/>
                <Route path='/back/sysopt' component={SysOpt}/>

                <Route path='/back/sysswagger' component={SysSwagger}/>
                <Route path='/back/sysdatabase' component={SysDataBase}/>
                <Route path='/back/sysinterface' component={SysInterface}/>

              </Switch>*/}
              <UserDrawer />
            </Content>
            {history.location.pathname.split('/').slice(-1)[0] ===
            'server' ? undefined : (
              <Footer style={{ textAlign: 'center' }}>
                <Typography.Text>
                  {'ε٩(๑> ₃ <)۶з'}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ fontWeight: 550 }}>Envelope</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (๑╹◡╹๑)
                </Typography.Text>
                <br />
                <Typography.Text>
                  2023.05.05 京海建工集团 Copyright©
                </Typography.Text>
              </Footer>
            )}
          </Layout>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
