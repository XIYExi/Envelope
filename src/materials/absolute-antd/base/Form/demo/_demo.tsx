import React from 'react';
import AForm from '@/materials/absolute-antd/base/Form';
const attr = {
  title: '表单定制组件',
  fontSize: 18,
  titColor: 'rgba(60, 60, 60, 1)',
  titWeight: '400',
  bgColor: 'rgba(255, 255, 255, 1)',
  btnColor: 'rgba(20, 54, 226, 100)',
  btnTextColor: 'rgba(255, 255, 255, 1)',
  api: '',
  formControls: [
    {
      id: '1',
      type: 'Text',
      label: '姓名',
      placeholder: '请输入姓名',
    },
    {
      id: '2',
      type: 'Number',
      label: '年龄',
      placeholder: ' 请输入年龄',
    },
    {
      id: '4',
      type: 'MySelect',
      label: '爱好',
      options: [
        { label: '篮球', value: '1' },
        { label: '乒乓球', value: '2' },
        { label: '健身', value: '3' },
      ],
    },
  ],
};
export default () => (
  /*@ts-ignore*/
  <AForm isTpl={false} {...attr} />
);
