import JSZip from 'jszip';
import { isImg } from '@/utils/tools';

const utils = `
import React from 'react';
import { Button } from 'antd';

export const isImg = ${isImg};
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && item.children.match(isImg)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};
`;

interface ITemplateStrObj {
  JS: {};
  LESS: {};
  PROPS: {};
  OTHER: {
    index: any;
    documentation: any;
  };
}

interface IPublishJSON {
  file: string;
  data: string;
}

const handlePrintJsCode = (template: any): string => {
  //const template = localStorage.getItem('userData');

  const str: string = template;
  let _str: string = '';

  /**
   * 去除logo导入
   */
  const logol = str.match(/import\s+logo\s+from\s+'(.+?)'/g);
  if (logol && logol.length) {
    _str = str.replace(logol[0], '');
  }

  /**
   * 去除导入声明依赖
   */
  const Configi = str.match(/import\s+{(.+?)}\s+from\s+'@\/(.+?)'/g);
  if (Configi && Configi.length) {
    //console.log('yes', Configi)
    _str = _str.replace(Configi[0], '');
  }

  /**
   * 去除type类型声明
   */
  const typei = str.match(
    /\/\*begin\s+to\s+delete\*\/+[^]*;\n+\/\*end\s+to\s+delete\*\//g,
  );
  if (typei && typei.length) {
    _str = _str.replace(typei[0], '');
  }

  /**
   * 去除 :FC<...>
   */
  const fci = str.match(/:FC<(.+?)>/g);
  if (fci && fci.length) {
    _str = _str.replace(fci[0], '');
  }

  _str = _str.replace('logo', "'https://s1.ax1x.com/2023/03/10/ppnq09s.png'");
  //console.log('_str', _str)
  return _str;
};

const setChildrenToIndex = (templateStrObj: any) => {
  let importStr = '';
  let childStr = '';
  //const str = localStorage.getItem('promiseObject');
  let template: any = templateStrObj;

  //home中的导入数据
  // TODO 先写A${key} 后续再根据UI框架配置
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

  /*
  console.log('importStr:\n', importStr);
  console.log('childStr:\n', childStr);
  console.log('dataSourceStr:\n', dataSourceStr);
  */
  // 封装最后的children渲染列表
  childStr = `const children = [${childStr}]`;
  return { childStr, dataSourceStr, importStr };
};

const jsToZip = (
  templateStrObj: any,
  childStr: string,
  dataSourceStr: string,
  importStr: string,
) => {
  const zip = new JSZip();

  let propsStr = "import React from 'react';\n";

  // 生成用到的UI组件
  const tempTypeList: string[] = [];
  // data.source.js内容，整合item.props中内容
  let datasourceProps: string = propsStr; //copy一份头文件
  templateStrObj.forEach((child: any) => {
    const { item } = child;

    //文件名
    const { type } = item;
    if (tempTypeList.indexOf(type) !== -1) {
      //当前UI尚未添加
      tempTypeList.push(type);

      const fileName = `${type}.jsx`;
      const content = item.templateStr;
      /**
       * - Alert.jsx
       * - 内部是item中templateStr内容
       */
      zip.file(fileName, content);

      // 依次将data.source.js文件集成进来
      datasourceProps += item.props + '\n';
    }

    // 生成datasource.js
    zip.file('data.source.js', datasourceProps);
  });
};

export function saveJsZip(templateData: any, callBack?: any, getJson?: any) {
  // 每次保存重置保存对象数据。。
  let templateStrObj: any = templateData;

  const promiseObject: any = {};

  //templateData就是localStorage里面存的配置json
  //templateData是一个数组
  templateData.map((child: any, key: number) => {
    const { id, item } = child;

    //console.log(templateData[key])

    /**
     * props是datasource.js使用的
     */

    const datasourceName = `${item.type}${id}DataSource`;
    templateStrObj[key]['item']['datasourceName'] = datasourceName;

    const props = `export const ${item.type}${id}DataSource = ${JSON.stringify(
      item.config,
    )
      .replace(/\\n/g, '')
      .replace(/href="(.*?)"/g, 'href=\\"$1\\"')
      .replace(/<br>/g, '<br />')
      .replace(/"(<.*?>)"/g, (_, s1) => {
        // https://github.com/ant-design/ant-design-landing/issues/61 去除 span 标签，编辑时可能会出现 span 标签。。
        /* const tagIsSpanMatch = s1.match(/<span>.*?<\/span>/g);
          const startSpanMatch = s1.match(/^<span>.*?<\/span>?/g);
          if (startSpanMatch && tagIsSpanMatch.length === 1) {
            return s1;
          } */
        return `${s1.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;')}`;
      })
      .replace(/\\"/g, '"')}`;

    promiseObject[`${item.type}`] = {
      ...promiseObject[`${item.type}`],
      [`PROPS-${key}`]: props,
    };

    templateStrObj[key]['item'] = {
      ...templateStrObj[key]['item'],
      props: props,
    };

    //处理interface和logo
    //返回的str就是可以直接打包进zip的js文件
    //console.log(item.templateStr)
    const _template = handlePrintJsCode(item.templateStr);
    console.log('_template', _template);
    promiseObject[`${item.type}`] = {
      ...promiseObject[`${item.type}`],
      [`JS-${key}`]: _template,
    };

    templateStrObj[key]['item']['templateStr'] = _template;
  });

  console.log(templateStrObj);

  /**
   * promiseObject现在保存着可以打包js的文件，
   * props中是datasource.js中对应的文件，js中是可以打包进zip的UI组件代码
   */
  //TODO 测试用，可以删！
  //保存promiseObject 中key的数组
  localStorage.setItem('promiseObject', JSON.stringify(templateStrObj));

  // childStr - children列表
  // dataSourceStr - datasource导入
  // importStr - UI组件导入
  const { childStr, dataSourceStr, importStr } =
    setChildrenToIndex(templateStrObj);
}
