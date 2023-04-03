import React from 'react';
import { Divider, Typography } from 'antd';
import GitHubButton from '@/pages/home/component/common/GitHubButton';
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';

const FontDesign = styled.p`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  display: flex;
`;

const CheckDesign = styled(
  /*@ts-ignore*/
  Icon,
)`
  margin-right: 10px !important;
`;

const AntVIndex = (props: any) => {
  return (
    <React.Fragment>
      <div
        style={{
          width: '100%',
          marginTop: '25px',
        }}
      >
        <Typography.Title level={3}>流程图编辑器</Typography.Title>
        <Typography.Paragraph style={{ color: 'gray' }}>
          基于 AntV/X6 图引擎快速搭建流程图
        </Typography.Paragraph>

        <GitHubButton url="https://github.com/XIYExi/Envelope" />

        <Divider />
      </div>

      <div></div>
    </React.Fragment>
  );
};

export default AntVIndex;
