import React, { useState } from 'react';
import UserTable from '@/pages/rbac/component/UserTable';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import { rbac_port } from '@/utils/port';
import axios from 'axios';

const { Option } = Select;

const UserList = (props: any) => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any>([]);

  const handleQuery = async () => {
    const row = await form.validateFields();
    const { username, role } = row;

    const flag = username === undefined || username.length === 0;
    //console.log('form', row)
    /**
     * username:string;
     * role:'admin'|'user'
     */

    if (!flag && role !== undefined) {
      axios.get(rbac_port + '/back/queryByUsernameAndRole').then((res) => {
        const { data } = res.data;
        setData(data);
      });
    } else if (!flag && role === undefined) {
      axios.get(rbac_port + '/back/queryByUsername').then((res) => {
        const { data } = res.data;
        setData(data);
      });
    } else if (flag && role !== undefined) {
      axios.get(rbac_port + '/back/queryByRole').then((res) => {
        const { data } = res.data;
        console.log('by role');
        setData(data);
      });
    } else if (flag && role === undefined) {
      message.error('请至少查询一个信息');
    }
  };

  const handleReset = () => {
    setData([]);
  };

  return (
    <>
      <div>
        <Form style={{ marginTop: '2em' }} layout="horizontal" form={form}>
          <Row gutter={24}>
            <Col span={9}>
              <Form.Item
                label="用户名"
                name="username"
                style={{ paddingLeft: '1em' }}
              >
                <Input allowClear placeholder="请输入需要查询的用户名" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item
                label="角色"
                name="role"
                style={{ paddingLeft: '1.5em' }}
              >
                <Select allowClear style={{ width: '300px' }}>
                  <Option key={'admin'}>
                    <Tag color="magenta">管理员</Tag>
                  </Option>
                  <Option key={'user'}>
                    <Tag color="green">用户</Tag>
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Space style={{ paddingLeft: '1em', paddingRight: '1em' }}>
                <Button
                  style={{ width: '90px' }}
                  type="primary"
                  onClick={handleQuery}
                >
                  查询
                </Button>
                <Button style={{ width: '90px' }} onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </div>

      <UserTable query={data} />
    </>
  );
};

export default UserList;
