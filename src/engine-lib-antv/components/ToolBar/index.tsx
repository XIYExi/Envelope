import React, { useEffect, useRef, useState } from 'react';
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
import { Button, message, Space } from 'antd';
import { Tools } from '@/engine-lib-antv/components/ToolBar/config';
import {
  deleteCells,
  freezeGraph,
  onPaste,
  selectAll,
  unfreezeGraph,
} from '@/engine-lib-antv/common/trigger';
import styles from './index.less';
/*@ts-ignore*/
import { history } from 'umi';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import { getAtoms, getGraphJSON, validate } from '@/engine-lib-antv/common';
import { saveAs } from 'file-saver';

const ToolBar = (props: any) => {
  const [tools, setTools] = useState(Tools);
  //const graph: any = useGraph();

  const [disable, setDisable] = useState(false);

  const { cstate, dispatch } = props;
  const graph = useRef(cstate.graph);
  const dnd = useRef(cstate.dnd);

  useEffect(() => {
    graph.current = cstate.graph;
    dnd.current = cstate.dnd;
    //console.log(graph, dnd);
  }, [cstate]);

  const handleTrigger = (name: any) => {
    switch (name) {
      // 撤销/重做
      case 'undo':
      case 'redo':
        if (tools[name].can) graph.current.history[name]();
        break;
      case 'zoomin':
        graph.current.zoom(0.1);
        break;
      case 'zoomout':
        graph.current.zoom(-0.1);
        break;
      case 'copy':
        onPaste(graph.current);
        break;
      case 'dustbin':
        deleteCells(graph.current);
        break;
      case 'focus':
        graph.current.centerContent();
        break;
      case 'select_all':
        selectAll(graph.current);
        break;
      default:
        break;
    }
  };

  const toBack = () => {
    history.push('/');
  };

  /*只读*/
  const handleReadOnly = () => {
    setDisable(!disable);
    if (!disable) freezeGraph(graph.current);
    else unfreezeGraph(graph.current);
  };

  const handleExportAtoms = () => {
    const data = getAtoms(graph.current);
    console.log('[debug]data:', data);

    const jsonStr = JSON.stringify(data);
    const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'AntVData.json');

    message.info('图数据导出成功！');
  };

  const handleDownloadImage = () => {
    graph.current.exportPNG('image.png', {});
    message.info('图下载成功!');
  };

  const handleExportJson = () => {
    const { ok, errs } = validate(graph.current);
    if (ok) {
      const { nodesJSON, edgesJSON } = getGraphJSON(graph.current);
      //console.log("[debug]nodesJSON:", nodesJSON);
      //console.log("[debug]edgesJSON:", edgesJSON);
      const exportsJson = {
        nodesJSON: nodesJSON,
        edgesJSON: edgesJSON,
      };

      const jsonStr = JSON.stringify(exportsJson);
      const blob = new Blob([jsonStr], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'AntVJSON.json');

      message.success('Export succeeded. Please view it on the console');
    } else {
      console.log('[debug]errs:', errs);
      message.error(errs[0]);
    }
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
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="撤销"
            onClick={() => handleTrigger('undo')}
          >
            <UndoOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="重做"
            onClick={() => handleTrigger('redo')}
          >
            <RedoOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="放大"
            onClick={() => handleTrigger('zoomin')}
          >
            <ZoomInOutlined />
          </Button>
          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="缩小"
            onClick={() => handleTrigger('zoomout')}
          >
            <ZoomOutOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="复制"
            onClick={() => handleTrigger('copy')}
          >
            <CopyOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="删除"
            onClick={() => handleTrigger('dustbin')}
          >
            <CloseCircleOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="画布居中"
            onClick={() => handleTrigger('focus')}
          >
            <BorderInnerOutlined />
          </Button>

          <Button
            disabled={disable}
            type="link"
            style={{ marginRight: '9px' }}
            title="全选"
            onClick={() => handleTrigger('select_all')}
          >
            <AppstoreOutlined />
          </Button>

          <Space>
            <Button danger={disable} onClick={() => handleReadOnly()}>
              只读
            </Button>
            <Button disabled={disable} onClick={() => handleExportAtoms()}>
              导出数据
            </Button>
            <Button disabled={disable} onClick={() => handleExportJson()}>
              导出JSON
            </Button>

            <Button disabled={disable} onClick={() => handleDownloadImage()}>
              下载图片
            </Button>
          </Space>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(ToolBar);
