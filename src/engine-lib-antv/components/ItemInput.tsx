import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { updateERNode } from '@/engine-lib-antv/common';
import { connect } from 'dva';
import { StateWithHistory } from 'redux-undo';
import { Lang } from '@antv/x6';
import styled from 'styled-components';

interface InputListProps {
  id: string;
  group: string;
  attrs: {
    portNameLabel: {
      text: string;
    };
    portTypeLabel: {
      text: string;
    };
  };
}

const ItemInputWrapper = styled.div``;

const ItemInput = (props: any) => {
  const { cstate, dispatch } = props;
  const graph = useRef(cstate.graph);
  const [inputList, setInputList] = useState<InputListProps[]>([]);

  const btnRef = useRef(null);

  /**
   * 监听cstate，只要画布经过修改就自动触发
   * 但是此部分再用户控制器中，必须当用户点击具体的ER节点的时候才会显示，
   * 所以即使点击其他类型的节点也不会触发渲染
   * 并不会造成过度渲染
   */
  useEffect(() => {
    const cells = graph.current.getSelectedCells();
    if (Lang.isArray(cells) && cells.length === 1) {
      const cell = cells[0];
      // console.log('cell类型',cell._model)
      if (cell._model !== null) {
        const list = cell.getPorts();
        setInputList(list);

        if (list.length !== 0) {
          for (let i = 0; i < list.length; ++i) {
            //@ts-ignore
            btnRef.current?.click();
          }
        }
      }
    }
  }, [cstate]);

  const onFinish = (values: any) => {
    // console.log('Received values of form:', values);
    const list = values.key_value;

    /**
     *  {
        "id": "1-2",
        "group": "list",
        "attrs": {
          "portNameLabel": {
            "text": "Name"
          },
          "portTypeLabel": {
            "text": "STRING"
          }
        }
      },
     上述应该为整合json的一个范例，其中id为nodeid + rank，
     下面portLabel为0说明取得是第一个Input，填入portNameLabel，
     下面portLabel为1说明取得是第二个Input，填入portTypeLabel
     */
    let tempList: InputListProps[] = [];
    list.map((item: any, index: number) => {
      const rank = index + 1;

      const id = props.nodeId + '_' + rank;

      //console.log('nodeId', id)

      const portNameLabelText = item.first;
      const portTypeLabelText = item.last;

      const json = {
        id: id,
        group: 'er-list',
        attrs: {
          portNameLabel: {
            text: portNameLabelText,
          },
          portTypeLabel: {
            text: portTypeLabelText,
          },
        },
      };

      tempList.push(json);
    });

    //console.log('确认port',tempList)

    setInputList(tempList);
    updateERNode(tempList, graph.current);
    props.setValue(undefined);
    props.setJson({});
  };

  return (
    <ItemInputWrapper>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        style={{
          marginTop: '20px',
        }}
      >
        <Form.List name="key_value">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    name={[name, 'first']}
                    rules={[{ required: true, message: '字段名不可以为空' }]}
                    initialValue={
                      inputList[key] !== undefined
                        ? inputList[key].attrs.portNameLabel.text
                        : ''
                    }
                  >
                    <Input
                      placeholder={
                        inputList[key] !== undefined
                          ? inputList[key].attrs.portNameLabel.text
                          : '字段名'
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'last']}
                    rules={[{ required: true, message: '类型不可以为空' }]}
                    initialValue={
                      inputList[key] !== undefined
                        ? inputList[key].attrs.portTypeLabel.text
                        : ''
                    }
                  >
                    <Input
                      placeholder={
                        inputList[key] !== undefined
                          ? inputList[key].attrs.portTypeLabel.text
                          : '属性名'
                      }
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  ref={btnRef}
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  增减键值对
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            更新数据
          </Button>
        </Form.Item>
      </Form>
    </ItemInputWrapper>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return {
    cstate: state.present.antvModal,
  };
})(ItemInput);
