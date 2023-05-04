import { Layout, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { IRouteComponentProps } from 'umi';
import MenuBar from '@/pages/rbac/component/MenuBar';
import UserDrawer from '@/pages/rbac/component/UserDrawer';

const { Header, Content, Footer, Sider } = Layout;

export default function Rbac({ children }: IRouteComponentProps) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapse) => {
    setCollapsed(collapse);
  };

  return (
    <React.Fragment>
      <Layout style={{ minHeight: '100vh' }}>
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

        <Layout style={{ backgroundColor: '#fff' }}>
          <Header>hello</Header>
          <Content>
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
          <Footer>
            <Typography.Title>这是一个Footer，暂时用于占位</Typography.Title>
          </Footer>
        </Layout>
      </Layout>
    </React.Fragment>
  );
}
