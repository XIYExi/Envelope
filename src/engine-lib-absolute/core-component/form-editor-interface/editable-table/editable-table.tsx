import React, { createContext, FC, memo, ReactNode, RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Table, Input, Button, Popconfirm, Form, Modal, Upload } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {uuid} from '../../../core-utils/tool';
import XLSX from 'xlsx';
import './editable-table.css';
import styled from 'styled-components';


const EditableContext = createContext<any>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: FC<EditableRowProps> = (props) => {
  const {index, ...restProps} = props;
  const [form] = Form.useForm();

  return(
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...restProps}/>
      </EditableContext.Provider>
    </Form>
  )
}


interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: Item) => void;
}

const EditableCell: FC<EditableCellProps> = (props) => {
  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  } = props;
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useContext(EditableContext);

  useEffect(()=>{
    if (editing)
      inputRef.current?.focus();
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldValue({ [dataIndex]: record[dataIndex] });
  }

  const save = async () => {
    try{
      const values = await form.validateFields();
      toggleEdit();
      handleSave({...record, ...values});
    }catch(errInfo){
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if(editable){
    childNode = editing ? (
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} 是必填的.`,
          },
        ]}
        >
        <Input
          ref={(inputRef as unknown) as () => RefObject<HTMLInputElement>}
          onPressEnter={save}
          onBlur={save}
          />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }
  return <td {...restProps}>{childNode}</td>;
}


type columnsType = (
  | {
    title: string;
    dataIndex: string;
    width: string;
    editable: boolean;
    render?: undefined
  }
  | {
    title: string;
    dataIndex: string;
    width?: string;
    editable?: undefined;
    render: (text: string, record: any) => JSX.Element | null;
  }
)[];

type apiFormType = {
  api: string;
  header: string;
  dataField: string;
};


const EFormItem = styled.div`
  margin-bottom: 16px;
`

const EApiForm = styled.div`
`


const EditableTable:FC<any> = (props) => {

  const [dataSource, setDataSource] = useState(
    props.data && props.data.map((item: any, i: number) => ({ key: i + '', ...item }))
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [apiVisible, setApiVisible] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<string>('');

  let columns: columnsType = [
    {
      title: '名字',
      dataIndex: 'name',
      width: '180px',
      editable: true,
    },
    {
      title: '值',
      dataIndex: 'value',
      width: '120px',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (text: string, record: any) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button type="link">删除</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  let apiForm: apiFormType = {
    api: '',
    header: '',
    dataField: '',
  };

  const handleDelete = (key: string) => {
    const copy = [...dataSource];
    const newDataSource = copy.filter(item => item.key != key);
    setDataSource(newDataSource);
    props.onChange && props.onChange(newDataSource);
  }

  const handleAdd = (row: any) => {
    const uid = uuid(8, 10);
    const newData = {
      key: uid,
      name: `envelope ${dataSource.length + 1}`,
      value: 32
    };
    const newDataSource = [...dataSource, newData];
    setDataSource(newDataSource);
    props.onChange && props.onChange(newDataSource);
  }

  const handleSave = (row: any) => {
    const copy = [...dataSource];
    const index = copy.findIndex(item => row.key === item.key);
    const item = copy[index];
    copy.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(copy);
    props.onChange && props.onChange(copy);
  }

  const showModal = ()  => {
    setVisible(true);
  }

  const handleOk = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(false);
  }

  const handleCancel = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setVisible(false);
  }

  const showApiModal = () => {
    setApiVisible(true);
  }

  const handleAPIOk = () => {
    const { dataField } = apiForm;
    if(dataField){
      // @ts-ignore
      let data = apiResult[dataField];
      if(data && data instanceof Array){
        data = data.map((item, i) => ({key: i + '', ...item}));
        setDataSource(data);
        props.onChange && props.onChange(data);
      }
      setApiVisible(false);
    }
  }

  const handleAPICancel = () => {
    setApiVisible(false);
  }


  const handleApiField = (type: 'api' | 'header' | 'dataField', v: string) => {
    apiForm[type] = v;
  }

  const getApiFn = () => {
    console.log(apiForm);
    const { api, header } = apiForm;
    fetch(api, {
      cache: 'no-cache',
      headers: Object.assign(
        { 'content-type': 'application/json' },
        header ? JSON.parse(header) : {},
      ),
      method: 'GET',
      mode: 'cors',
    })
      .then(res => res.json())
      .then(res => {
        setApiResult(res);
      });
  }

  /**
   * render
   */
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const _columns: ColumnsType<any> = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });
  const _props = {
    name: 'file',
    // action: '',
    showUploadList: false,
    beforeUpload(file: File, fileList: Array<File>) {
      // 解析并提取excel数据
      let reader = new FileReader();
      reader.onload = function(e: any) {
        let data = e.target.result;
        let workbook = XLSX.read(data, { type: 'binary' });
        let sheetNames = workbook.SheetNames; // 工作表名称集合
        let draftArr: any = {};
        sheetNames.forEach(name => {
          let worksheet = workbook.Sheets[name]; // 只能通过工作表名称来获取指定工作表
          for (let key in worksheet) {
            // v是读取单元格的原始值
            if (key[0] !== '!') {
              if (draftArr[key[0]]) {
                draftArr[key[0]].push(worksheet[key].v);
              } else {
                draftArr[key[0]] = [worksheet[key].v];
              }
            }
          }
        });
        let sourceData = Object.values(draftArr).map((item: any, i) => ({
          key: i + '',
          name: item[0],
          value: item[1],
        }));
        setDataSource(sourceData);
        props.onChange && props.onChange(sourceData);
      };
      reader.readAsBinaryString(file);
    },
  };

  return(
    <React.Fragment>
      <div>
        <Button type="primary" onClick={showModal}>
          编辑数据源
        </Button>
        <Modal
          title="编辑数据源"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBottom: 16, marginRight: 16 }}
          >
            添加行
          </Button>
          <Upload {..._props}>
            <Button type="primary" ghost style={{ marginRight: 16 }}>
              导入Excel
            </Button>
          </Upload>
          <Button type="primary" ghost onClick={showApiModal}>
            第三方API
          </Button>
          <Table
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={dataSource}
            columns={_columns}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 240 }}
          />
        </Modal>
        <Modal
          title="配置api"
          visible={apiVisible}
          onOk={handleAPIOk}
          onCancel={handleAPICancel}
          okText="确定"
          cancelText="取消"
        >
          <EApiForm>
            <EFormItem>
              <Input
                placeholder="请输入api地址"
                onChange={e => handleApiField('api', e.target.value)}
              />
            </EFormItem>
            <EFormItem>
              <Input.TextArea
                placeholder="请输入头信息, 如{token: 123456}, 格式必须为json对象"
                rows={4}
                onChange={e => handleApiField('header', e.target.value)}
              />
            </EFormItem>
            <EFormItem>
              <Button type="primary" onClick={getApiFn}>
                发送请求
              </Button>
            </EFormItem>
            {
              apiResult && (
                <>
                  <EFormItem>
                    <Input.TextArea rows={6} value={JSON.stringify(apiResult, null, 4)} />
                  </EFormItem>
                  <EFormItem>
                    <Input
                      placeholder="设置数据源字段"
                      onChange={e => handleApiField('dataField', e.target.value)}
                    />
                    <p style={{ color: 'red' }}>
                      数据源字段是接口返回的图表数据对应的字段, 必填, 否则无法正确导入数据
                    </p>
                  </EFormItem>
                </>
              )
            }
          </EApiForm>
        </Modal>
      </div>
    </React.Fragment>
  )

}

export default memo(EditableTable);
