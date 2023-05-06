/**
 * 日志监控
 */
import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import axios from 'axios';
import { rbac_port } from '@/utils/port';
import styled from 'styled-components';
import { Button, Modal, Spin, Typography } from 'antd';

const CodeWrapper = styled.div`
  display: flex;
  padding: 0.5em;
  margin: 0.4em;
  width: 100% !important;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 1.1em;
  }
`;

const CodeTitle = styled(Typography.Title)`
  width: 2.5em;
  text-align: center;
  font-size: 1.5em !important;
  margin-left: 1em;
  margin-right: 0.5em;
`;

const CodeMirrorWrapper = styled(CodeMirror)`
  width: 100% !important;
`;

/**
 * 定时器中异步更新code的值，但是长度却一直为0，所以无法通过长度判断当前数组长度
 */
let clock: number = 0;
const LogMirror = (props: any) => {
  const [code, setCode] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * 每10s获得一次日志
   */
  useEffect(() => {
    //console.log('开启定时器')
    const timer = setInterval(() => {
      //console.log('进入定时器')
      axios.get(rbac_port + '/log/query').then((res) => {
        const { data } = res.data;
        clock += 5;
        setLoading(false);
        if (clock <= 100) {
          setCode((code) => [...data, ...code]);
        } else {
          setCode(data);
          clock = 0;
        }
      });
      return () => {
        //console.log('清除定时器')
        clearInterval(timer);
      };
    }, 2000);
  }, []);

  return (
    <>
      <Spin
        spinning={loading}
        tip="正在获取服务器日志，请稍等..."
        size="large"
        style={{ marginTop: '5em' }}
      >
        {code.map((item, index) => {
          return (
            <div style={{ display: 'flex' }}>
              <CodeWrapper>
                <CodeTitle>{index + 1}</CodeTitle>
                <CodeMirrorWrapper value={item} key={index} />
              </CodeWrapper>
            </div>
          );
        })}
      </Spin>
    </>
  );
};

export default LogMirror;
