import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import { Button, Input, Space, Typography } from 'antd';
import { toJSON } from '@/engine-lib-antv/common/transform';
import { fmtJSON, updateNode } from '@/engine-lib-antv/common';

const UserController = (props: any) => {
  const { cstate, disptach } = props;

  const node = useRef<any>(cstate.node);
  const graph = useRef(cstate.graph);
  const [json, setJson] = useState<any>({});
  const [value, setValue] = useState<string>();

  useEffect(() => {
    node.current = cstate.node;
    graph.current = cstate.graph;
    const json = fmtJSON(node.current);
    setJson(json);
    setValue(json.label);
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

  return (
    <React.Fragment>
      <div>
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
      </div>
    </React.Fragment>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(UserController);
