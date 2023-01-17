import React, { FC, memo, useEffect } from 'react';
import {Store} from 'antd/lib/form/interface';
import {TDataListDefaultTypeItem} from '../../type';
import { Button, Form, Input, Modal, Select } from 'antd';
import PicturesWall from '../pictures-wall/pictures-wall';

const {Option} = Select;

const normFile = (e: any) => {
  if (Array.isArray(e))
    return e;
  return e && e.fileList;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export interface EditorModalProps {
  visible: boolean;
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined;
  item?: TDataListDefaultTypeItem;
  onSave: Function;
  cropRate: number;
}

const EditorModal:FC<EditorModalProps> = (props) => {

  const {
    item,
    onSave,
    visible,
    onCancel,
    cropRate
  } = props;

  const [form] = Form.useForm();

  useEffect(() => {
    if (form && item && visible) {
      form.resetFields();
    }
  }, [form, item, visible]);

  const onFinish = (values: Store) => {
    console.log(values);
    onSave && onSave(values);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        if (item) {
          values.id = item.id;
          onSave && onSave(values);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <React.Fragment>
      {
        !!item && (
          <Modal
            title='编辑数据源'
            closable={false}
            visible={visible}
            onOk={handleOk}
            okText='确定'
            forceRender={true}
            footer={
              <Button type='primary' onClick={() => handleOk()}>确定</Button>
            }
            >
            <Form
              form={form}
              name='form_editor_modal'
              {...formItemLayout}
              onFinish={onFinish}
              initialValues={item}
              >

              <Form.Item
                label='标题'
                name='title'
                rules={[{required: true, message: '请输入标题'}]}
                >
                <Input />
              </Form.Item>

              <Form.Item
                label='描述'
                name='desc'
                >
                <Input />
              </Form.Item>

              <Form.Item
                label='链接地址'
                name='link'
              >
                <Input />
              </Form.Item>

              {
                // @ts-ignore
                !!window['currentCates'] && (
                <Form.Item
                  label="分类"
                  name="type"
                  rules={[{ required: true, message: '请选择分类!' }]}
                >
                  <Select placeholder="请选择">
                    {
                      // @ts-ignore
                      window['currentCates'].map((v, i) => {
                      return (
                        <Option value={i} key={i}>
                          {v}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              )}

              <Form.Item
                label='上传图片'
                name='imgUrl'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                >
                <PicturesWall cropRate={cropRate} isCrop={true} />
              </Form.Item>

            </Form>
          </Modal>
        )
      }

    </React.Fragment>
  )



}

export default memo(EditorModal);
