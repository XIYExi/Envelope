import React, { createContext, FC, ReactNode, RefObject, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {uuid} from '../../../core-utils/tool';
import XLSX from 'xlsx';
import {ColumnsType} from 'antd/lib/table';
import { Form, Input } from 'antd';
import './table.css';

const EditableContext = createContext<any>(null);

interface ItemProps{
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow:FC<EditableRowProps> = (props) => {
  const {
    index,
    ...restProps
  } = props;

  const [form] = Form.useForm();

  return(
    <React.Fragment>
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...restProps} />
        </EditableContext.Provider>
      </Form>
    </React.Fragment>
  )
}

interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  children: ReactNode;
  dataIndex: string;
  record: any;
  handleSave: (record: ItemProps) => void;
}



const EditableCell:FC<EditableCellProps> = (props) => {

  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  } = props;

  const form = useContext(EditableContext);
  const [editing, setEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    if(editing){
      inputRef.current?.focus();
    }
  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldValue({
      [dataIndex]: record[dataIndex]
    });
  }

  const save = async () => {
    try{
      const values = await form.validateFields();
      toggleEdit();
      handleSave({...record, ...values});
    }catch (error: any){
      console.log('Save failed: ', error);
    }
  }

  let childNode:ReactNode = children;

  if(editable){
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[{required: true, message: `${title}是必填的`}]}
        >
        <Input
          ref={(inputRef as unknown) as () => RefObject<HTMLInputElement>}
          onPressEnter={save}
          onBlur={save}
          />
      </Form.Item>
    ) : (
      <div className='editable-cell-value-wrap'
           style={{paddingRight: 24}} onClick={toggleEdit}>
        {
          children
        }
      </div>
    )
  }

  return <td {...restProps}>{childNode}</td>;
}
