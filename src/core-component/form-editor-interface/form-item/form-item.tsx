import React, { FC, Fragment, memo, RefObject, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {uuid} from '../../../core-utils/tool';
import EditorModal from './editor-modal';
import { MinusCircleFilled, EditFilled, PlusOutlined} from '@ant-design/icons';
import { Button, List } from 'antd';
import MyPopover from 'yh-react-popover';
import { baseFormUnion, TFormItemsDefaultType } from '../../type';
import BaseForm from '../../antd-base-assembly/base-form/base-form';
import BasePopoverForm from '../../antd-base-assembly/base-popover-form/base-popover-form';


const formTpl: TFormItemsDefaultType = [
  {
    id: '1',
    type: 'Text',
    label: '文本框',
    placeholder: '请输入文本',
  },
  {
    id: '2',
    type: 'Textarea',
    label: '长文本框',
    placeholder: '请输入长文本请输入长文本',
  },
  {
    id: '3',
    type: 'Number',
    label: '数值',
    placeholder: ' 请输入数值',
  },
  {
    id: '4',
    type: 'MyRadio',
    label: '单选框',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
    ],
  },
  {
    id: '5',
    type: 'MySelect',
    label: '下拉选择框',
    options: [
      { label: '选项一', value: '1' },
      { label: '选项二', value: '2' },
      { label: '选项三', value: '3' },
    ],
  },
  {
    id: '6',
    type: 'Date',
    label: '日期框',
    placeholder: '',
  },
  {
    id: '7',
    type: 'MyTextTip',
    label: '纯文本',
    fontSize: 12,
    color: 'rgba(0,0,0,1)',
  },
];

interface FormItemsProps {
  formList?: TFormItemsDefaultType;
  onChange?: (v: TFormItemsDefaultType) => void;
  data: any;
  rightPannelRef: RefObject<HTMLDivElement>;
}

const FormAddWrapper = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #4a4a4a;
  line-height: 20px;
  background-color: #2f54eb;
`

const OperationBtn = styled.span`
  margin-right: 15px;
  display: inline-block;
  cursor: pointer;
`

const DisClick = styled.div`
  color: #fff;
`

const EditWrapper = styled.div`
  right: -18px;
`

const DeleteWrapper = styled.div`
  left: 0;
`

const IFormItem = styled.div`
  position: relative;
  padding-left: 2px;

  ${DeleteWrapper},
  ${EditWrapper}{
    position: absolute;
    top: 19px;
    box-shadow: 0 0 20px #fff;
    ${OperationBtn}{
      margin-right: 15px;
      display: inline-block;
      cursor: pointer;
    }
  }
`

const EditForm = styled.div`
  text-align: left;
  width: 251px;
`

const FormTpl = styled.div`
  margin-top: 12px;
  border-top: 1px dashed #ccc;
  padding-top: 16px;
  background-color: #4a4a4a;
  ${IFormItem}{
    button,
    [type='button'] {
      color: #fff;
      background-color: #4a4a4a;
      border: 1px solid #fff;
      border-radius: 4px 0px 0px 0px;
    }
    position: relative;
    border: 1px solid #ccc;
    margin-bottom: 2px;
    background-color: #4a4a4a;
    cursor: pointer;

    ${DisClick}{
      pointer-events: none;
    }

    &:hover{
      border-color: #2f54eb;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 3px 6px;
      color: #fff;
      border-radius: 3px;
      background-color: #2f54eb;
      cursor: pointer;
      display: inline-block;
    }
  }
`

const FormTitle = styled.div`
  width: 56px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC, serif;
  font-weight: bold;
  color: #000000;
  line-height: 20px;
`

const FormItemWrapper = styled.div`
  position: relative;
`

const FormItems:FC<FormItemsProps> = (props) => {
  const { formList, onChange, rightPannelRef } = props;
  const [formData, setFormData] = useState<TFormItemsDefaultType>(formList || []);
  const [visible, setVisible] = useState(false);
  const [curItem, setCurItem] = useState<baseFormUnion>();
  const [force, setforce] = useState<{ force: Function }>({
    force: () => {},
  });

  const handleAddItem = (item: baseFormUnion) => {
    let tpl = formTpl.find(v => v.type === item.type);
    let newData = [...formData, { ...tpl!, id: uuid(6, 10) }];
    setFormData(newData);
    onChange && onChange(newData);
    force.force();
  };

  const handleEditItem = (item: baseFormUnion) => {
    setVisible(true);
    setCurItem(item);
  };

  const handleDelItem = (item: baseFormUnion) => {
    let newData = formData.filter(v => v.id !== item.id);
    setFormData(newData);
    onChange && onChange(newData);
  };

  const handleSaveItem = (data: baseFormUnion) => {
    let newData = formData.map(v => (v.id === data.id ? data : v));
    setFormData(newData);
    onChange && onChange(newData);
    setVisible(false);
  };

  const callback = useCallback((v: Function) => {
    console.log(v);
    setforce({ force: v });
  }, []);

  useEffect(() => {
    let listenner: (e: Event) => void;
    if (rightPannelRef.current) {
      listenner = () => {
        force.force();
      };
      rightPannelRef.current.addEventListener('scroll', listenner);
    }
    return () => {
      if (rightPannelRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        rightPannelRef.current.removeEventListener('scroll', listenner);
      }
    };
  }, [force, rightPannelRef]);

  return (
    <FormItemWrapper>
      <FormTitle>表单控件</FormTitle>
      <EditForm>
        {
          formData.map((item: baseFormUnion, i: number) => {
            //TODO 修改完antd和semantic配置之后修改
            let FormItem = BaseForm[item.type];
            return (
              <IFormItem key={i}>
                <DisClick>
                  <List>
                    <FormItem {...item} />
                  </List>
                </DisClick>
                <DeleteWrapper>
                  <OperationBtn onClick={() => handleDelItem(item)}>
                    <MinusCircleFilled />
                  </OperationBtn>
                </DeleteWrapper>
                <EditWrapper>
                  <OperationBtn onClick={() => handleEditItem(item)}>
                    <EditFilled />
                  </OperationBtn>
                </EditWrapper>
              </IFormItem>
            )
          })
        }
        <FormAddWrapper>
          <MyPopover
            content={
              <Fragment>
                <FormTpl style={{ color: 'red' }}>
                  {formTpl.map((item, i) => {
                    //TODO 修改完antd和semantic配置之后修改
                    let FormItem = BasePopoverForm[item.type];
                    return (
                      <IFormItem key={i} onClick={() => handleAddItem(item)}>
                        <DisClick
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'row',
                            marginTop: '10px',
                          }}
                        >
                          <FormItem {...item} />
                        </DisClick>
                      </IFormItem>
                    );
                  })}
                </FormTpl>
                {/* <a style={{color: 'red'}} onClick={() => setFormTplVisible(false)}>Close</a> */}
              </Fragment>
            }
            directions={'LB'}
            innerConstDomStyle={{ display: 'block' }}
            constDomStyle={{ display: 'block' }}
            callback={callback}
          >
            <Button style={{ width: '100%' }} block icon={<PlusOutlined />}>
              添加
            </Button>
          </MyPopover>
        </FormAddWrapper>
      </EditForm>

      <EditorModal item={curItem} onSave={handleSaveItem} visible={visible} />
    </FormItemWrapper>
  )

}

export default memo(FormItems);
