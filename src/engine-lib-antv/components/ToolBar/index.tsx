import React, { useState } from 'react';
import {
  CopyOutlined,
  UndoOutlined,
  RedoOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  BorderInnerOutlined,
  AppstoreOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import { Tools } from '@/engine-lib-antv/components/ToolBar/config';
import { useGraph } from '@/engine-lib-antv/store';
import {
  deleteCells,
  onPaste,
  selectAll,
} from '@/engine-lib-antv/common/trigger';
import styles from './index.less';
/*@ts-ignore*/
import { history } from 'umi';

const ToolBar = () => {
  const [tools, setTools] = useState(Tools);
  const graph: any = useGraph();

  const handleTrigger = (name: any) => {
    switch (name) {
      // 撤销/重做
      case 'undo':
      case 'redo':
        if (tools[name].can) graph.value.history[name]();
        break;
      case 'zoomin':
        graph.value.zoom(0.1);
        break;
      case 'zoomout':
        graph.value.zoom(-0.1);
        break;
      case 'copy':
        onPaste(graph.value);
        break;
      case 'dustbin':
        deleteCells(graph.value);
        break;
      case 'focus':
        graph.value.centerContent();
        break;
      case 'select_all':
        selectAll(graph.value);
        break;
      default:
        break;
    }
  };

  const toBack = () => {
    history.push('/');
  };

  return (
    <React.Fragment>
      <div className={styles.header}>
        <div className={styles.logoArea}>
          <div className={styles.backBtn} onClick={toBack}>
            <ArrowLeftOutlined />
          </div>
          <div className={styles.logo}></div>
        </div>

        <div className={styles.controlArea}>
          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="撤销"
            onClick={() => handleTrigger('undo')}
          >
            <UndoOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="重做"
            onClick={() => handleTrigger('redo')}
          >
            <RedoOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="放大"
            onClick={() => handleTrigger('zoomin')}
          >
            <ZoomInOutlined />
          </Button>
          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="缩小"
            onClick={() => handleTrigger('zoomout')}
          >
            <ZoomOutOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="复制"
            onClick={() => handleTrigger('copy')}
          >
            <CopyOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="删除"
            onClick={() => handleTrigger('dustbin')}
          >
            <CloseCircleOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="画布居中"
            onClick={() => handleTrigger('focus')}
          >
            <BorderInnerOutlined />
          </Button>

          <Button
            type="link"
            style={{ marginRight: '9px' }}
            title="全选"
            onClick={() => handleTrigger('select_all')}
          >
            <AppstoreOutlined />
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ToolBar;
