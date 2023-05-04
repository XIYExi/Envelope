import React, { useEffect, useState } from 'react';
import { Table, Tag, Typography } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import { EyeOutlined } from '@ant-design/icons';
import axios from 'axios';
import { rbac_port } from '@/utils/port';
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
}

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
];

const UserTable = (props: any) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

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

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

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
    </React.Fragment>
  );
};

export default UserTable;
