import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import { Button, Divider, Input, Radio, Space, Typography } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { toJSON } from '@/engine-lib-antv/common/transform';
import {
  fmtJSON,
  getAtoms,
  updateERNode,
  updateNode,
} from '@/engine-lib-antv/common';
import './index.less';
import ItemInput from '@/engine-lib-antv/components/ItemInput';

const UserController = (props: any) => {
  const { cstate, disptach } = props;

  const node = useRef<any>(cstate.node);
  const graph = useRef(cstate.graph);
  const [json, setJson] = useState<any>({});
  const [value, setValue] = useState<string>();

  const [dagId, setDagId] = useState<string>('');
  const [dagList, setDagList] = useState<
    { id: string; name: string; status: string }[]
  >([]);
  const [dagAnim, setDagAnim] = useState<[][]>([]);

  useEffect(() => {
    node.current = cstate.node;
    graph.current = cstate.graph;
    const json = fmtJSON(node.current);
    setJson(json);
    console.log('json', json);
    setValue(json.label);

    //错误的，此处的dagId就是当前节点的nodeId，传给e-r的用户控制器
    setDagId(json.nodeId);

    // 如果json.label === dag-node 则获取当前所有人工智能节点的状态，并生成数据。
    if (json.label === 'dag-node') {
      //从data中解构直接获取到nodes，还有一个数据是edges，不需要
      const { nodes } = getAtoms(graph.current);
      console.log('nodes: ', nodes);

      /**
       * nodes为一个列表，列表中每一个子项如下:
       * 根绝actionType判断是否加入dag数组
       * {
       *   @id: string
       *   @data:{
       *     @actionType: 'DAG',
       *     @initialization: boolean,
       *     @tooltip: string,
       *   }
       * }
       */
      interface nodeItemProps {
        id: string;
        data: {
          actionType: string;
          initialization: boolean;
          tooltip: string;
        };
      }
      let tempDagList: {
        id: string;
        name: string;
        status: string;
        [key: string]: any;
      }[] = [];
      const tempAnimList: any = [];
      nodes.map((item: nodeItemProps, index: number) => {
        // 要判断item.data是否存在！
        // 当用户输入label之后鼠标移入会出现文本框，这个框的data为undefined,不判断会报错！
        if (item.data && item.data.actionType === 'DAG') {
          const tempDagListItem = {
            id: item.id,
            name: item.data.tooltip,
            status: 'default',
          };
          tempDagList.push(tempDagListItem);
        }
      });
      setDagList(tempDagList);

      //console.log('tempDagLisst', tempDagList)

      let j = 0;
      for (let i = 0; i < tempDagList.length + 1; ++i) {
        let _temp = tempDagList;
        _temp = _temp.map((item) => {
          return {
            ...item,
            key: j,
          };
        });
        ++j;
        tempAnimList.push(_temp);
      }
      //console.log('tempAnimList', tempAnimList)
      setDagAnim(tempAnimList);
    }
  }, [cstate]);

  const handleLabelInput = (e: any) => {
    // console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleChangeNodeLabel = () => {
    updateNode({ label: value }, graph.current);
    setValue(undefined);
    setJson({});
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    //console.log(`radio checked:${e}`);
    const selected = e.target.value;
    /**
     * _selected ['default'|'success'|'failed'|'running', nodeId, index]
     * 字符串分割标志为‘@’，因为uuid生成的id使用‘-’分割！
     */
    const _selected = selected.split('@');
    const type = _selected[0];
    const nodeId = _selected[1];
    const key = _selected[2];

    // console.log(type, nodeId, key)
    // console.log('begin', dagAnim)

    let _dagAnim: any = dagAnim;
    _dagAnim[key].map((item: any) => {
      if (nodeId === item.id) {
        item.status = type;
        return item;
      }
    });
    setDagAnim(_dagAnim);
  };

  const renderAnimatButton = (json: any) => {
    const { label, nodeId } = json;

    let res = [];

    for (let i = 0; i < dagList.length + 1; ++i) {
      const html = (
        <React.Fragment>
          <Typography.Text style={{ marginLeft: '5px' }}>
            {`节点【${label}】结束状态 ${i + 1}`}
          </Typography.Text>
          <Space.Compact
            key={i}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            <Radio.Group
              name={'dag' + i}
              size="small"
              onChange={handleRadioChange}
              defaultValue={`default@${nodeId}@${i}`}
            >
              <Radio.Button value={`default@${nodeId}@${i}`}>
                Default
              </Radio.Button>
              <Radio.Button value={`running@${nodeId}@${i}`}>
                Running
              </Radio.Button>
              <Radio.Button value={`success@${nodeId}@${i}`}>
                Success
              </Radio.Button>
              <Radio.Button value={`failed@${nodeId}@${i}`}>
                Failed
              </Radio.Button>
            </Radio.Group>
          </Space.Compact>
        </React.Fragment>
      );
      res.push(html);
    }
    return <React.Fragment>{res}</React.Fragment>;
  };

  const handleAnim = async (dagAnim: any) => {
    const status = dagAnim.shift();
    status?.forEach((item: any) => {
      const { id, status } = item;
      const node = graph.current.getCellById(id);
      const data = node.getData();
      node.setData({
        ...data,
        status: status,
      });
    });
    setTimeout(() => {
      handleAnim(dagAnim);
    }, 3000);
  };

  return (
    <React.Fragment>
      <div className="antv-user-contaniner">
        <Typography.Text
          style={{
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          标签:
        </Typography.Text>
        <Space size="large">
          <Space.Compact style={{ width: '100%' }}>
            <Input value={value} onChange={(e) => handleLabelInput(e)} />
            <Button
              disabled={JSON.stringify(json) === '{}'}
              onClick={() => handleChangeNodeLabel()}
            >
              Submit
            </Button>
          </Space.Compact>
        </Space>

        {json.actionType === 'DAG' && (
          <React.Fragment>
            <Space
              direction="vertical"
              size="large"
              style={{ marginTop: '20px' }}
            >
              <Typography.Text
                style={{
                  marginLeft: '5px',
                  marginRight: '5px',
                  fontWeight: 700,
                }}
              >
                DAG流程动画:
              </Typography.Text>

              {renderAnimatButton(json)}
            </Space>

            <Button
              style={{
                marginTop: '2.5em',
                marginLeft: '5px',
              }}
              onClick={() => handleAnim(dagAnim)}
            >
              节点动画
            </Button>
          </React.Fragment>
        )}
        {json.actionType === 'ER' && (
          <React.Fragment>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
              <ItemInput nodeId={dagId} setValue={setValue} setJson={setJson} />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(UserController);
