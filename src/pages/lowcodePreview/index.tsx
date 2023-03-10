import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { Loading } from '@alifd/next';
import {
  buildComponents,
  assetBundle,
  AssetLevel,
  AssetLoader,
} from '@alilc/lowcode-utils';
import ReactRenderer from '@alilc/lowcode-react-renderer';
import { injectComponents } from '@alilc/lowcode-plugin-inject';
import {
  getProjectSchemaFromLocalStorage,
  getPackagesFromLocalStorage,
} from '@/engine-lib-grid/utils';

const getScenarioName = function () {
  if (location.search) {
    return (
      new URLSearchParams(location.search.slice(1)).get('scenarioName') ||
      'index'
    );
  }
  return 'index';
};

const SamplePreview = () => {
  const [data, setData] = useState({});

  async function init() {
    const scenarioName = getScenarioName();
    const packages = getPackagesFromLocalStorage(scenarioName);
    const projectSchema = getProjectSchemaFromLocalStorage(scenarioName);
    const { componentsMap: componentsMapArray, componentsTree } = projectSchema;
    const componentsMap: any = {};
    componentsMapArray.forEach((component: any) => {
      componentsMap[component.componentName] = component;
    });
    const schema = componentsTree[0];

    const libraryMap: any = {};
    const libraryAsset: any[] = [];
    packages.forEach(
      ({ package: _package, library, urls, renderUrls }: any) => {
        libraryMap[_package] = library;
        if (renderUrls) {
          libraryAsset.push(renderUrls);
        } else if (urls) {
          libraryAsset.push(urls);
        }
      },
    );

    const vendors = [assetBundle(libraryAsset, AssetLevel.Library)];

    // TODO asset may cause pollution
    const assetLoader = new AssetLoader();
    await assetLoader.load(libraryAsset);
    // @ts-ignore
    const components = await injectComponents(
      buildComponents(libraryMap, componentsMap),
    );

    setData({
      schema,
      components,
    });
  }

  const { schema, components }: any = data;

  if (!schema || !components) {
    init();
    // @ts-ignore
    return <Loading fullScreen />;
  }

  return (
    <div className="lowcode-plugin-sample-preview">
      <ReactRenderer
        className="lowcode-plugin-sample-preview-content"
        schema={schema}
        components={components}
      />
    </div>
  );
};

ReactDOM.render(<SamplePreview />, document.getElementById('root'));
