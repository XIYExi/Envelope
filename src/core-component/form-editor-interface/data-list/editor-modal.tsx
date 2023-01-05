import React, { FC, memo, useEffect } from 'react';
import {Store} from 'antd/lib/form/interface';
import {TDataListDefaultTypeItem} from '../../type';
import { Form, Select } from 'antd';

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

  const { item, onSave, visible, onCancel, cropRate } = props;
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


    </React.Fragment>
  )



}

export default memo(EditorModal);
