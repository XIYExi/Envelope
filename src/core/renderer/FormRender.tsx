import React, { FC, RefObject, useEffect } from 'react';
import { Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import MultiText from '@/core-component/form-editor-interface/multi-text/multi-text';
import { DataList } from '@/core-component/form-editor-interface/data-list';
import ColorPicker from '@/core-component/form-editor-interface/color-picker';
import PicturesWall from '@/core-component/form-editor-interface/pictures-wall/pictures-wall';
import CardPicker from '@/core-component/form-editor-interface/card-picker/card-picker';
import EditableTable from '@/core-component/form-editor-interface/table/table';
import Pos from '@/core-component/form-editor-interface/pos/pos';
import XEditor from '@/core-component/form-editor-interface/x-editor/XEditor';
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
                    <DataList cropRate={item.cropRate} />
                  </Form.Item>
                )
              }
              {
                item.type === 'Color' && (
                  <Form.Item label={item.name} name={item.key}>
                    <ColorPicker />
                  </Form.Item>
                )
              }
              {
                item.type === 'Select' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Select placeholder="请选择">
                      {item.range.map((v: any, i: number) => {
                        return (
                          <Option value={v.key} key={i}>
                            {v.text}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                )
              }

              {
                item.type === 'Radio' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Radio.Group>
                      {item.range.map((v: any, i: number) => {
                        return (
                          <Radio value={v.key} key={i}>
                            {v.text}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </Form.Item>
                )
              }

              {
                item.type === 'Switch' && (
                  <Form.Item label={item.name} name={item.key} valuePropName="checked">
                    <Switch />
                  </Form.Item>
                )
              }

              {
                item.type === 'Upload' && (
                  <Form.Item
                    label={item.name}
                    name={item.key}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <PicturesWall cropRate={item.cropRate} isCrop={item.isCrop} />
                  </Form.Item>
                )
              }

              {
                item.type === 'CardPicker' && (
                  <Form.Item label={item.name} name={item.key} valuePropName="type">
                    <CardPicker icons={item.icons} type={defaultValue['type']} />
                  </Form.Item>
                )
              }

              {
                item.type === 'Table' && (
                  <Form.Item label={item.name} name={item.key} valuePropName="data">
                    <EditableTable data={item.data} />
                  </Form.Item>
                )
              }

              {
                item.type === 'Pos' && (
                  <Form.Item label={item.name} name={item.key}>
                    <Pos />
                  </Form.Item>
                )
              }

              {
                item.type === 'RichText' && (
                  <Form.Item label={item.name} name={item.key} noStyle={true}>
                    <XEditor />
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
