import React from 'react';
import TemplateTable from '@/pages/rbac/component/TemplateTable';
import { Alert } from 'antd';

const TemplateList = (props: any) => {
  return (
    <>
      <Alert
        style={{ margin: '1em', borderRadius: '0.4em' }}
        message="模板管理页面"
        description="此页面仅允许管理员查看、编辑和发布通用模板，不允许查看用户私人创建的模板"
        type="info"
        showIcon
        closable
      />
      <TemplateTable />
    </>
  );
};

export default TemplateList;
