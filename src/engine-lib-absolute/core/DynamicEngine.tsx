import {dynamic} from 'umi';
import React, { FC, memo, useMemo } from 'react';
import { Loader } from 'semantic-ui-react';

// Semantic UI React 组件类型
export type componentsType = 'addons' |
  'behaviors' |
  'collections' |
  'elements' |
  'modules' |
  'views';

export interface DynamicType {
  isTpl: boolean;
  config: { [key : string]: any };
  type: string;
  componentsType: componentsType;
  category: string;
}

const DynamicFunc = (
  type: string,
  componentsType: string,
  ui: string = 'semantic-ui-react'
) => {
  return dynamic({
    loader: async () => {
      const { default: Graph } = await import(`${ui}/src/${componentsType}/${type}`);
      const Component = Graph;
      return (props: DynamicType) => {
        const { config, isTpl } = props;
        return <Component {...config} isTpl={isTpl} />;
      };
    },
    loading: () => (
      <div>
        <Loader active inline='centered' />
      </div>
    ),
  })
}


const DynamicEngine = memo((props: DynamicType) => {
  const {
    type,
    config,
    category
  } = props;

  const Dynamic = useMemo(() => {
    return (DynamicFunc(type, category) as unknown) as FC<DynamicType>;
  }, [config]);

  return <Dynamic {...props}/>;
});

export default DynamicEngine;
