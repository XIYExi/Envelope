import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Table, Tag, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { back_port, rbac_port } from '@/utils/port';
import ReactDOM from 'react-dom';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface DataType {
  userUsername: string;
  userNickname: string;
  pwd: string;
  userPhone: string;
  userEmail: string;
  userRole: string;
  gender: string;
  createTime: string;
  updateTime: string;
  userId: string;
  operation: any;
}

const UpdateModal = (props: any) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (props.editingKey.length !== 0) {
      //不为0，说明选择了数据
      setShow(true);
    } else {
      setShow(false);
    }
  }, [props.editingKey]);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };

  return (
    <>
      <Modal
        title="修改用户信息"
        open={show}
        onOk={props.save}
        onCancel={props.cancel}
        width="60%"
      >
        <Form {...layout} form={props.form}>
          <Form.Item
            label="用户Id"
            name="userId"
            style={{ margin: 0, paddingTop: '1em', paddingBottom: '1em' }}
          >
            <Input placeholder={props.editingKey} disabled />
          </Form.Item>
          <Form.Item
            label="用户名"
            name="userUsername"
            style={{ margin: 0, paddingTop: '1em', paddingBottom: '1em' }}
          >
            <Input placeholder="请录入新的用户名" />
          </Form.Item>
          <Form.Item
            label="用户昵称"
            name="userNickname"
            style={{ margin: 0, paddingTop: '1em', paddingBottom: '1em' }}
          >
            <Input placeholder="请录入新的用户昵称" />
          </Form.Item>
          <Form.Item
            label="用户密码"
            name="pwd"
            style={{ margin: 0, paddingTop: '1em', paddingBottom: '1em' }}
          >
            <Input placeholder="请录入新的用户名密码" />
          </Form.Item>
          <Form.Item
            label="用户角色"
            name="userRole"
            style={{ margin: 0, paddingTop: '1em', paddingBottom: '1em' }}
          >
            <Input placeholder="请录入新的用户角色" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const UserTable = (props: any) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  //const isEditing = (record: DataType) => record.userId === editingKey;

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<DataType> = [
    {
      title: '用户名',
      dataIndex: 'userUsername',
    },
    {
      title: '昵称',
      dataIndex: 'userNickname',
    },
    {
      title: '密码',
      dataIndex: 'pwd',
      render: (pwd) => (
        <div id={pwd}>
          <Typography.Text id={pwd + '-1'} style={{ display: 'block' }}>
            <span>******</span>
            <EyeOutlined
              onClick={() => {
                let dom1 = document.getElementById(pwd + '-1');
                let dom2 = document.getElementById(pwd + '-2');
                /*@ts-ignore*/
                ReactDOM.findDOMNode(dom1).style.display = 'none';
                /*@ts-ignore*/
                ReactDOM.findDOMNode(dom2).style.display = 'block';
              }}
            />
          </Typography.Text>
          <Typography.Text id={pwd + '-2'} style={{ display: 'none' }}>
            <span>{pwd}</span>
            <EyeOutlined
              onClick={() => {
                let dom1 = document.getElementById(pwd + '-1');
                let dom2 = document.getElementById(pwd + '-2');
                /*@ts-ignore*/
                ReactDOM.findDOMNode(dom1).style.display = 'block';
                /*@ts-ignore*/
                ReactDOM.findDOMNode(dom2).style.display = 'none';
              }}
            />
          </Typography.Text>
        </div>
      ),
      width: '10%',
    },
    {
      title: '联系方式',
      dataIndex: 'userPhone',
    },
    {
      title: '邮箱',
      dataIndex: 'userEmail',
    },
    {
      title: '角色',
      dataIndex: 'userRole',
      render: (role) => (
        <Tag color={role ? 'magenta' : 'green'}>{role ? '管理员' : '用户'}</Tag>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render: (gender) => (
        <Tag color={gender ? 'cyan' : 'purple'}>{gender ? '男' : '女'}</Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_: any, record: DataType) => (
        <Typography.Link
          onClick={() => {
            setEditingKey(record.userId);
          }}
        >
          修改
        </Typography.Link>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const fetchData = () => {
    setLoading(true);
    axios.get(rbac_port + '/back/userlist').then((res) => {
      const { data } = res.data;
      setData(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 100,
        },
      });
    });
  };

  const cancel = () => {
    setEditingKey('');
    form.resetFields();
  };

  const save = async () => {
    const row = (await form.validateFields()) as DataType;
    console.log('data', row);
    const json = {
      userId: editingKey,
      userUsername: row.userUsername === undefined ? '' : row.userUsername,
      userNickname: row.userNickname === undefined ? '' : row.userNickname,
      pwd: row.pwd === undefined ? '' : row.pwd,
      userRole: row.userRole === undefined ? '' : row.userRole,
    };

    await axios
      .post(
        back_port +
          `/back/update?
      userId=${json.userId}
      &userUsername=${json.userUsername}
      &userNickname=${json.userNickname}
      &pwd=${json.pwd}
      &userRole=${json.userRole}`,
      )
      .then((res) => {
        const { data } = res.data;

        console.log(data);
        form.resetFields();
        setEditingKey('');
      });
  };

  useEffect(() => {
    props.query.length === 0 && fetchData();
    props.query.length !== 0 && setData(props.query);
  }, [JSON.stringify(tableParams), props.query]);

  return (
    <React.Fragment>
      <Table
        rowKey={(record) => record.userId}
        columns={columns}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        dataSource={data}
      />

      <UpdateModal
        editingKey={editingKey}
        form={form}
        cancel={cancel}
        save={save}
      />
    </React.Fragment>
  );
};

export default UserTable;
