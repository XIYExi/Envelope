import React, { FC } from 'react';
import { Button, Space, Typography } from 'antd';

import { saveJsZip } from '@/engine-core/code/saveJSCode';

const TestPage: FC<any> = (props) => {
  const handleToShowStr = () => {
    let data = localStorage.getItem('userData');
    if (data != null) {
      data = JSON.parse(data);
    }
    //console.log('data', data)
    saveJsZip(data);
  };

  const handleJsToCode = () => {
    let data = localStorage.getItem('userData');
    if (data != null) {
      data = JSON.parse(data);
    }
    //console.log('data', data)
    saveJsZip(data);
  };

  const setChildrenToIndexX = () => {
    let importStr = '';
    let childStr = '';
    const str = localStorage.getItem('promiseObject');
    let template: any;
    if (str != null) {
      template = JSON.parse(str);
    }

    //home中的导入数据
    /**
     * TODO 先写A${key} 后续再根据UI框架配置
     */
    let tempTypeList: string[] = [];
    template.map((child: any, key: number) => {
      const { item } = child;

      //类型，通过加上UI框架前缀变成文件名
      const childType = item.type;
      //id， key值
      const childID = child.id;
      // datasource.js中应该保存的文件名  通过前缀添加类型名变成数据库(datasource.js)中变量名
      const childDatasourceName = item.datasourceName;

      if (tempTypeList.indexOf(childType) === -1) {
        // 防止重复导入依赖
        importStr += `import A${childType} from './${childType}';\n`;
        tempTypeList.push(childType);
      }

      /**
       * <AAlert
       *    id="4877289"
       *    key="4877289"
       *    isTpl={false}
       *    {...Alert4877289DataSource}
       *  />
       */
      childStr += `<A${childType} id="${childID}" key="${childID}" isTpl={false} {...${childDatasourceName}}/>,\n`;
    });
    // 从数据文件中批量import
    const dataSourceStr: string = `import {\n${template
      .map((s: any) => `\t${s.item.datasourceName}`)
      .join(',\n')}\n} from './data.source'`;
    // 封装最后的children渲染列表
    childStr = `const children = [${childStr}]`;

    console.log('importStr:\n', importStr);
    console.log('childStr:\n', childStr);
    console.log('dataSourceStr:\n', dataSourceStr);
  };

  return (
    <div>
      <Typography.Title>This Page is for test</Typography.Title>

      <Space>
        <Button onClick={handleToShowStr}>Click to show templateStr.</Button>

        <Button onClick={handleJsToCode}>Click to show Data.</Button>

        <Button onClick={setChildrenToIndexX}>Show ImportStr.</Button>
      </Space>
    </div>
  );
};

export default TestPage;
