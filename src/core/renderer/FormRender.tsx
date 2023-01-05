import React, { FC, RefObject, useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import MultiText from '@/core-component/form-editor-interface/multi-text/multi-text';
const { Option } = Select;
const { TextArea } = Input;


const normFile = (e:any) => {
  console.log('Upload event: ', e);
  if(Array.isArray(e)){
    //TODO 修改
    return e;
  }
  return e && e.fileList;
}


interface FormEditorProps {
  uid: string;
  onSave: Function;
  onDel: Function;
  defaultValue: { [key: string]: any };
  config: Array<any>;
  rightPannelRef: RefObject<HTMLDivElement>;
}

const FormEditor:FC<FormEditorProps> = (props) => {
  const {
    config,
    defaultValue,
    onSave,
    uid,
    rightPannelRef
  } = props;

  const [form] = useForm();

  const onFinish = (values: Store) => {
    onSave && onSave(values);
  };

  useEffect(()=>{
    return () => {
      form.resetFields();
    };
  },[uid, form]);

  const handleChange = () => {
    onFinish(form.getFieldsValue());
  }

  return(
    <Form
      name='form_editor'
      form={form}
      labelCol={{ span:6 }}
      wrapperCol={{ span:16 }}
      initialValues={defaultValue}
      onValuesChange={handleChange}
    >
      {
        config.map((item, i) => {
          return(
            <React.Fragment key={i}>
              {
                item.type === 'Number' && (
                  <Form.Item label={item.name} name={item.key}>
                    <InputNumber max={item.range && item.range[1]} />
                  </Form.Item>
                )
              }
              {
                item.type === 'Text' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Input />
                  </Form.Item>
                )
              }
              {
                item.type === 'TextArea' && (
                  <Form.Item label={item.name} name={item.key}>
                    <TextArea rows={4} />
                  </Form.Item>
                )
              }
              {
                item.type === 'MultiText' && (
                  <Form.Item label={item.name} name={item.key}>
                    <MultiText />
                  </Form.Item>
                )
              }
              {
                item.type === 'DataList' && (
                  <Form.Item label={item.name} name={item.key}>
                    {/*<DataList cropRate={item.cropRate} />*/}
                  </Form.Item>
                )
              }

            </React.Fragment>
          )
        })
      }

    </Form>
  )
}

export default FormEditor;
