import { dynamic } from 'umi';
import React, { FC, memo, useMemo } from 'react';
import { Loader } from 'semantic-ui-react';

// Ant Design UI React 组件类型
export type componentsType = 'base' | 'control' | 'media' | 'social';

export interface DynamicType {
  isTpl: boolean;
  config: { [key: string]: any };
  type: string;
  componentsType: componentsType;
  category: string;
  ui: string;
}

const DynamicFunc = (type: string, componentsType: string, ui: string) => {
  return dynamic({
    loader: async function () {
      const { default: Graph } = await import(
        `@/materials/absolute-${ui}/${componentsType}/${type}`
      );
      const Component = Graph;
      return (props: DynamicType) => {
        const { config, isTpl } = props;
        return <Component {...config} isTpl={isTpl} />;
      };
    },
    loading: () => (
      <div>
        <Loader active inline="centered">
          a
        </Loader>
      </div>
    ),
  });
};

const DynamicEngine = memo((props: DynamicType) => {
  const { type, config, category, ui } = props;

  const Dynamic = useMemo(() => {
    return DynamicFunc(type, category, ui) as unknown as FC<DynamicType>;
  }, [config]);

  return <Dynamic {...props} />;
});

export default DynamicEngine;
