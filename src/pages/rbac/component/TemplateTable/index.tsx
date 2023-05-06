import React, { useEffect, useState } from 'react';
import { Modal, Table, Tag, Typography } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import axios from 'axios';
import { template_port } from '@/utils/port';
import ReactJson from 'react-json-view';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

interface TemplateType {
  templateId: string;
  templateTitle: string;
  templateUi: string;
  templateDesc: string;
  templateType: string;
  createTime: string;
  updateTime: string;
}

const DetailModal = (props: any) => {
  const [show, setShow] = useState<boolean>(false);
  const [content, setContent] = useState<string>('{}');

  useEffect(() => {
    if (props.editingKey.length === 0) {
      setShow(false);

      axios.get(template_port + '/template/queryById').then((res) => {
        const { data } = res.data;
        setContent(data.content);
      });
    } else setShow(true);
  }, [props.editingKey]);

  return (
    <>
      <Modal
        title="修改用户信息"
        open={show}
        onCancel={props.ok}
        onOk={props.ok}
        width="60%"
      >
        {/*@ts-ignore*/}
        <ReactJson src={JSON.parse(content)} collapsed={true} />
      </Modal>
    </>
  );
};

const TemplateTable = (props: any) => {
  const [editingKey, setEditingKey] = useState('');
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const columns: ColumnsType<TemplateType> = [
    {
      title: '模板名',
      dataIndex: 'templateTitle',
    },
    {
      title: 'UI',
      dataIndex: 'templateUi',
      render: (ui) => (
        <>
          {ui === 1 && <Tag color="blue">antd</Tag>}
          {ui === 2 && <Tag color="green">semantic</Tag>}
          {ui === 3 && <Tag color="pink">lole</Tag>}
        </>
      ),
    },
    {
      title: '简介',
      dataIndex: 'templateDesc',
      render: (desc) => <Typography.Paragraph>{desc}</Typography.Paragraph>,
      width: '20%',
    },
    {
      title: '类型',
      dataIndex: 'templateType',
      render: (type) => (
        <>
          {type === 1 && <Tag color="yellow">原生引擎</Tag>}
          {type === 2 && <Tag color="blue">Lowcode</Tag>}
          {type === 3 && <Tag color="red">流程图</Tag>}
        </>
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
      render: (_: any, record: TemplateType) => (
        <Typography.Link
          onClick={() => {
            setEditingKey(record.templateId);
          }}
        >
          查看详细模板
        </Typography.Link>
      ),
    },
  ];

  const handleOk = () => {
    setEditingKey('');
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<TemplateType>,
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const fetchData = () => {
    setLoading(true);
    axios.get(template_port + '/template/list').then((res) => {
      const { data } = res.data;
      // console.log('template',data);
      setData(data);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 20,
        },
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Table
        rowKey={(record) => record.templateId}
        columns={columns}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        dataSource={data}
      />

      <DetailModal editingKey={editingKey} ok={handleOk} />
    </React.Fragment>
  );
};

export default TemplateTable;
