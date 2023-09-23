import React, { FC } from 'react';
import styled from 'styled-components';
import { Alert, Tag, Typography } from 'antd';
import { Divider, Segment } from 'semantic-ui-react';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const HeadWrapper = styled.div`
  padding: 1.6em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

const SegmentWrapper = styled.div`
  margin: 2em;
  padding: 1em;
`;

const Home: FC = (props: any) => {
  return (
    <>
      <HeadWrapper>
        <Typography.Title level={2}>Ink 管理页</Typography.Title>
      </HeadWrapper>

      <SegmentWrapper>
        <Alert type="success" message="欢迎回来，管理员 xiye" closable />

        <Divider hidden />

        <Segment>
          <Typography.Title level={5}>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              warning
            </Tag>
            请自觉遵守操作规范
          </Typography.Title>
        </Segment>

        <Segment>
          <Typography.Title level={5}>
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              warning
            </Tag>
            管理责任重大，修改数据请谨慎！
          </Typography.Title>
        </Segment>
      </SegmentWrapper>
    </>
  );
};

export default Home;
